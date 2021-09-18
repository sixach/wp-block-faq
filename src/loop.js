/**
 * Utility for libraries from the `Lodash`.
 */
import { get, map } from 'lodash';

/**
 * Helper React components specific for Sixa projects.
 */
import { PrintHTML } from '@sixach/wp-block-components';

/**
 * Utility for conditionally joining CSS class names together.
 */
import classnames from 'classnames';

/**
 * The loop template component.
 * Using The Loop, the block processes each product to be displayed on the current page,
 * and formats it according to how it matches specified criteria within The Loop tags.
 *
 * @see       http://reactjs.org/docs/react-api.html#overview
 * @param     {Object}       props               Block meta-data properties.
 * @param     {string}       props.className     CSS class name(s) assigned to the wrapper element.
 * @param     {Array}        props.query         Product categories query/API response.
 * @param     {string}       props.instanceId    Unique ID of parent component.
 * @param     {Object}       props.styles        Scoped CSS module styles.
 * @return    {WPElement}                        Element to render.
 */
export default function Loop( { className, query, instanceId, styles } ) {
	return map( query, ( post ) => (
		<details key={ `${ get( post, 'id' ) }-${ instanceId }` } className={ `${ className }__item` }>
			<PrintHTML content={ post } path="title.rendered" tagName="summary" tagProps={ { className: `${ className }__title` } } />
			<PrintHTML
				content={ post }
				path="content.rendered"
				tagName="div"
				tagProps={ { className: classnames( `${ className }__content`, get( styles, 'preventClick' ) ) } }
			/>
		</details>
	) );
}
