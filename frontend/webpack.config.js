const path = require('path')

module.exports = {
    entry: './src/index.tsx',
    mode: 'production',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                loader: 'ts-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.ts', '.tsx'],
    },
}