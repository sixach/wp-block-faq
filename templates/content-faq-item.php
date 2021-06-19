<?php
/**
 * The template for displaying FAQ post item within loops.
 *
 * @since       1.0.0
 * @package     sixa
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound
 */

namespace SixaFaqBlock\templates;

defined( 'ABSPATH' ) || exit;

$faq_post   = $args['faq_post'] ?? '';
$class_name = $args['class_name'] ?? '';

?>
<details class="<?php echo sanitize_html_class( $class_name ); ?>__item">
	<summary class="<?php echo sanitize_html_class( $class_name ); ?>__title">
		<?php echo esc_html( get_the_title( $faq_post ) ); ?>
	</summary>
	<div class="<?php echo sanitize_html_class( $class_name ); ?>__content">
		<?php echo wp_filter_post_kses( apply_filters( 'the_content', $faq_post->post_content ) ); ?>
	</div>
</details>
