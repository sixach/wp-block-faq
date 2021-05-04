<?php
/**
 * Plugin Name:     Sixa - F.A.Q
 * Description:     FAQ block for WordPress editor.
 * Version:         0.1.0
 * Author:          sixa AG
 * License:         GPL-3.0-or-later
 * License URI:     https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:     sixa
 *
 * @package         sixa
 */
namespace SixaFAQBlock;

/**
 * Require Composer autoload file to enable access to files
 * and classes that are imported from Composer packages.
 *
 * @see https://getcomposer.org/doc/01-basic-usage.md#autoloading
 */
require( __DIR__ . '/vendor/autoload.php' );

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function register_block() {
	register_block_type_from_metadata( __DIR__ );
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Register the Custom Post Types required for this block.
 *
 * @see https://sixach.github.io/sixa-wp-snippets/#/dashboard/post-type
 */
function register_post_types() {
	new \SixaSnippets\Dashboard\Post_Type(
		array(
			array(
				'key'           => 'team-member',
				'singular_name' => __( 'Team Member', 'sixa-extras' ),
				'plural_name'   => __( 'Team Members', 'sixa-extras' ),
				'args'          => array(
					'publicly_queryable' => false,
					'menu_icon'          => 'dashicons-buddicons-buddypress-logo',
					'template'           => array( array( 'sixa-extras/team' ) ),
					'template_lock'      => true,
				),
				'taxonomies'    => array(
					array(
						'key'  => 'team-member-category',
						'args' => array(
							'publicly_queryable' => false,
						),
					),
				),
			),
			array(
				'key'           => 'faq-item',
				'singular_name' => __( 'FAQ Item', 'sixa-extras' ),
				'plural_name'   => __( 'FAQ Items', 'sixa-extras' ),
				'args'          => array(
					'publicly_queryable' => false,
					'menu_icon'          => 'dashicons-editor-help',
				),
				'taxonomies'    => array(
					array(
						'key'  => 'faq-item-category',
						'args' => array(
							'publicly_queryable' => false,
						),
					),
				),
			),
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_post_types' );
