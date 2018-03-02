const webpack = require('webpack')
const path = require('path')
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
	mode: 'development',
	entry: {
		vendor: ['react', 'react-dom'],
		app: path.join(paths.SRC, 'index.jsx')
	},
	output: {
		filename: '[name].js',
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
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
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
	devtool: 'inline-source-map',
	devServer: {
		contentBase: paths.SRC,
		historyApiFallback: true,
		open: true,
		hot: true,
		stats: 'minimal',
		overlay: {
      errors: true,
      warnings: true
    },
		host: paths.HOST,
		port: paths.PORT
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'Noice',
			template: path.join(paths.SRC, 'index.html')
		}),
		new webpack.HotModuleReplacementPlugin()
	]
}