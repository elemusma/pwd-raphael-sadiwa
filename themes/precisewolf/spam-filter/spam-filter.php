<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/*
|--------------------------------------------------------------------------
| CONFIG
|--------------------------------------------------------------------------
*/

define( 'PW_N8N_SPAM_WEBHOOK', 'https://n8n.precisewolf.net/webhook/54ebafa4-0ecb-408b-aa06-4913543a34f9' );
define( 'PW_N8N_SPAM_SECRET', '06b4e75591a91fb8fc6a1b96a535122cab39054d854690b1d7c94fdb6f427bfa' );

/*
|--------------------------------------------------------------------------
| OPTIONAL: limit to specific form IDs
|--------------------------------------------------------------------------
| Leave empty array to run on all Gravity Forms.
*/

function pw_n8n_spam_form_ids() {
	return [];
}

/*
|--------------------------------------------------------------------------
| FAIL MODE
|--------------------------------------------------------------------------
| If n8n fails:
| - true  = mark as spam
| - false = allow submission
|--------------------------------------------------------------------------
*/

function pw_n8n_fail_closed() {
	return true;
}

/*
|--------------------------------------------------------------------------
| FOCUS TRACKING — Enqueue JS + inject hidden field
|--------------------------------------------------------------------------
*/
 
add_action( 'gform_enqueue_scripts', 'pw_n8n_enqueue_focus_tracker', 10, 2 );
 
function pw_n8n_enqueue_focus_tracker( $form, $is_ajax ) {
	$form_ids = pw_n8n_spam_form_ids();
	if ( ! empty( $form_ids ) && ! in_array( (int) $form['id'], $form_ids, true ) ) {
		return;
	}
 
	$js = "
(function() {
	document.addEventListener('DOMContentLoaded', function() {
		document.querySelectorAll('.gform_wrapper form').forEach(function(form) {
			var focused = false;
			var hidden = form.querySelector('input[name=\"pw_focus_triggered\"]');
			if (!hidden) return;
 
			form.querySelectorAll('input, textarea, select').forEach(function(el) {
				if (el.name === 'pw_focus_triggered') return;
				el.addEventListener('focus', function() {
					if (!focused) {
						focused = true;
						hidden.value = '1';
					}
				}, { once: false });
			});
		});
	});
})();
";
 
	wp_register_script( 'pw-focus-tracker', '' );
	wp_enqueue_script( 'pw-focus-tracker' );
	wp_add_inline_script( 'pw-focus-tracker', $js );
}
 
// Inject the hidden input into every form
add_filter( 'gform_form_tag', 'pw_n8n_inject_focus_field', 10, 2 );
 
function pw_n8n_inject_focus_field( $form_tag, $form ) {
	$form_ids = pw_n8n_spam_form_ids();
	if ( ! empty( $form_ids ) && ! in_array( (int) $form['id'], $form_ids, true ) ) {
		return $form_tag;
	}
 
	return $form_tag . '<input type="hidden" name="pw_focus_triggered" value="0" />';
}

/*
|--------------------------------------------------------------------------
| MAIN FILTER
|--------------------------------------------------------------------------
*/

add_filter( 'gform_entry_is_spam', 'pw_n8n_gravityforms_spam_filter', 20, 3 );

function pw_n8n_gravityforms_spam_filter( $is_spam, $form, $entry ) {
	if ( $is_spam ) {
		return true;
	}

	$form_ids = pw_n8n_spam_form_ids();
	$form_id  = (int) rgar( $form, 'id' );

	if ( ! empty( $form_ids ) && ! in_array( $form_id, $form_ids, true ) ) {
		return $is_spam;
	}

	$payload = pw_n8n_build_payload( $form, $entry );

	$response = wp_remote_post(
		PW_N8N_SPAM_WEBHOOK,
		[
			'timeout' => 10,
			'headers' => [
				'Content-Type'        => 'application/json',
				'X-PW-Webhook-Secret' => PW_N8N_SPAM_SECRET,
			],
			'body' => wp_json_encode( $payload ),
		]
	);

	if ( is_wp_error( $response ) ) {
		return pw_n8n_handle_fail( $form_id, 'Request failed: ' . $response->get_error_message() );
	}

	$code = (int) wp_remote_retrieve_response_code( $response );
	$body = wp_remote_retrieve_body( $response );
	$data = json_decode( $body, true );

	if ( $code < 200 || $code >= 300 || ! is_array( $data ) ) {
		return pw_n8n_handle_fail( $form_id, 'Bad response. HTTP ' . $code . ' Body: ' . $body );
	}

	$decision   = isset( $data['decision'] ) ? strtolower( trim( (string) $data['decision'] ) ) : '';
	$reason     = isset( $data['reason'] ) ? sanitize_text_field( (string) $data['reason'] ) : '';
	$confidence = isset( $data['confidence'] ) ? (float) $data['confidence'] : 0;

	if ( in_array( $decision, [ 'block', 'review' ], true ) ) {
		if ( method_exists( 'GFCommon', 'set_spam_filter' ) ) {
			GFCommon::set_spam_filter(
				$form_id,
				'n8n Spam Filter',
				trim( $decision . ' | confidence=' . $confidence . ' | ' . $reason )
			);
		}
		return true;
	}

	if ( $decision === 'allow' ) {
		return false;
	}

	return pw_n8n_handle_fail( $form_id, 'Unknown decision: ' . $decision );
}

