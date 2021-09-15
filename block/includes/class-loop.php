<?php
/**
 * FAQ loop class.
 *
 * @link          https://sixa.ch
 * @author        sixa AG
 * @since         1.0.0
 *
 * @package       Sixa_Blocks
 * @subpackage    Sixa_Blocks\FAQ\Includes
 */

namespace Sixa_Blocks\FAQ\Includes;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( Loop::class ) ) :

	/**
	 * The FAQ loop class.
	 */
	class Loop {

		/**
		 * Attributes.
		 *
		 * @since    1.0.0
		 * @var      array
		 */
		protected $attributes = array();

		/**
		 * Block-specific CSS class name.
		 *
		 * @since    1.0.0
		 * @var      string
		 */
		protected $class_name = '';

		/**
		 * Initialize the class and set its properties.
		 *
		 * @since    1.0.0
		 * @param    array  $attributes         The block attributes.
		 * @param    string $class_name         The block-specific unique CSS class name.
		 * @return   void
		 */
		public function __construct( array $attributes = array(), string $class_name = '' ) {
			$this->attributes = $attributes;
			$this->class_name = $class_name;
		}

		/**
		 * Get the class content.
		 *
		 * @since    1.0.0
		 * @return   string
		 */
		public function get_content(): string {
			return $this->faq_loop();
		}

		/**
		 * List all (or limited) FAQ post items.
		 *
		 * @since   1.0.0
		 * @return  string
		 */
		public function faq_loop(): string {
			$limit    = $this->attributes['limit'] ?? 3;
			$order    = $this->attributes['order'] ?? 'asc';
			$orderby  = $this->attributes['orderby'] ?? 'title';
			$category = $this->attributes['category'] ?? '';
			$ids      = array_filter( array_map( 'trim', $this->attributes['ids'] ?? array() ) );

			// Get posts.
			$args = array(
				'post_type'        => apply_filters( 'sixa_faq_block_post_type', 'faq-item' ),
				'order'            => $order,
				'orderby'          => $orderby,
				'posts_per_page'   => $limit,
				'post_status'      => 'publish',
				'suppress_filters' => false,
				'tax_query'        => array(), // phpcs:ignore WordPress.DB.SlowDBQuery.slow_db_query_tax_query
			);

			if ( $ids ) {
				$args['post__in'] = $ids;
				$args['orderby']  = 'post__in';
			}

			if ( $category ) {
				array_push(
					$args['tax_query'],
					array(
						'taxonomy' => apply_filters( 'sixa_faq_block_taxonomy', 'faq-item-category' ),
						'field'    => 'term_id',
						'terms'    => array( $category ),
					)
				);
			}

			$posts = get_posts( apply_filters( 'sixa_faq_block_wp_query_args', $args ) );

			ob_start();

			if ( is_array( $posts ) ) {
				foreach ( $posts as $faq_post ) {
					load_template(
						untrailingslashit( plugin_dir_path( __DIR__ ) ) . '/templates/content-faq-item.php',
						false,
						array(
							'faq_post'   => $faq_post,
							'class_name' => $this->class_name,
						)
					);
				}
			}

			return ob_get_clean();
		}
	}
endif;
