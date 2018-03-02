const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

// Constants
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	ASS: path.resolve(__dirname, 'assets'),
	JS: path.resolve(__dirname, 'src/js'),
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 8080
}

// Main config
module.exports = {
	entry: {
		vendor: ['react', 'react-dom'],
		app: path.join(paths.SRC, 'index.jsx')
	},
	output: {
		filename: '[name].[chunkhash:8].js',
		path: paths.DIST
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
        include: paths.SRC
      },
			{ 
				test: /\.jsx?$/,
				include: paths.SRC,
				use: 'babel-loader'
			},
			{
				test: /\.json$/,
				use: 'json',
				include: paths.SRC,
			},
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
	devtool: 'source-map',
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
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			exclude: [/\.min\.js$/gi]
		}),
		new HtmlWebpackPlugin({
			title: 'Noice',
			template: path.join(paths.SRC, 'index.html')
		}),
		new ExtractTextPlugin({
			filename: '[name].[contenthash:8].css',
			allChunks: true
		})
	]
}