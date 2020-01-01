const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
	context: path.resolve(__dirname, 'src/assets'),
	entry : {
		index: ['@babel/polyfill','./js/index.js'],
	},
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: './js/rf-select.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: [
							require('@babel/plugin-transform-regenerator'),
							require('@babel/plugin-transform-runtime')
						]
					}
				}
			},
			{
				test: /\.scss$/,
				use: [
					MiniCSSExtractPlugin.loader,
					{ loader: 'css-loader' },
					{
						loader: 'postcss-loader',
						options: {
							plugins: () => [
								require('postcss-preset-env')({ browsers: 'last 2 versions' }),
								require('cssnano')
							]
						}
					},
					{ loader: 'sass-loader' },
				]
			}		  
		]
	},
	plugins: [
		new HtmlWebpackPlugin(),
		new MiniCSSExtractPlugin({
			filename: 'css/index.css'
		})
	],
}