
const commonPaths = require('./common-paths')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = env => ({
	mode: env.mode,
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
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							publicPath: '../'
						}
					},
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
})
