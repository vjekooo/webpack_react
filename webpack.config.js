const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// Something
const inProduction = (process.env.NODE_ENV === 'production')
const cssDevelopment = ['style-loader', 'css-loader', 'sass-loader']
const cssProduction = ExtractTextPlugin.extract({
	use: ['css-loader', 'sass-loader'],
	fallback: 'style-loader'
})
const cssConfig = inProduction ? cssProduction : cssDevelopment
// Constants
const DIST = path.join(__dirname, 'dist');
const TEMPLATE = path.join(__dirname, 'src/templates/index.ejs')
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8080

module.exports = {
	entry: {
		app: './src/main.jsx'
	},
	output: {
		path: DIST,
		filename: '[name].js'
	},
	resolve: {
    extensions: ['.js', '.jsx', '.json', '.scss', '.css']
  },
	module: {
		rules: [
			// {
      //   enforce: 'pre',
      //   test: /\.js|jsx$/,
      //   use: 'eslint-loader',
      //   exclude: /node_modules/
			// },
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
		historyApiFallback: true,
		hot: true,
		progress: true,
		stats: 'minimal',
		host: HOST,
		port: PORT
	},
	plugins: [
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
			template: TEMPLATE,
      inject: 'body'
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}

if (inProduction) {
	module.exports.plugins.push(
		new CleanWebpackPlugin([DIST]),
		new webpack.optimize.UglifyJsPlugin()
	)
}