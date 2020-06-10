module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended', 'vue'],
  // 配置文档 建议 https://www.jianshu.com/p/047b364e5754
  // 配置文档 官方 https://cn.eslint.org/docs/rules/
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-var': "error",
    "vue/no-v-html": "off",
    'max-params': ["error", 3],
    'eqeqeq': 0, // 允许使用非全等
    'no-plusplus': 'off', // 允许使用 ++ --
    "semi": [2, "always"], // 语句强制分号结尾
    'default-case':2, // case 必须有default
    "no-multi-spaces": 1, // 不能用多余的空格
    "no-multiple-empty-lines": [1, {"max": 2}], // 空行最多不能超过2行
    "indent": [2, 2],//缩进风格
    "camelcase": 0, // 可以使用非驼峰命名
    'vue/html-self-closing': ["error", {  // 允许空标签
      "html": {
        "void": "always",
        "normal": "never",
        "component": "normal"
      },
      "svg": "always",
      "math": "always"
    }]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}
