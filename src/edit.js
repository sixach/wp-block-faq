/**
 * Utility for libraries from the `Lodash`.
 */
import { get, set, isArray, pickBy, identity } from 'lodash';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { LoadingSpinner, isNonEmptyArray } from '@sixa/wp-block-utils';

/**
 * Utility to make WordPress REST API requests. It's a wrapper around `window.fetch`.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/api-fetch/README.md
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see https://github.com/WordPress/gutenberg/tree/HEAD/packages/data/README.md
 */
import { useSelect } from '@wordpress/data';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { useState, useEffect, useRef } from '@wordpress/element';

/**
 * EventManager for JavaScript.
 * Hooks are used to manage component state and lifecycle.
 *
 * @see https://github.com/WordPress/gutenberg/blob/trunk/packages/hooks/README.md
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Notice, Placeholder, Dashicon } from '@wordpress/components';

/**
 * Inspector Controls sidebar settings.
 */
import Inspector from './inspector';

/**
 * The loop template component.
 */
import Loop from './loop';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see 	https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param 	{Object}  props 	Block meta-data properties.
 * @return 	{WPElement} 		Element to render.
 */
export default function Edit( props ) {
	const { isSelected, attributes } = props;
	const { order, orderBy, category, number } = attributes;
	const isStillMounted = useRef();
	const [ categoriesList, setCategoriesList ] = useState( [] );
	const postType = applyFilters( 'sixa.faqPostType', 'faq-item' );
	const categoryEndpoint = applyFilters( 'sixa.faqCategoryEndpoint', 'faq-item-category' );
	const categoryQueryArgs = applyFilters( 'sixa.faqCategoryQueryArgs', { per_page: -1 } );
	const { getPosts, havePosts } = useSelect(
		( select ) => {
			const { getEntityRecords } = select( 'core' );
			const wpQuery = getEntityRecords(
				'postType',
				postType,
				pickBy(
					{
						order,
						orderby: orderBy,
						[ categoryEndpoint ]: category,
						per_page: number,
					},
					( value ) => identity( value )
				)
			);

			return {
				havePosts: isNonEmptyArray( wpQuery ),
				getPosts: wpQuery,
			};
		},
		[ order, orderBy, category, number ]
	);

	useEffect( () => {
		set( isStillMounted, 'current', true );

		apiFetch( {
			path: addQueryArgs( `/wp/v2/${ categoryEndpoint }`, categoryQueryArgs ),
		} )
			.then( ( data ) => {
				if ( isStillMounted.current ) {
					setCategoriesList( data );
				}
			} )
			.catch( () => {
				if ( isStillMounted.current ) {
					setCategoriesList( [] );
				}
			} );

		return () => set( isStillMounted, 'current', false );
	}, [] );

	return (
		<>
			<div { ...useBlockProps() }>
				{ ! isArray( getPosts ) || ! get( isStillMounted, 'current' ) ? (
					<Placeholder icon={ <Dashicon icon="admin-post" /> } label={ __( 'FAQ items', 'sixa' ) }>
						<LoadingSpinner label={ ' ' } />
					</Placeholder>
				) : (
					<>
						{ havePosts ? (
							<Loop getPosts={ getPosts } />
						) : (
							<Notice status="warning" isDismissible={ false }>
								{ __( 'No posts found to display.', 'sixa' ) }
							</Notice>
						) }
					</>
				) }
			</div>
			{ isSelected && <Inspector { ...props } categoriesList={ categoriesList } /> }
		</>
	);
}
