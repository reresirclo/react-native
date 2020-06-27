module.exports = {
    presets: ['module:metro-react-native-babel-preset'],
    plugins: [
        [
            'module-resolver',
            {
                root: ['.'],
                extensions: ['.js'],
                alias: {
                    '@src/component': './src/component',
                    '@src/navigation': './src/navigation',
                    '@src/redux': './src/redux',
                    '@src/pages': './src/pages',
                    '@src/services': './src/services',
                },
            },
        ],
    ],
};
