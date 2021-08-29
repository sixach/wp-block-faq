/**
 * Utility for libraries from the `Lodash`.
 */
import { get, set, isArray, slice, assign, map, find, pick } from 'lodash';

/**
 * Helper React components specific for Sixa projects.
 */
import { Loading } from '@sixach/wp-block-components';

/**
 * Utility helper methods specific for Sixa projects.
 */
import { isNonEmptyArray, blockClassName, selectOptions } from '@sixa/wp-block-utils';

/**
 * Retrieves the translation of text.
 *
 * @see     https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * Utility to make WordPress REST API requests. It's a wrapper around `window.fetch`.
 *
 * @see     https://github.com/WordPress/gutenberg/blob/trunk/packages/api-fetch/README.md
 */
import apiFetch from '@wordpress/api-fetch';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see     https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { addQueryArgs } from '@wordpress/url';

/**
 * WordPress specific abstraction layer atop React.
 *
 * @see     https://github.com/WordPress/gutenberg/tree/HEAD/packages/element/README.md
 */
import { useState, useEffect, useRef, useMemo } from '@wordpress/element';

/**
 * Data module to manage application state for both plugins and WordPress itself.
 * The data module is built upon and shares many of the same core principles of Redux.
 *
 * @see     https://github.com/WordPress/gutenberg/tree/HEAD/packages/data/README.md
 */
import { useDispatch } from '@wordpress/data';

/**
 * The compose package is a collection of handy Hooks and Higher Order Components (HOCs).
 * The compose function is an alias to `flowRight` from Lodash.
 *
 * @see  	https://github.com/WordPress/gutenberg/blob/trunk/packages/compose/README.md
 */
import { compose, withInstanceId, withState } from '@wordpress/compose';

/**
 * EventManager for JavaScript.
 * Hooks are used to manage component state and lifecycle.
 *
 * @see  	https://github.com/WordPress/gutenberg/blob/trunk/packages/hooks/README.md
 */
import { applyFilters } from '@wordpress/hooks';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see  	https://developer.wordpress.org/block-editor/packages/packages-block-editor/#useBlockProps
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * This packages includes a library of generic WordPress components to be used for
 * creating common UI elements shared between screens and features of the WordPress dashboard.
 *
 * @see  	https://developer.wordpress.org/block-editor/reference-guides/packages/packages-components/
 */
import { Notice } from '@wordpress/components';

/**
 * The loop template component.
 */
import Loop from './loop';

/**
 * Inspector Controls sidebar settings.
 */
import Inspector from './inspector';

/**
 * Scoped styles.
 */
import styles from './editor.module.css';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see  	https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 * @param   {Object}    props 	    	Block meta-data properties.
 * @return 	{WPElement}             	Element to render.
 */
function Edit( props ) {
	const isStillMounted = useRef();
	const { isSelected, attributes, instanceId, setState } = props;
	const { ids, limit, category, order, orderby } = attributes;
	const { createErrorNotice } = useDispatch( 'core/notices' );
	const [ wpQuery, setWpQuery ] = useState( '' );
	const blockProps = useBlockProps();
	const className = blockClassName( get( blockProps, 'className' ) );
	const postType = applyFilters( 'sixa.faqPostType', 'faq-item' );
	const taxonomy = applyFilters( 'sixa.faqTaxonomy', 'faq-item-category' );
	const noticeProps = { isDismissible: true, type: 'snackbar' };
	const { havePosts, maxLimit, slicedQuery } = useMemo(
		() => ( {
			havePosts: isNonEmptyArray( wpQuery ),
			maxLimit: get( wpQuery, 'length' ),
			slicedQuery: isNonEmptyArray( ids ) ? map( ids, ( id ) => find( wpQuery, [ 'id', id ] ) ) : slice( wpQuery, 0, limit ),
		} ),
		[ wpQuery, limit, ids ]
	);

	useEffect( () => {
		apiFetch( {
			path: addQueryArgs( `/wp/v2/${ taxonomy }`, { per_page: -1 } ),
		} )
			.then( ( data ) => {
				setState( ( state ) => assign( {}, state, { termOptions: map( data, ( term ) => pick( term, [ 'id', 'name', 'parent' ] ) ) } ) );
			} )
			.catch( () => {
				createErrorNotice( __( 'Could not load faq categories.', 'sixa' ), noticeProps );
			} );
	}, [] );

	useEffect( () => {
		set( isStillMounted, 'current', true );

		apiFetch( {
			path: addQueryArgs( `/wp/v2/${ postType }`, { per_page: -1, [ taxonomy ]: category || ' ', order, orderby } ),
		} )
			.then( ( data ) => {
				if ( isStillMounted.current ) {
					setWpQuery( data );
					setState( ( state ) => assign( {}, state, { postOptions: selectOptions( data, { id: 'value', 'title.rendered': 'label' }, [] ) } ) );
				}
			} )
			.catch( () => {
				if ( isStillMounted.current ) {
					setWpQuery( [] );
					createErrorNotice( __( 'Could not load faq posts.', 'sixa' ), noticeProps );
				}
			} );

		return () => set( isStillMounted, 'current', false );
	}, [ category, order, orderby ] );

	return (
		<div { ...blockProps }>
			{ ! isArray( wpQuery ) || ! get( isStillMounted, 'current' ) ? (
				<Loading label={ __( 'Fetching…', 'sixa' ) } />
			) : havePosts ? (
				<Loop className={ className } instanceId={ instanceId } query={ slicedQuery } styles={ styles } />
			) : (
				<Notice status="warning" className={ get( styles, 'notice' ) } isDismissible={ false }>
					{ __( 'No F.A.Q posts found to display.', 'sixa' ) }
				</Notice>
			) }
			{ isSelected && <Inspector { ...props } maxLimit={ maxLimit } /> }
		</div>
	);
}

export default compose( [
	withInstanceId,
	withState( {
		postOptions: [],
		termOptions: [],
	} ),
] )( Edit );
