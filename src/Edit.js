/**
 * Helper React components specific for Sixa projects.
 */
import { Loading } from '@sixa/wp-block-components';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { blockClassName } from '@sixa/wp-block-utils';

/**
 * Helper React hooks specific for Sixa projects.
 */
import { useGetPosts, useGetTerms, usePreparePosts } from '@sixa/wp-react-hooks';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Notice } from '@wordpress/components';

/**
 * EventManager for JavaScript.
 * Hooks are used to manage component state and lifecycle.
 *
 * @see    https://developer.wordpress.org/block-editor/reference-guides/packages/packages-hooks/
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * Retrieves the translation of text.
 *
 * @see    https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Inspector Controls sidebar settings.
 */
import Inspector from './components/Inspector';

/**
 * The loop template component.
 */
import Loop from './components/Loop';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see       https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param     {Object}         props                  Block meta-data properties.
 * @param     {Object}         props.attributes       Block attributes.
 * @param     {string}         props.clientId         The block’s client id.
 * @param     {Function}       props.setAttributes    Update block attributes.
 * @return    {JSX.Element}                           Element to render.
 */
function Edit( { attributes, clientId, setAttributes } ) {
	const { category, ids, limit, order, orderby } = attributes;
	const postType = applyFilters( 'sixa.faqPostType', 'faq-item' );
	const taxonomy = applyFilters( 'sixa.faqTaxonomy', 'faq-item-category' );
	const { isLoading, postsOptions, postsQuery } = useGetPosts( { [ taxonomy ]: category || ' ', order, orderby }, clientId, postType );
	const { termsOptions } = useGetTerms( taxonomy );
	const { havePosts, maxLimit, slicedQuery } = usePreparePosts( ids, limit, postsQuery );
	const blockProps = useBlockProps();
	const className = blockClassName( blockProps?.className );

	return (
		<div { ...blockProps }>
			{ isLoading ? (
				<Loading />
			) : havePosts ? (
				<Loop className={ className } query={ slicedQuery } />
			) : (
				<Notice css={ { margin: 0 } } isDismissible={ false } status="warning">
					{ __( 'No F.A.Q posts found to display.', 'sixa-block-faq' ) }
				</Notice>
			) }
			<Inspector
				attributes={ attributes }
				maxLimit={ maxLimit }
				postsOptions={ postsOptions }
				setAttributes={ setAttributes }
				termsOptions={ termsOptions }
			/>
		</div>
	);
}

export default Edit;
