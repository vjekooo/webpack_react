
const commonPaths = require('./common-paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
	entry: {
		vendor: ['react', 'react-dom']
	},
	output: {
		path: commonPaths.outputPath,
		publicPath: '/'
	},
	resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
	module: {
		rules: [
			{
        test: /\.(js|jsx|mjs)$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        include: commonPaths.appEntry
      },
			{ 
				test: /\.jsx?$/,
				include: commonPaths.appEntry,
				use: 'babel-loader'
			},
			{
				test: /\.json$/,
				use: 'json',
				include: commonPaths.appEntry
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: 'assests/img/[name].[ext]'
						}
					},
					'img-loader'
				]
			}
		]
	},
	optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Noice',
			template: `${commonPaths.appEntry}/index.html`,
			favicon: `${commonPaths.appEntry}/favicon.ico`
		})
	]
}

module.exports = config
