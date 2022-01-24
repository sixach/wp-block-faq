<?php
/**
 * The template for displaying FAQ post item within loops.
 *
 * @link          https://sixa.ch
 * @author        sixa AG
 * @since         1.0.0
 *
 * @package       Sixa_Blocks
 * @subpackage    Sixa_Blocks\FAQ\Templates
 * @phpcs:disable WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedHooknameFound, WordPress.NamingConventions.PrefixAllGlobals.NonPrefixedVariableFound
 */

namespace Sixa_Blocks\FAQ\Templates;

defined( 'ABSPATH' ) || exit;

$faq_post   = $args['faq_post'] ?? '';
$class_name = $args['class_name'] ?? '';

?>
<details class="<?php echo esc_attr( $class_name ); ?>__item">
	<summary class="<?php echo esc_attr( $class_name ); ?>__title">
		<?php echo esc_html( get_the_title( $faq_post ) ); ?>
	</summary>
	<div class="<?php echo esc_attr( $class_name ); ?>__content">
		<?php echo apply_filters( 'the_content', $faq_post->post_content ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	</div>
</details>
