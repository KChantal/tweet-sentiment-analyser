const path = require('path');

module.exports = {
    entry: './client/index.js',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    mode: 'development',
    devServer: {
      publicPath: '/',
      contentBase: '../client/index.html',
      hot: true,
      writeToDisk: true,
      port: 8080,
      proxy: { 
        '/': 'http://localhost:3000'
      }
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
        {
          test: /\.jsx?/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react']
            }
          }
        },
        {
          test: /.(css|scss)$/,
          exclude: /node_modules/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    // plugins: [
    //   new webpack.HotModuleReplacementPlugin()
    // ]
}