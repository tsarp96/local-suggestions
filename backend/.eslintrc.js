module.exports = {
    env: {
        node: true,
        es2021: true,
        jest: true,
    },
    extends: 'airbnb-base',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    rules: {
        'no-console': 'off',
        'indent': ['error', 4],
        'linebreak-style': 'off',
    },
}; 