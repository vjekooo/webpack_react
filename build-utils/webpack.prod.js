
const commonPaths = require('./common-paths')
const webpack = require('webpack')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

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
							loader: "css-loader",
							options: {
									minimize: {
											safe: true
									}
							}
					},
					{
							loader: "postcss-loader",
							options: {
								config: {
                  ctx: {
                    autoprefixer: {
                      browsers: 'last 2 versions'
                    }
                  }
                }
							},
					},
					{
							loader: "sass-loader",
							options: {}
					}
				]
			}
		]
	},
	devtool: 'source-map',
	plugins: [
		new MiniCssExtractPlugin({
      filename: "[name]-[contenthash].css"
    })
	]
}

module.exports = config
