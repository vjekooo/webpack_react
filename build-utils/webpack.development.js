const commonPaths = require('./common-paths')
const ESLintPlugin = require('eslint-webpack-plugin')
const webpack = require('webpack')
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const port = process.env.PORT || 3000

module.exports = env => ({
	mode: env.mode,
	entry: {
		app: [`${commonPaths.appEntry}/index.tsx`]
	},
	resolve: {
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
	optimization: {
		runtimeChunk: 'single'
	},
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
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshPlugin({
			exclude: /node_modules/,
			include: commonPaths.appEntry,
			overlay: {
				sockPath: '/ws'
			}
		}),
		new ESLintPlugin({
			extensions: ['.tsx', '.ts', '.js'],
			exclude: 'node_modules'
		})
	].filter(Boolean)
})
