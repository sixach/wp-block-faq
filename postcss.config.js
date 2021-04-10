module.exports = {
	plugins: {
		'postcss-selector-replace': {
			before: [ '[prefix]' ],
			after: [ 'sixa' ],
		},
		'postcss-prefixer-keyframes': {
			prefix: [ 'sixa-' ],
		},
		'postcss-nested-ancestors': {},
		'postcss-nested': {},
		autoprefixer: { grid: true },
	},
};
