# eslint

eslint 代码规范，之前开发的时候挺不喜欢用的，感觉总是喜欢报一些书写习惯的问题，但后来一次偶然的机会使用了一次之后，发现真的很好用，对于代码的规范有很大的帮助，用完之后发现腰不酸了腿不疼了，一口气可以爬上5楼了

## vue中

使用eslint 需要安装

1. eslint
2. eslint-loader

附上我喜欢的一个.eslintrc.js 并不是标准的

```js
// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    es6: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': 'off',
    'no-unused-vars': 'off', //做检测
    'no-useless-escape': 'error', //做检测
    'no-multiple-empty-lines': [
      2,
      {
        max: 3
      }
    ],

    // 'array-element-newline': ['error', { multiline: true }], //强制数组元素间出现换行
    'no-unneeded-ternary': 'error', //禁止可以在有更简单的可替代的表达式时使用三元操作符
    'no-new-func': 1, //禁止使用 new 以避免产生副作用
    'no-with': 'error', //禁用 with 语句
    'no-eval': 'error', //禁用 eval()
    'no-new-wrappers': 'error', //禁止对 String，Number 和 Boolean 使用 new 操作符
    'no-var': 'error', //要求使用 let 或 const 而不是 var
    'prefer-template': 'error', //要求使用模板字面量而非字符串连接
    'prefer-rest-params': 'error', //要求使用剩余参数而不是 arguments
    'vue/no-side-effects-in-computed-properties': 'off',
    'prettier/prettier': [
      "off", //关闭所有会引起冲突的规则
      {
        printWidth: 120, //设置prettier单行输出（不折行）的（最大）长度。
        tabWidth: 2, //设置工具每一个水平缩进的空格数
        useTabs: true, //如果为true，则使用制表符tab缩进行
        singleQuote: true, //使用单引号而非双引号；
        semi: true, //true，在每一条语句后面添加分号
        trailingComma: 'none', //在任何可能的多行中输入尾逗号， none无尾逗号。
        bracketSpacing: true, //在对象字面量声明所使用的的花括号后（{）和前（}）输出空格
        jsxBracketSameLine: false, //在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
        insertPragma: false, //Prettier可以在文件的顶部插入一个 @format的特殊注释，以表明改文件已经被Prettier格式化过了
        requirePragma: false, //Prettier可以严格按照按照文件顶部的一些特殊的注释格式化代码，这些注释称为“require pragma”(必须杂注)
      }
    ],
    "no-undef":"off"
  }
}

```

除了以上的配置以外，还需要vscode下载插件eslint，以及对编辑器的setting.json配置

```json
"editor.formatOnSave": true,
"editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
}
```

------

以上是在vue中使用的eslint的配置，亲测认为还是很好用的，但是在react+mobx的开发模式中，需要有些es7的属性，配合babel做一些eslint的更新

-----

## react中

在配置eslint的过程中，确实走了很多的弯路，总之还是没有好好先看官方文档

贴上一段目前在使用的配置吧

```js
module.exports = {
  extends: [
    "react-app", //  react帮配置好了一些语法，譬如箭头函数
    "airbnb",
    "plugin:prettier/recommended", // prettier配置
  ],
  env: {
    node: true,
    browser: true,
  },
  settings: {
    "import/resolver": {
      typescript: {},
    },
  },
  rules: {
    "import/first": 1, // 库的引用需要放在文件的开头，这个由于习惯，喜欢把一些逻辑放在一起写，暂时给为警告
    "no-unused-expressions": 1,
    "react/jsx-pascal-case": 0,
    "react/destructuring-assignment": [
      true,
      "always",
      {
        ignoreClassFields: false,
      },
    ],

    "comma-dangle": [
      "error",
      {
        arrays: "always-multiline",
        objects: "always-multiline",
        imports: "always-multiline",
        exports: "always-multiline",
        functions: "only-multiline", // 关闭airbnb对函数调用参数，非一行，最后也要加逗号的限制
      },
    ],
    "react/jsx-filename-extension": 0, // 关闭airbnb对于jsx必须写在jsx文件中的设置，在mobx中有时候是需要写jsx的
    "no-param-reassign": 0, // 关闭禁止对传参的改变，因为有些地方确实需要改变
    "react/prop-types": 0, // 关闭airbnb对于必须添加prop-types的校验，这个看个人习惯，我自己是觉得有些是可以不需要检验的，在书写的时候给好默认值就可以,感觉加上之后大大减小了开发效率
    "react/jsx-one-expression-per-line": 0, // 关闭要求一个表达式必须换行的要求，和Prettier冲突了
    "react/jsx-wrap-multilines": 0, // 关闭要求jsx属性中写jsx必须要加括号，和Prettier冲突了
    "jsx-a11y/no-static-element-interactions": 0, // 关闭非交互元素加事件必须加 role
    "jsx-a11y/click-events-have-key-events": 0, // 关闭click事件要求有对应键盘事件
    "no-bitwise": 0, // 不让用位操作符，在我的书写习惯里，有一些地方是会使用到位运算的
    "react/jsx-props-no-spreading": 0,
    "jsx-a11y/anchor-is-valid": 0,
    "jsx-a11y/no-static-element-interactions": 0,
    "import/no-duplicates": 0,
    "jsx-a11y/click-events-have-key-events": 0,
    "import/no-extraneous-dependencies": 0,
    "import/prefer-default-export": 0,
    "react/destructuring-assignment": 0,
    "import/no-unresolved": 0,
    "import/extensions": 0,
    "import/no-named-as-default": 0,
    "import/no-named-as-default-member": 0,
  },
}
```

自动保存的规则在eslint配置就好，没有必要修改全局的配置

[eslint官网](https://eslint.org/)

