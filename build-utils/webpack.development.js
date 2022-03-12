const commonPaths = require('./common-paths')
const webpack = require('webpack')
const ESLintPlugin = require('eslint-webpack-plugin')

const port = process.env.PORT || 3000

module.exports = env => ({
	mode: env.mode,
	entry: {
		app: [`${commonPaths.appEntry}/index.tsx`]
	},
	resolve: {
		alias: {
			'react-dom': '@hot-loader/react-dom'
		},
		extensions: ['.ts', '.tsx', '.js', '.jsx']
	},
	output: {
		filename: '[name].js',
		publicPath: '/'
	},
	module: {
		rules: []
	},
	devtool: 'inline-source-map',
	devServer: {
		host: 'localhost',
		historyApiFallback: true,
		open: true,
		hot: true,
		port: port,
		client: {
			progress: true,
			logging: 'info',
			overlay: {
				errors: true,
				warnings: false
			}
		}
	},
	stats: 'minimal',
	plugins: [
		new ESLintPlugin({
			extensions: ['.tsx', '.ts', '.js'],
			exclude: 'node_modules'
		})
	]
})
