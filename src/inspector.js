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
 * @see     https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/inspector-controls/README.md
 * @param   {Function}  props 					Block meta-data properties.
 * @param   {Function}  props.attributes 		Block attributes.
 * @param   {Function}  props.setAttributes 	Update block attributes.
 * @param   {Array}  	props.categoriesList 	Retrieves a list of category objects.
 * @return 	{WPElement} 						Inspector element to render.
 */
export default function Inspector( { attributes, setAttributes, categoriesList } ) {
	const { order, orderBy, category, number } = attributes;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Query Settings', 'sixa' ) } initialOpen={ true }>
					<QueryControls
						{ ...{ order, orderBy } }
						numberOfItems={ number }
						categoriesList={ categoriesList }
						selectedCategoryId={ category }
						onOrderChange={ ( value ) => setAttributes( { order: value } ) }
						onOrderByChange={ ( value ) => setAttributes( { orderBy: value } ) }
						onNumberOfItemsChange={ ( value ) => setAttributes( { number: value } ) }
						onCategoryChange={ ( value ) => setAttributes( { category: value } ) }
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
