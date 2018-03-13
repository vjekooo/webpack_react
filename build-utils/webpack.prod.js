
const commonPaths = require('./common-paths')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

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
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{
							loader: 'css-loader',
							options: {
								minimize: true,
								sourceMap: true
							}
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
				})
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new ExtractTextPlugin({
			filename: 'style/[name].[contenthash:8].css',
			allChunks: true
		})
	]
}

module.exports = config
