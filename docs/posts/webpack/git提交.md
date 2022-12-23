# git提交规范

本来想和eslint放在一块的但是，有一些安装的东西，单独拉出来写一下吧

## 需要安装的包

`npm i @commitlint/cli @commitlint/config-conventional husky -D`

## package.json添加配置

```json
"husky": {
  "hooks": {
    "pre-commit": "npm run lint",
    "commit-msg": "commitlint -E HUSKY_GIT_PARAMS"
  }
}
```

## 添加配置文件`.commitlintrc.js`

```js
module.exports = {
  "extends": [
    "@commitlint/config-conventional"
  ],
  rules: {
    // Place your rules here
    'scope-enum': [2, 'always', ['a', 'b']] // error if scope is given but not in provided list
  },
  'type-enum': [2, 'always', [
    "feat", "fix", "docs", "style", "refactor", "perf", "test", "ci", "chore"
  ]]
}

```

## 提交前缀所表示的含义

* feat: 新功能（feature）
* fix: 修补bug
* docs: 文档（documentation）
* style: 格式（不影响代码运行的变动）
* refactor: 重构（即不是新增功能，也不是修改bug的代码变动）
* test: 增加测试
* chore: 构建过程或辅助工具的变动
* perf: 项目优化
* ci: 进行ci



