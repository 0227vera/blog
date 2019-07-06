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
当运行npm init 来创建一个新项目时候，你会发现会输入比较多的配置信息，如果你需要的项目比较多的话，配置npm init 的默认配置信息是有必要的，直接上方法吧
```
npm config set init.author.name "xuanliao"
npm config set init.author.email "1066788870@qq.com"
npm config set init.author.url "https://github.com/"
npm config set init.license "MIT"
```
检查是否将这些属性设置成功，可以使用命令npm config edit 来查看，也可以找到配置文件来查看和修改，如果是想编辑全局的config文件可以直接npm config edit -g来查看和编辑

## 3. 让脚本跨平台兼容
任何命令行上的代码，都有兼容性的风险，特别是在`windows`和`unix`系统（包括`Mac`和`Linux`）之间，如果是当人开发，单台机器那肯定是没有问题，当是大多数时候都是多个人一个项目组联合开发，就必须要做一个项目兼容的问题了，不过好在nodeJS中有模块还是很好用的---`cross-env`，安装不用多说`npm i -D cross-env`使用如下

```json
{
  "scripts":{
    "build":"cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

[cross-env](https://www.npmjs.com/package/cross-env)实现跨平台兼容性的最无缝的方法

[rimraf](https://www.npmjs.com/package/rimraf)可以安装在全球运行跨平台脚本

[ShellJs](https://www.npmjs.com/package/shelljs)是Unix shell命令在Node.js API上的可移植实现。

## 4. 并行运行脚本

<back-to-top />