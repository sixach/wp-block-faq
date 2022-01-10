<?php
/**
 * F.A.Q Block.
 *
 * @wordpress-plugin
 * Plugin Name:          Sixa - FAQ Block
 * Description:          Display Frequently Asked Questions (FAQs) in an accordion on your website. Add, store, and maintain your FAQs in a custom post type and create categories to group your FAQs. Order your FAQs alphabetically or by their creation date and automatically include newly created FAQ items in the block output. Filter the FAQ posts that should be displayed by category. You may also set FAQ items to display and the order in which they should be displayed manually.
 * Tags:                 faq, questions, answers, accordion, block, gutenberg, sixa
 * Contributors:         sixa, mahdiyazdani, gookaani, kuserich
 * Version:              1.0.0
 * Stable tag:           1.0.0
 * Requires at least:    5.7
 * Tested up to:         5.8
 * Requires PHP:         7.3
 * Author:               sixa AG
 * Author URI:           https://sixa.ch
 * License:              GPLv3 or later
 * License URI:          https://www.gnu.org/licenses/gpl-3.0.html
 * Text Domain:          sixa-block-faq
 * Donate link:          https://sixa.com/
 *
 * @package              Sixa_Blocks
 */

defined( 'ABSPATH' ) || exit; // Exit if accessed directly.

/**
 * Include the namespace of this block.
 */
use Sixa_Blocks\FAQ;

/**
 * Composer autoload is needed in this package even if
 * it doesn't use any libraries to autoload the classes
 * from this package.
 *
 * @see    https://getcomposer.org/doc/01-basic-usage.md#autoloading
 */
require __DIR__ . '/vendor/autoload.php';

/**
 * Initialize your block.
 *
 * Other than this function call, this file should not include any logic
 * and should merely be used as an entry point to use this package as
 * a WordPress plugin.
 */
FAQ::init();
