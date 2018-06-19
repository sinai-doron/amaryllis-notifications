const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    context: path.resolve(__dirname, 'examples/src'),
    mode:'development',
    entry: {
        app: './app.js',
      },
      output: {
        path: path.resolve(__dirname, 'examples/dist'),
        filename: '[name].js',
        publicPath: '/',
      },
      devServer: {
        contentBase: path.resolve(__dirname, 'examples/src'),
        port: 8000,
      },
      module :{
          rules: [
              {
                oneOf: [
                {
                    test: /\.(js|jsx|mjs)$/,
                    include: [path.resolve(__dirname, 'src/'), path.resolve(__dirname, 'examples/src/')],
                    loader: require.resolve('babel-loader'),
                    options: {
                    
                    // This is a feature of `babel-loader` for webpack (not Babel itself).
                    // It enables caching results in ./node_modules/.cache/babel-loader/
                    // directory for faster rebuilds.
                    cacheDirectory: true,
                    },
                },
            ]
              },
              {
                test: /\.scss$/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {
                        loader: "sass-loader",
                        options: {
                            includePaths: [path.resolve(__dirname, 'src/')]
                        }
                    }
                ]
            }
          ]
  
      },
      resolve: {
        alias: {
          'amaryllis-notifications': path.resolve(__dirname, 'src/index'),
        }
      },
      plugins: [
          new HtmlWebpackPlugin({
              filename: 'index.html',
              inject:true,
              template: path.resolve(__dirname, 'examples/src/index.html')
          })
      ]

}