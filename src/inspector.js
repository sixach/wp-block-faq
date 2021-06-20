/**
 * Utility for libraries from the `Lodash`.
 */
import { noop } from 'lodash';

/**
 * Helper React components specific for Sixa projects.
 */
import { MultiSelect } from '@sixach/wp-block-components';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { isNonEmptyArray } from '@sixach/wp-block-utils';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { PanelBody, QueryControls } from '@wordpress/components';

/**
 * Inspector Controls appear in the post settings sidebar when a block is being edited.
 *
 * @see  	https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/inspector-controls/README.md
 * @param   {Object}    props 					    Block meta-data properties.
 * @param   {Object}    props.attributes 		    Block attributes.
 * @param   {Function}  props.setAttributes 	    Updates block attributes.
 * @param   {Array}  	props.postOptions 			List of FAQ post options.
 * @param   {Array}  	props.termOptions 			List of FAQ post category options.
 * @param   {number}  	props.maxLimit 	    		Maximum number of items shown on each query.
 * @return 	{WPElement} 						    Toolbar element to render.
 */
export default function Inspector( { attributes, setAttributes, postOptions, termOptions, maxLimit } ) {
	const { ids, limit, category, order, orderby } = attributes;
	const isHandpicked = isNonEmptyArray( ids );

	return (
		<InspectorControls>
			<PanelBody initialOpen title={ __( 'Query Settings', 'sixa' ) }>
				<QueryControls
					order={ order }
					orderBy={ orderby }
					categoriesList={ termOptions }
					selectedCategoryId={ category }
					numberOfItems={ limit }
					onCategoryChange={ ( value ) => setAttributes( { category: value, ids: [] } ) }
					onOrderByChange={ ! isHandpicked ? ( value ) => setAttributes( { orderby: value } ) : noop() }
					onOrderChange={ ! isHandpicked ? ( value ) => setAttributes( { order: value } ) : noop() }
					onNumberOfItemsChange={ ! isHandpicked ? ( value ) => setAttributes( { limit: value } ) : noop() }
					maxItems={ maxLimit }
				/>
				<MultiSelect
					withSearchField={ false }
					options={ postOptions }
					selectedOptions={ ids }
					onChange={ ( value ) => setAttributes( { ids: value } ) }
				/>
			</PanelBody>
		</InspectorControls>
	);
}
