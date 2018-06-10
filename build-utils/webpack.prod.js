
const commonPaths = require('./common-paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const config = {
	mode: 'production',
	entry: {
		app: [`${commonPaths.appEntry}/index.jsx`]
	},
	output: {
		filename: 'js/[name].[chunkhash:8].js'
	},
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							minimize: {
								safe: true
							}
						}
					},
					'postcss-loader',
					'sass-loader'
				]
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
			filename: 'style/[name]-[contenthash].css'
		})
	]
}

module.exports = config
