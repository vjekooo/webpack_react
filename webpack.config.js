const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// Something
const inProduction = (process.env.NODE_ENV === 'production')
const cssDevelopment = ['style-loader', 'css-loader', 'sass-loader']
const cssProduction = ExtractTextPlugin.extract({
	use: ['css-loader', 'postcss-loader', 'sass-loader'],
	fallback: 'style-loader'
})
const cssConfig = inProduction ? cssProduction : cssDevelopment
// Constants
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
	JS: path.resolve(__dirname, 'src/js'),
	TEMPLATE: path.resolve(__dirname, 'src/templates/index.html'),
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 8080
}

module.exports = {
	entry: {
		app: path.join(paths.JS, 'index.jsx')
	},
	output: {
		path: paths.DIST,
		filename: '[name].js'
	},
	resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
	module: {
		rules: [
			//  {
      //    enforce: 'pre',
      //    test: /\.js|jsx$/,
      //    use: 'eslint-loader',
      //    exclude: /node_modules/
			//  },
			{ 
				test: /\.jsx?$/, 
				exclude: /node_modules/, 
				use: "babel-loader" 
			},
			{
				test: /\.json$/,
				use: 'json',
				exclude: /node_modules/,
			},
			{
				test: /\.scss$/,
				use: cssConfig
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			},
			{
				test: /\.(png|jpe?g|gif)$/,
				loaders: [
					{
						loader: 'file-loader',
						options: {
							name: 'images/[name].[ext]'
						}
					},
					'img-loader'
				]
			}
		]
	},
	devtool: 'eval-source-map',
	devServer: {
		contentBase: paths.SRC,
		historyApiFallback: true,
		hot: true,
		progress: true,
		stats: 'minimal',
		host: paths.HOST,
		port: paths.PORT
	},
	plugins: [
		new CleanWebpackPlugin([paths.DIST]),
		new ExtractTextPlugin({
			filename: '[name].css',
			disable: !inProduction,
			allChunks: true
		}),
		new webpack.LoaderOptionsPlugin({
			minimize: inProduction
		}),
		new HtmlWebpackPlugin({
			title: 'Noice',
			template: paths.TEMPLATE,
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}

if (inProduction) {
	module.exports.plugins.push(
		new webpack.optimize.UglifyJsPlugin()
	)
}