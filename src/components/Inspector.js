/**
 * Helper React components specific for Sixa projects.
 */
import { MultiSelect } from '@sixa/wp-block-components';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { isNonEmptyArray } from '@sixa/wp-block-utils';

/**
 * This module allows you to create and use standalone block editors.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/
 */
import { InspectorControls } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { PanelBody, QueryControls } from '@wordpress/components';

/**
 * Retrieves the translation of text.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * Inspector Controls appear in the post settings sidebar when a block is being edited.
 *
 * @see       https://github.com/WordPress/gutenberg/blob/master/packages/block-editor/src/components/inspector-controls/README.md
 * @param     {Object}         props                  Block meta-data properties.
 * @param     {Object}         props.attributes       Block attributes.
 * @param     {number}         props.maxLimit         Maximum number of posts could be shown within this query.
 * @param     {Array}          props.postsOptions     A list of published blog posts.
 * @param     {Function}       props.setAttributes    Update block attributes.
 * @param     {Array}          props.termsOptions     A list of category taxonomy terms.
 * @return    {JSX.Element} 						  Inspector element to render.
 */
function Inspector( { attributes, maxLimit, postsOptions, setAttributes, termsOptions } ) {
	const { category, ids, limit, order, orderby } = attributes;
	const isHandpicked = isNonEmptyArray( ids );

	return (
		<InspectorControls>
			<PanelBody initialOpen title={ __( 'Query Settings', 'sixa-block-faq' ) }>
				<QueryControls
					categoriesList={ termsOptions }
					maxItems={ maxLimit }
					numberOfItems={ limit }
					order={ order }
					orderBy={ orderby }
					onCategoryChange={ ( value ) => setAttributes( { category: value, ids: [] } ) }
					onNumberOfItemsChange={ ! isHandpicked ? ( value ) => setAttributes( { limit: value } ) : undefined }
					onOrderByChange={ ! isHandpicked ? ( value ) => setAttributes( { orderby: value } ) : undefined }
					onOrderChange={ ! isHandpicked ? ( value ) => setAttributes( { order: value } ) : undefined }
					selectedCategoryId={ category }
				/>
				<MultiSelect
					onChange={ ( value ) => setAttributes( { ids: value } ) }
					options={ postsOptions }
					selectedOptions={ ids }
					withSearchField={ false }
				/>
			</PanelBody>
		</InspectorControls>
	);
}

Inspector.propTypes = {
	attributes: PropTypes.object.isRequired,
	maxLimit: PropTypes.number,
	postsOptions: PropTypes.arrayOf( PropTypes.shape( { label: PropTypes.string, value: PropTypes.number } ) ),
	setAttributes: PropTypes.func.isRequired,
	termsOptions: PropTypes.arrayOf( PropTypes.shape( { label: PropTypes.string, value: PropTypes.number } ) ),
};

Inspector.defaultProps = {
	attributes: {},
	maxLimit: 1,
	postsOptions: [],
	setAttributes: () => {},
	termsOptions: [],
};

export default Inspector;
