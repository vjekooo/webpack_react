
const commonPaths = require('./common-paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const config = {
	entry: {
		vendor: ['react', 'react-dom']
	},
	output: {
		path: commonPaths.outputPath
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
				test: /\.(gif|png|jpe?g|svg)$/i,
				include: `${commonPaths.appEntry}/assets/images`,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'assets/images/[hash:8]-[name].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							mozjpeg: {
								progressive: true,
								quality: 70
							},
							optipng: {
								optimizationLevel: 7
							},
							pngquant: {
								quality: '65-90',
								speed: 4
							},
							gifsicle: {
								interlaced: false,
							}
						}
					}
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
			template: `public/index.html`,
      favicon: `public/favicon.ico`
		})
	]
}

module.exports = config
