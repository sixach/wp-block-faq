module.exports = {
	extends: '@wordpress/stylelint-config/scss',
	rules: {
		'max-line-length': null,
		'value-keyword-case': null,
		'selector-id-pattern': null,
		'no-duplicate-selectors': null,
		'selector-class-pattern': null,
		'selector-type-no-unknown': null,
		'no-descending-specificity': null,
		'comment-empty-line-before': null,
		'declaration-block-no-duplicate-properties': null,
		'scss/selector-no-redundant-nesting-selector': null,
		'property-no-unknown': [
			true,
			{
				ignoreProperties: [ 'box', 'box-item', 'border-right-radius', 'border-left-radius' ],
			},
		],
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [ 'important', 'for', 'extend', 'each', 'mixin', 'define-mixin' ],
			},
		],
		'scss/at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [ 'important', 'define-mixin' ],
			},
		],
		'selector-pseudo-element-no-unknown': [ true, { ignorePseudoElements: [ 'range-thumb' ] } ],
		'font-family-no-missing-generic-family-keyword': [
			true,
			{
				ignoreFontFamilies: [ 'dashicons' ],
			},
		],
	},
};
