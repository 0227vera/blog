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
可以使用`&&`来依次运行两个和多个脚本,但运行起来还是用一定的时间差的，如果说我们想要去并行这其中的几个脚本呢，有点同步异步的意思哈，目前有两种比较流行的解决方案，`concurrent`和`npm-run-all`

首先安装是免不了的 `npm i concurrently -D`
添加脚本
```json
{
   "scripts":{
    "a": "concurrently \"node a2\" \"node a3\" \"node a1\""
   }
}
```
注意写法

## 5. 在不同的目录中运行脚本
如果在不同文件夹下面需要同事运行脚本，我们可以使用cd来完成
```json
{
   "scripts":{
    "a": "concurrently \"node a2\" \"cd a && node a3\" \"cd a && node a1\""
   }
}
```
这样完成是可以，但就是有点low，如何让其优雅起来呢？

我们可以使用`--prefix`来指定路径
```json
{
   "scripts":{
    "a": "concurrently \"node a2\" \"npm start --prefix a\""
   }
}
```
<font color=red>注意这种写法必须要有package.json</font>

## 6. 延迟运行脚本知道端口准备就绪
通常，在后端使用nodeJS书写的时候，坑定是希望同事启动服务端和客户端的，`wait-on`节点模块提供了一种方便的方法来确保旨在某些进程就绪时候发生，有一种简单的理解，在nodeJS中的项目起来之后，再起前端的项目

todo:nodeJS的东西我自己本身还没有系统的学习过，等我用到前后端项目的会，会考虑使用`wait-on`的

## 7. 列出并选择可用脚本
在实际开发过程中我们常常需要起多个项目，但又不想开多个vscode窗口，起项目可以使用concurrently，或者通过ntl来查看并且运行
`npm i -g ntl`
跳到目录相面直接ntl就可以看到`package.json`中的`scripts`有哪些并且可以选择运行这些脚本，这样是不是方便了很多呢

## 8. 关于package.json中的version
我们在研发过程中肯定是需要版本迭代的，下面的两个命令可以帮助我们

`npm version patch` 在最后一位`+1`

`npm version major` 在第一位`+1`

## 9. 命令行直接编辑package.json
`npm i -g json`

`json -I -f package.json -e 'this.scripts.a=\"node a1\"'`

参数解释
`-I`就地编辑
`-f`强制修改

这样可以直接在命令行编辑package.json里面的所有信息

## 10 自动设置和打开github库
如果`package.json`文件中有`repository`，则可以通过输入 `npm repo`在默认浏览器中打开它。

如果你的项目已经连接到远程存储库，并且已经在命令行上安装了git，那你可以使用这个命令找到你的连接存储库

`git config --get remote.origin.url`

更好的解决方案是可以使用如下脚本
```
json -I -f package.json -e "this.repository=\"$(git config --get remote.origin.url)\""
```

## 11. 自定义`npm init`脚本

1. 找到npm所在的目录建立一个`.npm-init.js`文件

确保`.npm-init.js`被指向正确

2. `npm config set init -module ~\.npm-init.js`

3. 编写`.npm-init.js`
```js
module.exports = {
  name: prompt('package name', basename || package.name),
  version: prompt('version', '1.0.0'),
  decription: prompt('description', '这是npm自定义的文件'),  
  main: prompt('entry point', 'index.js'),
  repository: prompt('git repository', 'https://github.com/0227vera'),
  keywords: prompt(function (s) { return s.split(/\s+/) }),
  author: prompt('author', 'xuanliao <1066788870@qq.com>'),
  license: prompt('license', 'ISC')
}
```
之后的这个文件可以修改和删除

## 12. 使用自定义npm init 脚本将第一个commit提交到github

为了将git命名合并到`.npm-init.js`文件中，需要一种方法来控制命令行，可以使用`child_process`模块，在文件中引入它，但是我们只需要`execSync`函数

`const {execSync} = require('child_process')`

修改刚才的`.npm-init.js`

```js
const { execSync } = require('child_process')
let run = func => {
  console.log('-------->', execSync(func).toString())
}
module.exports = {
  name: prompt('package name', basename || package.name),
  version: prompt('version', '1.0.0'),
  decription: prompt('description', '这是npm自定义的文件'),  
  main: prompt('entry point', 'index.js'),
  keywords: prompt(function (s) { return s.split(/\s+/) }),
  author: prompt('author', 'xuanliao <1066788870@qq.com>'),
  license: prompt('license', 'ISC'),
  repository: prompt('git repository url', '', url => {
    if (url) {
      run ('git init')
      run ('git add .')
      run ('git commit -m "first commit"')
      run (`git remote add origin ${url}`)
      run ('git push -u origin master')
    }
    return url
  }),
}
```
这个还是比较秀的，可以反杀一波

<back-to-top />

<gitask />