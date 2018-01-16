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
const inProduction = (process.env.NODE_ENV === 'production')

// Main config
module.exports = {
	entry: {
		vendor: ['react', 'react-dom'],
		app: path.join(paths.SRC, 'index.jsx')
	},
	output: {
		filename: inProduction? '[name].[chunkhash:8].js' : '[name].js',
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
				test:/\.(s*)css$/,
				use: inProduction 
					? ExtractTextPlugin.extract({
							fallback: 'style-loader',
							use: [
								{
									loader: 'css-loader',
									options: {
										minimize: true
									}
								}, 
								{
									loader: 'postcss-loader'
								}, 
								{
									loader: 'sass-loader'
								}
							]
						}) 
					: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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
	devtool: inProduction ? 'source-map' : 'eval',
	devServer: {
		contentBase: paths.SRC,
		historyApiFallback: true,
		open: true,
		stats: 'minimal',
		overlay: {
      errors: true,
      warnings: true,
    },
		host: paths.HOST,
		port: paths.PORT
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Noice',
			template: path.join(paths.SRC, 'index.html')
		})
	]
}

if (!inProduction) {
	module.exports.plugins.push(
		new webpack.HotModuleReplacementPlugin()
	)
}

if (inProduction) {
	module.exports.plugins.push(
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest",
			minChunks: Infinity
		}),
		new webpack.optimize.UglifyJsPlugin({
			sourceMap: true,
			exclude: [/\.min\.js$/gi]
		}),
		new ExtractTextPlugin({
			filename: '[name].[contenthash:8].css',
			allChunks: true
		})
	)
}