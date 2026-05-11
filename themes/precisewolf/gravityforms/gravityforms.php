<?php

add_filter('gform_submit_button_1', 'change_gf_submit_button_text_with_expert_name', 10, 2);

function change_gf_submit_button_text_with_expert_name($button, $form) {
    $expert_name = expertName();

    if (empty($expert_name)) {
        $expert_name = 'Expert';
    }

    return preg_replace(
        '/value=(["\']).*?\1/',
        'value="Send ' . esc_attr($expert_name) . ' a Message"',
        $button,
        1
    );
}

?>