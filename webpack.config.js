const webpack = require('webpack')
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const eslintFormatter = require('react-dev-utils/eslintFormatter')
const InlineManifestWebpackPlugin = require('inline-manifest-webpack-plugin')

// Constants
const paths = {
	DIST: path.resolve(__dirname, 'dist'),
	SRC: path.resolve(__dirname, 'src'),
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
        use: [
          {
            options: {
              formatter: eslintFormatter,
              eslintPath: require.resolve('eslint'),
            },
            loader: require.resolve('eslint-loader'),
          },
        ],
        include: paths.JS,
      },
			{ 
				test: /\.jsx?$/, 
				include: paths.SRC, 
				use: "babel-loader" 
			},
			{
				test: /\.json$/,
				use: 'json',
				include: paths.SRC,
			},
			{
				test: /\.scss$/,
				use: inProduction 
					? ExtractTextPlugin.extract({
							use: ['css-loader', 'postcss-loader', 'sass-loader'],
							fallback: 'style-loader'
						}) 
					: ['style-loader', 'css-loader', 'sass-loader']
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
	devtool: inProduction ? 'source-map' : 'eval',
	devServer: {
		contentBase: paths.SRC,
		historyApiFallback: true,
		stats: 'minimal',
		overlay: {
      errors: true,
      warnings: true,
    },
		host: paths.HOST,
		port: paths.PORT
	},
	plugins: []
}

if (!inProduction) {
	module.exports.plugins.push(
		new CleanWebpackPlugin([paths.DIST]),
		new HtmlWebpackPlugin({
			title: 'Noice',
			template: path.join(paths.SRC, 'index.html')
		}),
		new webpack.HotModuleReplacementPlugin()
	)
}

if (inProduction) {
	module.exports.plugins.push(
		// new InlineManifestWebpackPlugin({
		// 	name: 'webpackManifest'
		// }),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
		}),
		new webpack.optimize.CommonsChunkPlugin({
			name: "manifest",
			minChunks: Infinity
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextPlugin({
			filename: '[name].[contenthash:8].css',
			allChunks: true
		})
	)
}