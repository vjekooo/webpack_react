
const commonPaths = require('./common-paths')
const webpack = require('webpack')

const port = process.env.PORT || 3000

const config = {
	mode: 'development',
	entry: {
    app: ['react-hot-loader/patch', `${commonPaths.appEntry}/index.jsx`]
  },
	output: {
		filename: '[name].[hash].js'
	},
	module: {
		rules: [
			{
				test: /\.(s*)css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'postcss-loader',
						options: {
							config: {
								ctx: {
									autoprefixer: {
										browsers: 'last 2 versions'
									}
								}
							}
						}
					},
					{
						loader: 'sass-loader'
					}
				]
			}
		]
	},
	devtool: 'inline-source-map',
	devServer: {
		host: 'localhost',
		historyApiFallback: true,
		open: true,
		hot: true,
		stats: 'minimal',
		port: port,
		overlay: {
      errors: true,
      warnings: true
    }
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin()
	]
}

module.exports = config
