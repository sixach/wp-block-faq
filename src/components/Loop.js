/**
 * Utility for libraries from the `Lodash`.
 */
import map from 'lodash/map';

/**
 * Helper React components specific for Sixa projects.
 */
import { PrintHTML } from '@sixa/wp-block-components';

/**
 * Collection of handy hooks and higher-order components (HOCs) to wrap WordPress
 * components and provide some basic features like state, instance id, and pure.
 *
 * @see		https://developer.wordpress.org/block-editor/reference-guides/packages/packages-compose
 */
import { useInstanceId } from '@wordpress/compose';

/**
 * Runtime type checking for React props and similar objects.
 */
import PropTypes from 'prop-types';

/**
 * The loop template component.
 * Using The Loop, the block processes each product to be displayed on the current page,
 * and formats it according to how it matches specified criteria within The Loop tags.
 *
 * @param     {Object}         props              Block meta-data properties.
 * @param     {string}         props.className    Block specific CSS class name.
 * @param     {Array}    	   props.query 	      WP query/API response.
 * @return    {JSX.Element}                 	  Loop item to render.
 */
function Loop( { className, query } ) {
	const instanceId = useInstanceId( Loop );

	return map( query, ( post ) => (
		<details className={ `${ className }__item` } key={ `${ post?.id }-${ instanceId }` }>
			<PrintHTML content={ post } path="title.rendered" tagName="summary" tagProps={ { className: `${ className }__title` } } />
			<PrintHTML
				content={ post }
				css={ { pointerEvents: 'none' } }
				path="content.rendered"
				tagName="div"
				tagProps={ { className: `${ className }__content` } }
			/>
		</details>
	) );
}

Loop.propTypes = {
	className: PropTypes.string.isRequired,
	query: PropTypes.array.isRequired,
};

Loop.defaultProps = {
	className: undefined,
	query: [],
};

export default Loop;
