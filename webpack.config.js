// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');

const isProduction = process.env.NODE_ENV == 'production';



const config = {
    entry: 'Assets/js/index.js',
    output: {
        path: path.resolve(__dirname, 'Assets'),
        clean: true
    },
    devServer: {
        open: true,
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
            meta: {
              'og:title': { property: 'og:title', content: 'All Tech News' },
              'og:description': {
                property: 'og:description',
                content:
                  'All the news for tech people, using API from Hacker News.',
              },
              'og:type': { property: 'og:type', content: 'website' },
              'og:url': {
                property: 'og:url',
                content: '',
              },
              'og:image': {
                property: 'og:image',
                content: 'Assets/img/android-chrome-512x512.png',
              },
              'og:image:alt': {
                property: 'og:image:alt',
                content: 'All Tech News',
              },
              'twitter:card': {
                name: 'twitter:card',
                content: 'summary_large_image',
              },
              'twitter:title': { name: 'twitter:title', content: 'All Tech News' },
              'twitter:description': {
                name: 'twitter:description',
                content:
                  'All the news for tech people, using API from Hacker News.',
              },
              'twitter:image': {
                name: 'twitter:image',
                content: 'Assets/img/android-chrome-512x512.png',
              },
              'twitter:image:alt': {
                name: 'twitter:image:alt',
                content: 'All Tech News',
              },
            },
          }),

        new MiniCssExtractPlugin({
            filename: 'Assets/css/style.css'
        })

        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader,'css-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset/resource',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin());
        
        
        config.plugins.push(new WorkboxWebpackPlugin.GenerateSW());
        
    } else {
        config.mode = 'development';
    }
    return config;
};
