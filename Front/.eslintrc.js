module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  globals: {
    $nuxt: true,
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
  extends: ['plugin:vue/recommended', '@nuxtjs', 'eslint:recommended', 'plugin:prettier-vue/recommended'],
  settings: {
    'prettier-vue': {
      SFCBlocks: {
        template: true,
        script: true,
        style: true,
      },
      usePrettierrc: true,
    },
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'warn',
    'vue/no-v-html': 'off',
    'vue/v-slot-style': 'off',
    'vue/require-prop-types': 'off',
    'vue/require-default-prop': 'off',
    'import/no-named-as-default': 'off',
    'no-return-assign': 'off',
    'no-new': 'off',
    'new-cap': 'off',
    'no-mixed-operators': 'off',
    'prefer-const': 'warn',
    curly: 'off',
    'arrow-parens': 'off',
    eqeqeq: 'warn',
    'no-empty': 'warn',
    camelcase: 0,
  },
}
