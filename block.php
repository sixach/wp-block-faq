<?php
/**
 * Block initialization file. Contains all relevant functions
 * and features such as block registration and render callbacks.
 * The block is fully installed if this file is imported.
 *
 * @link    https://sixa.ch
 * @author    sixa AG
 * @since     1.1.0
 * @package    SixaFAQBlock
 */

namespace SixaFaqBlock;

use SixaFaqBlock\Includes\Loop as Loop;
use SixaSnippets\Dashboard\Post_Type as Post_Type;

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see     https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 * @since   1.0.0
 * @return  void
 */
function register_block(): void {
	include untrailingslashit( plugin_dir_path( __FILE__ ) ) . '/includes/class-loop.php';
	register_block_type_from_metadata(
		__DIR__,
		array(
			'render_callback' => __NAMESPACE__ . '\render_block',
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_block' );

/**
 * Renders the `sixa/faq` block on server.
 *
 * @since   1.0.0
 * @param   array $attributes        The block attributes.
 * @return  string
 */
function render_block( array $attributes = array() ): string {
	$wrapper_attributes = get_block_wrapper_attributes();
	$class_name         = sanitize_html_class( apply_filters( 'sixa_faq_block_class_name', 'wp-block-sixa-faq' ) );
	$return             = sprintf( '<div %s>', $wrapper_attributes );
	$attributes         = apply_filters( 'sixa_faq_block_attributes', $attributes );
	$loop               = new Loop( $attributes, $class_name );
	$return            .= apply_filters( 'sixa_faq_block_content', $loop->get_content(), $attributes, $class_name );
	$return            .= '</div>';

	return apply_filters( 'sixa_faq_block_render_html', $return );
}

/**
 * Registers the custom post-type required for this block.
 *
 * @see https://sixach.github.io/sixa-wp-snippets/#/dashboard/post-type
 */
function register_post_type(): void {
	new Post_Type(
		array(
			apply_filters(
				'sixa_faq_block_register_post_type_args',
				array(
					'key'           => apply_filters( 'sixa_faq_block_post_type', 'faq-item' ),
					'singular_name' => __( 'FAQ Item', 'sixa' ),
					'plural_name'   => __( 'FAQ Items', 'sixa' ),
					'args'          => apply_filters(
						'sixa_faq_block_post_type_args',
						array(
							'publicly_queryable' => false,
							'menu_icon'          => 'dashicons-editor-help',
						)
					),
					'taxonomies'    => array(
						array(
							'key'  => apply_filters( 'sixa_faq_block_taxonomy', 'faq-item-category' ),
							'args' => apply_filters(
								'sixa_faq_block_taxonomy_args',
								array(
									'publicly_queryable' => false,
								)
							),
						),
					),
				)
			),
		)
	);
}
add_action( 'init', __NAMESPACE__ . '\register_post_type' );
