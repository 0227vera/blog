# npm

相信现在的前端同学每天都在接触npm这个命名吧，也经常在使用npm去构建项目，安装包，但其实npm不仅仅知识初始化项目的安装包

## 1.基本的快捷方式

### 特别常见的一些快捷键

  * 安装 -- `npm install` ---> `npm i`
  * 卸载 -- `npm uninstall` -- `npm un`
  * 测试 -- `npm test` ---> `npm t`
  * 帮助 -- `npm --help` ---> `npm -h`
  * 全局标志 `--global` ---> `-g`
  * 开发依赖 `-save-dev` ---> `-D`
  * 生产依赖 `--save` ---> `-S`
  * `npm init` 默认值 -- `npm init --yes` || `npm init --force`  ---> `npm init -y` || `npm init -f`

  解释一下
  * `npm i <name>` 表示安装一个包但是不保存他 <======> `npm i <name> --no-save`

### 不是很常见的快捷键

  * 将安装包的信息加到`package.json`中的`optionalDependencies`(可选阶段的依赖)简写`-O`
  * 精准安装到制定版本 简写`-O`

### 根的快捷方式

`.`符号通常便是根目录，npm术语中的应用程序的入口，也就是`package.json`中所指定的值

## 2. 设置默认的npm init有哪些属性

<back-to-top />