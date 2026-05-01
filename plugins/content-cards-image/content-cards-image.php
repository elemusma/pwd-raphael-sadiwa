<?php
/**
 * Plugin Name:       Content Cards Image
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       content-cards-image
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function create_block_content_cards_image_block_init() {
	// Register the style handle used in block.json
	// wp_register_style(
	// 	'content-cards-image-style',
	// 	get_theme_file_uri('/css/sections/content-cards-image.css'),
	// 	array(),
	// 	filemtime(get_theme_file_path('/css/sections/content-cards-image.css'))
	// );
	
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'create_block_content_cards_image_block_init' );