/*
|--------------------------------------------------------------------------
| BUILD PAYLOAD
|--------------------------------------------------------------------------
*/

function pw_n8n_build_payload( $form, $entry ) {
	$fields  = [];
	$name    = '';
	$email   = '';
	$phone   = '';
	$message = '';
	$page    = '';

	if ( ! empty( $form['fields'] ) && is_array( $form['fields'] ) ) {
		foreach ( $form['fields'] as $field ) {
			$field_id    = (string) $field->id;
			$field_label = isset( $field->label ) ? (string) $field->label : 'Field ' . $field_id;
			$field_type  = isset( $field->type ) ? (string) $field->type : '';
			$value       = pw_n8n_get_field_value( $field, $entry );
			$value       = pw_n8n_normalize_value( $value );

			$fields[] = [
				'id'    => $field_id,
				'label' => $field_label,
				'type'  => $field_type,
				'value' => $value,
			];

			$label_lc = strtolower( trim( $field_label ) );

			if ( $field_type === 'name' && empty( $name ) ) {
				$name = $value;
			}

			if ( $field_type === 'email' && empty( $email ) ) {
				$email = $value;
			}

			if ( $field_type === 'phone' && empty( $phone ) ) {
				$phone = $value;
			}

			if ( empty( $message ) && in_array( $label_lc, [ 'message', 'how can we help?', 'comments', 'comment', 'project details', 'details', 'inquiry' ], true ) ) {
				$message = $value;
			}

			if ( empty( $page ) && in_array( $label_lc, [ 'page url', 'source page', 'url' ], true ) ) {
				$page = $value;
			}
		}
	}

	$referer    = isset( $_SERVER['HTTP_REFERER'] ) ? esc_url_raw( wp_unslash( $_SERVER['HTTP_REFERER'] ) ) : '';
	$request_uri = isset( $_SERVER['REQUEST_URI'] ) ? sanitize_text_field( wp_unslash( $_SERVER['REQUEST_URI'] ) ) : '';
	$user_agent = isset( $_SERVER['HTTP_USER_AGENT'] ) ? sanitize_text_field( wp_unslash( $_SERVER['HTTP_USER_AGENT'] ) ) : '';

	if ( empty( $page ) ) {
		$page = $referer;
	}

	return [
		'site' => [
			'name' => get_bloginfo( 'name' ),
			'url'  => home_url(),
		],
		'form' => [
			'id'    => (int) rgar( $form, 'id' ),
			'title' => sanitize_text_field( (string) rgar( $form, 'title' ) ),
		],
		'contact' => [
			'name'    => sanitize_text_field( $name ),
			'email'   => sanitize_email( $email ),
			'phone'   => sanitize_text_field( $phone ),
			'message' => wp_strip_all_tags( (string) $message ),
		],
		'request' => [
			'page_url'    => esc_url_raw( $page ),
			'referer'     => $referer,
			'request_uri' => $request_uri,
			'ip'          => pw_n8n_get_ip(),
			'user_agent'  => $user_agent,
			'timestamp'   => current_time( 'mysql' ),
		],
		'fields' => $fields,
	];
}

function pw_n8n_get_field_value( $field, $entry ) {
	if ( isset( $field->inputs ) && is_array( $field->inputs ) && ! empty( $field->inputs ) ) {
		$parts = [];

		foreach ( $field->inputs as $input ) {
			$input_id = (string) $input['id'];
			$val      = rgar( $entry, $input_id );

			if ( $val !== '' && $val !== null ) {
				$parts[] = is_array( $val ) ? implode( ', ', $val ) : $val;
			}
		}

		return implode( ' ', array_map( 'trim', $parts ) );
	}

	$value = rgar( $entry, (string) $field->id );

	if ( is_array( $value ) ) {
		return implode( ', ', array_map( 'strval', $value ) );
	}

	return $value;
}

function pw_n8n_normalize_value( $value ) {
	if ( is_array( $value ) ) {
		return implode( ', ', array_map( 'strval', $value ) );
	}

	if ( is_bool( $value ) ) {
		return $value ? '1' : '0';
	}

	if ( is_scalar( $value ) ) {
		return trim( (string) $value );
	}

	return '';
}

function pw_n8n_get_ip() {
	$keys = [
		'HTTP_CF_CONNECTING_IP',
		'CF_CONNECTING_IP',
		'HTTP_X_FORWARDED_FOR',
		'REMOTE_ADDR',
	];

	foreach ( $keys as $key ) {
		if ( empty( $_SERVER[ $key ] ) ) {
			continue;
		}

		$raw = wp_unslash( $_SERVER[ $key ] );
		$ip  = trim( explode( ',', $raw )[0] );

		if ( filter_var( $ip, FILTER_VALIDATE_IP ) ) {
			return $ip;
		}
	}

	return '';
}

function pw_n8n_handle_fail( $form_id, $reason ) {
	if ( method_exists( 'GFCommon', 'set_spam_filter' ) ) {
		GFCommon::set_spam_filter( $form_id, 'n8n Spam Filter Error', $reason );
	}

	return pw_n8n_fail_closed();
}