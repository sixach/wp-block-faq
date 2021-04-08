/* eslint-disable @wordpress/no-unsafe-wp-apis */

/**
 * Utility for libraries from the `Lodash`.
 */
import { get, map, invoke } from 'lodash';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { blockClassName, generateFormattedContent } from '@sixa/wp-block-utils';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { RawHTML } from '@wordpress/element';

/**
 * Constants.
 */
const CLASSNAME = blockClassName( 'faq' );

/**
 * The loop template component.
 * Using The Loop, the block processes each post to be displayed on the current page,
 * and formats it according to how it matches specified criteria within The Loop tags.
 *
 * @param   {Object}    props 					    Block meta-data properties.
 * @param   {Array}  	props.getPosts 	            Retrieves an array of the most recent posts.
 * @return  {WPElement} 						    Inspector element to render.
 */
export default function Loop( { getPosts } ) {
	return (
		<>
			{ map( getPosts, ( post, i ) => (
				<details key={ i } className={ `${ CLASSNAME }__item` }>
					<summary className={ `${ CLASSNAME }__title` }>
						<RawHTML>{ generateFormattedContent( get( post, 'title.rendered' ) ) || __( '(no title)', 'sixa' ) }</RawHTML>
					</summary>
					<RawHTML key="html" className={ `${ CLASSNAME }__content` }>
						{ invoke( post, [ 'content', 'raw', 'trim' ] ) }
					</RawHTML>
				</details>
			) ) }
		</>
	);
}
