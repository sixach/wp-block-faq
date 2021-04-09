/**
 * Utility for libraries from the `Lodash`.
 */
import { set, snakeCase, pickBy, identity } from 'lodash';

/**
 * Modify the names of the own enumerable properties (keys) of an object.
 */
import renameKeys from 'rename-keys';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { RawHTML } from '@wordpress/element';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { generateShortcode } from '@sixa/wp-block-utils';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see 	https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 * @param   {Object}    props 				Block meta-data properties.
 * @param   {Object}  	props.attributes 	Block attributes.
 * @return 	{WPElement} 					Element to render.
 */
export default function save( { attributes } ) {
	const { category } = attributes;
	const shortcodeAttrs = renameKeys(
		pickBy( attributes, ( value ) => identity( value ) ),
		( key ) => snakeCase( key )
	);

	if ( !! category ) {
		set( shortcodeAttrs, 'category', category );
	}

	return (
		<div>
			<RawHTML>{ generateShortcode( 'faq', shortcodeAttrs ) }</RawHTML>
		</div>
	);
}
