# 基础知识

## npm

相信现在的前端同学每天都在接触 npm 这个命名吧，也经常在使用 npm 去构建项目，安装包，但其实 npm 不仅仅知识初始化项目的安装包

### 1.基本的快捷方式

#### 特别常见的一些快捷键

- 安装 -- `npm install` ---> `npm i`
- 卸载 -- `npm uninstall` -- `npm un`
- 测试 -- `npm test` ---> `npm t`
- 帮助 -- `npm --help` ---> `npm -h`
- 全局标志 `--global` ---> `-g`
- 开发依赖 `-save-dev` ---> `-D`
- 生产依赖 `--save` ---> `-S`
- `npm init` 默认值 -- `npm init --yes` || `npm init --force` ---> `npm init -y` || `npm init -f`

解释一下

- `npm i <name>` 表示安装一个包但是不保存他 <======> `npm i <name> --no-save`

#### 不是很常见的快捷键

- 将安装包的信息加到`package.json`中的`optionalDependencies`(可选阶段的依赖)简写`-O`
- 精准安装到制定版本 简写`-O`

#### 根的快捷方式

`.`符号通常便是根目录，npm 术语中的应用程序的入口，也就是`package.json`中所指定的值

### 2. 设置默认的 npm init 有哪些属性

当运行 npm init 来创建一个新项目时候，你会发现会输入比较多的配置信息，如果你需要的项目比较多的话，配置 npm init 的默认配置信息是有必要的，直接上方法吧

```
npm config set init.author.name "xuanliao"
npm config set init.author.email "1066788870@qq.com"
npm config set init.author.url "https://github.com/"
npm config set init.license "MIT"
```

检查是否将这些属性设置成功，可以使用命令 npm config edit 来查看，也可以找到配置文件来查看和修改，如果是想编辑全局的 config 文件可以直接 npm config edit -g 来查看和编辑

### 3. 让脚本跨平台兼容

任何命令行上的代码，都有兼容性的风险，特别是在`windows`和`unix`系统（包括`Mac`和`Linux`）之间，如果是当人开发，单台机器那肯定是没有问题，当是大多数时候都是多个人一个项目组联合开发，就必须要做一个项目兼容的问题了，不过好在 nodeJS 中有模块还是很好用的---`cross-env`，安装不用多说`npm i -D cross-env`使用如下

```json
{
  "scripts": {
    "build": "cross-env NODE_ENV=production webpack --config build/webpack.config.js"
  }
}
```

[cross-env](https://www.npmjs.com/package/cross-env)实现跨平台兼容性的最无缝的方法

[rimraf](https://www.npmjs.com/package/rimraf)可以安装在全球运行跨平台脚本

[ShellJs](https://www.npmjs.com/package/shelljs)是 Unix shell 命令在 Node.js API 上的可移植实现。

### 4. 并行运行脚本

可以使用`&&`来依次运行两个和多个脚本,但运行起来还是用一定的时间差的，如果说我们想要去并行这其中的几个脚本呢，有点同步异步的意思哈，目前有两种比较流行的解决方案，`concurrent`和`npm-run-all`

首先安装是免不了的 `npm i concurrently -D`
添加脚本

```json
{
  "scripts": {
    "a": "concurrently \"node a2\" \"node a3\" \"node a1\""
  }
}
```

注意写法

### 5. 在不同的目录中运行脚本

如果在不同文件夹下面需要同事运行脚本，我们可以使用 cd 来完成

```json
{
  "scripts": {
    "a": "concurrently \"node a2\" \"cd a && node a3\" \"cd a && node a1\""
  }
}
```

这样完成是可以，但就是有点 low，如何让其优雅起来呢？

我们可以使用`--prefix`来指定路径

```json
{
  "scripts": {
    "a": "concurrently \"node a2\" \"npm start --prefix a\""
  }
}
```

<font color=red>注意这种写法必须要有 package.json</font>

### 6. 延迟运行脚本知道端口准备就绪

通常，在后端使用 nodeJS 书写的时候，坑定是希望同事启动服务端和客户端的，`wait-on`节点模块提供了一种方便的方法来确保旨在某些进程就绪时候发生，有一种简单的理解，在 nodeJS 中的项目起来之后，再起前端的项目

todo:nodeJS 的东西我自己本身还没有系统的学习过，等我用到前后端项目的会，会考虑使用`wait-on`的

### 7. 列出并选择可用脚本

在实际开发过程中我们常常需要起多个项目，但又不想开多个 vscode 窗口，起项目可以使用 concurrently，或者通过 ntl 来查看并且运行
`npm i -g ntl`
跳到目录相面直接 ntl 就可以看到`package.json`中的`scripts`有哪些并且可以选择运行这些脚本，这样是不是方便了很多呢

### 8. 关于 package.json 中的 version

我们在研发过程中肯定是需要版本迭代的，下面的两个命令可以帮助我们

`npm version patch` 在最后一位`+1`

`npm version major` 在第一位`+1`

### 9. 命令行直接编辑 package.json

`npm i -g json`

`json -I -f package.json -e 'this.scripts.a=\"node a1\"'`

参数解释
`-I`就地编辑
`-f`强制修改

这样可以直接在命令行编辑 package.json 里面的所有信息

### 10 自动设置和打开 github 库

如果`package.json`文件中有`repository`，则可以通过输入 `npm repo`在默认浏览器中打开它。

如果你的项目已经连接到远程存储库，并且已经在命令行上安装了 git，那你可以使用这个命令找到你的连接存储库

`git config --get remote.origin.url`

更好的解决方案是可以使用如下脚本

```
json -I -f package.json -e "this.repository=\"$(git config --get remote.origin.url)\""
```

### 11. 自定义`npm init`脚本

1. 找到 npm 所在的目录建立一个`.npm-init.js`文件

确保`.npm-init.js`被指向正确

2. `npm config set init -module ~\.npm-init.js`

3. 编写`.npm-init.js`

```js
module.exports = {
  name: prompt("package name", basename || package.name),
  version: prompt("version", "1.0.0"),
  decription: prompt("description", "这是npm自定义的文件"),
  main: prompt("entry point", "index.js"),
  repository: prompt("git repository", "https://github.com/0227vera"),
  keywords: prompt(function (s) {
    return s.split(/\s+/);
  }),
  author: prompt("author", "xuanliao <1066788870@qq.com>"),
  license: prompt("license", "ISC"),
};
```

之后的这个文件可以修改和删除

### 12. 使用自定义 npm init 脚本将第一个 commit 提交到 github

为了将 git 命名合并到`.npm-init.js`文件中，需要一种方法来控制命令行，可以使用`child_process`模块，在文件中引入它，但是我们只需要`execSync`函数

`const {execSync} = require('child_process')`

修改刚才的`.npm-init.js`

```js
const { execSync } = require("child_process");
let run = (func) => {
  console.log("-------->", execSync(func).toString());
};
module.exports = {
  name: prompt("package name", basename || package.name),
  version: prompt("version", "1.0.0"),
  decription: prompt("description", "这是npm自定义的文件"),
  main: prompt("entry point", "index.js"),
  keywords: prompt(function (s) {
    return s.split(/\s+/);
  }),
  author: prompt("author", "xuanliao <1066788870@qq.com>"),
  license: prompt("license", "ISC"),
  repository: prompt("git repository url", "", (url) => {
    if (url) {
      run("git init");
      run("git add .");
      run('git commit -m "first commit"');
      run(`git remote add origin ${url}`);
      run("git push -u origin master");
    }
    return url;
  }),
};
```

这个还是比较秀的，可以反杀一波

### 13. mac上面npm权限的问题

`sudo chown -R $USER /usr/local`

## 视频学习关键点记录

这一部分的学习，只要是想先学习一些基础的东西，能够简单的完成一个网站

### http

使用 http 起一个服务

```js
const http = require("http");

const server = http.createServer((req, res) => {});
server.listen(8080);
```

### fs

全称：File System

```js
const fs = require('fs');
fs.readFile('地址', (err, data) => {
  if (err) {new Error err}
  console.log(data)
})
fs.writeFile('地址', '内容', (err, data) => {
  if (err) new Error(err)
})
```

### get 请求的数据处理

```js
const urlLib = require("url");
const http = require("http");

const server = http.createServer((req, res) => {
  const obj = urlLib.parse(req.url, true);
  const url = obj.pathname;
  const GET = obj.query;
});
server.listen(8080);
```

### post 请求的数据处理

```js
const querystring = require("querystring");
const http = require("http");

const server = http.createServer((req, res) => {
  let str = "";
  req.on("data", (data) => {
    str += data;
  });
  req.on("end", () => {
    const POST = querystring.parse(str);
  });
});
server.listen(8080);
```

### 文件上传的数据处理

multer：

```js
const express = require("express");

let server = express();
server.listen(8080);
const multer = require("multer");
const objMulter = multer({
  dest: "./www/upload/",
  limit: 2 * 1024 * 1024, // 文件大小
});
server.use(objMulter.any()); // 可以接收任何类型，任何数量的
server.use("/upload", (req, res) => {
  console.log(req.files);
  // 然后用fs.rename()重命名把文件类型加上
});
```

### 模块化

1. 系统模块：
  http、
  querystring、
  url、
  Crypo（加密）、
  Events（事件）、
  OS（操作系统的相关信息）、
  Path（路径相关）、
  Net（网络操作）、
  Stream（流操作）、
  Timers（定时器）、
  ZLIB（压缩）
  等
2. 自己写模块：（CMD 规范）

```js
// 抽取的模块 module.js
module.exports = () => {
  var name = "salvatore";
  this.changeName = (changeName) => {
    name = changeName;
  };
  this.getName = () => {
    return name;
  };
  this.setName = (newname) => {
    name = newname;
  };
  return this;
};
// 使用模块
const module = require("./module.js");
```

### express 框架

```js
const express = require("express");
const server = express();
// post数据使用，中间件
const bodyParser = require("body-parser"); // 只能解决数据类的东西
server.use(
  bodyParser.urlencoded({
    extended: false, // 扩展,true--->启用扩展模式
    limit: 2 * 1024, // 限制2M，默认是100K
  })
);
server.use("路径", (req, res, next) => {
  // use = post or get

  // get数据
  const get = req.query;
  // post数据 body-parser
  const post = req.body;
  req.test = 3;
  next();
});
server.use("和上面相同的路劲", (req, res, next) => {
  console.log("和上面的形成链式操作", res.test); // 3
  res.send("aaa");
  res.end();
});
server.listen(8080);
```

### 中间键

express-static

```js
const static = require("express-static");
const express = require("express");
const server = express();
server.listen(8080);
server.use(static("./www"));
```

### cookie、session 以及加签名的问题的问题

```js
const secret = "aghahgaljdsfhajgha";
const cookieParser = require("cookie-parser");
const cookieSession = require("cookie-session");
const express = require("express");
const server = express();
const keys = ["qqq", "www", "eee"]; // session的密钥
server.use(cookieParser(secret));
server.use(
  cookieSession({
    keys,
    name: "sess", // session的名字
    maxAge: 20 * 60 * 1000, // 过期时间
  })
); // 放在cookie后面
server.use("路径", (req, res, next) => {
  // cookie的发送
  // req.secret = secret // cookie的一个密钥
  res.cookie("key", "value", {
    path: "/aaa",
    maxAge: 30 * 24 * 60 * 60 * 1000, // ms为单位
    signed: true, // 添加签名
  });
  // cookie的读取
  // 签名的cookies
  console.log("签名cookies--->", res.signedCookies);

  // 没有签名的cookies
  console.log("没有签名cookies--->", req.cookies); // 可以访问底下的，不能向上访问

  // 删除cookie，某一条cookie
  res.clear("key");

  // session 的读取
  console.log(req.session);
  // 删除session
  delete req.session; // delete删除的是服务器上面的东西
  res.send("ok");
  res.end();
});

server.listen(8080);
```

### route 路由的问题

```js
// server.js
const express = require("express");
const userRouter = require("./userRouter");
let server = express();
server.listen(8080);
server.use("/user", userRouter);
```

```js
// userRouter.js
const express = require("express");
module.exports = () => {
  const router = express.Router();
  router.get("/login", (req, res) => {
    // 做登陆的操作
  });
  router.get("/register", (req, res) => {
    // 做注册的操作
  });
  return router;
};
```

### SQL 的问题

```js
const mysql = require("mysql");
let db = mysql.createConnection({
  // 连接
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "newtest",
});
// mysql.createPool() 连接池
// 2，查询 (curd) 非常典型的异步操作，肯定会有回调函数
db.query("SELECT * FROM `user_table`;", (err, data) => {
  if (err) {
    throw err;
  } else {
    console.log("--------->", JSON.stringify(data));
  }
});
```

## mySql

### MySql 关系性数据库

- 这一步部分，因为之前没有做过数据相关的东西，所以得先花一段时间来把数据库的知识先好好补补

- 什么是数据库？

1. 数据库（Database）是按照数据结构来组织、存储和管理数据的仓库。每个数据库都有一个或多个不同的 API 用于创建，访问，管理，搜索和复制所保存的数据。我们也可以将数据存储在文件中，但是在文件中读写数据速度相对较慢。所以，现在我们使用关系型数据库管理系统（RDBMS）来存储和管理的大数据量。所谓的关系型数据库，是建立在关系模型基础上的数据库，借助于集合代数等数学概念和方法来处理数据库中的数据。

- RDBMS 即关系数据库管理系统(Relational Database Management System)的特点：

1. 数据以表格的形式出现
2. 每行为各种记录名称
3. 每列为记录名称所对应的数据域
4. 许多的行和列组成一张表单
5. 若干的表单组成database

- RDBMS 术语

1. 数据库: 数据库是一些关联表的集合。
2. 数据表: 表是数据的矩阵。在一个数据库中的表看起来像一个简单的电子表格。
3. 列: 一列(数据元素) 包含了相同的数据, 例如邮政编码的数据。
4. 行：一行（=元组，或记录）是一组相关的数据，例如一条用户订阅的数据。
5. 冗余：存储两倍数据，冗余降低了性能，但提高了数据的安全性。
6. 主键：主键是唯一的。一个数据表中只能包含一个主键。你可以使用主键来查询数据。
7. 外键：外键用于关联两个表。
8. 复合键：复合键（组合键）将多个列作为一个索引键，一般用于复合索引。
9. 索引：使用索引可快速访问数据库表中的特定信息。索引是对数据库表中一列或多列的值进行排序的一种结构。类似于书籍的目录。
10. 参照完整性: 参照的完整性要求关系中不允许引用不存在的实体。与实体完整性是关系模型必须满足的完整性约束条件，目的是保证数据的一致性。

- MySQL数据库

MySQL 是一个关系型数据库管理系统，由瑞典 MySQL AB 公司开发，目前属于 Oracle 公司。MySQL 是一种关联数据库管理系统，关联数据库将数据保存在不同的表中，而不是将所有数据放在一个大仓库内，这样就增加了速度并提高了灵活性。

1. MySQL 是开源的，所以你不需要支付额外的费用。
2. MySQL 支持大型的数据库。可以处理拥有上千万条记录的大型数据库。
3. MySQL 使用标准的 SQL 数据语言形式。
4. MySQL 可以运行于多个系统上，并且支持多种语言。这些编程语言包括 C、C++、Python、Java、Perl、PHP、Eiffel、Ruby 和 Tcl 等。
5. MySQL 对PHP有很好的支持，PHP 是目前最流行的 Web 开发语言。
6. MySQL 支持大型数据库，支持 5000 万条记录的数据仓库，32 位系统表文件最大可支持 4GB，64 位系统支持最大的表文件为8TB。
7. MySQL 是可以定制的，采用了 GPL 协议，你可以修改源码来开发自己的 MySQL 系统。

### 基本数据库知识

#### 单表问题

#### 1. SQL、DB、DBMS分别是什么，他们的关系是什么关系

- DB：DataBase（数据库，数据库实际上再硬盘上以文件的形式存在）

- DBMS：DataBase Management System （数据库管理系统，常见的有：MySQL、Oracle、DB2...）

- SQL：

1. 结构化查询语言，是一门标准通用的语言。标准的sql适合于所有的数据库产品
2. SQL数据高级语言，只要能看懂英文单词的，写出来的sql语句，可以读懂什么意思
3. SQL语句执行的时候，实际上内部也先进行了编译，然后再执行sql。（sql语句的编辑又DNMS完成）

- DBMS：负责执行sql语句，通过执行语句来操作DB当中的数据

> DBMS -(执行)--> SQL -(操作)--> DB

#### 2. 表

- 表：table是数据库的基本组成单元，所有的数据都以表的形式组织，目的是可读性强

- 一个表包含行和列：

1. 行：被称为数据/记录（data）
2. 列：被称为字段（column）

每一个字段应该包含的属性？字段名、数据类型、相关的约束条件

#### 3. 学习MySQL主要是学习通用的SQL语句，那么SQL语句包括增删改查，SQL语句怎么分类呢？

- DQL （数据查询语句）：查询语句，凡是select语句都是DQL
- DML （数据操作语句）：insert、delete、update，对表当中的数据进行增删改
- DDL （数据定义语言）：create、drop、alter、对表结构的增删改
- TCL （事务控制语言）：commit提交事务、rollback回滚事务。（TCL中的T是transaction）
- DCL （数据控制语言）：grant授权，revoke撤销劝降等

#### 4. 导入数据（联系的过程中使用的都是导入的数据）

1. 登陆MySQL数据库系统

2. 查看有哪些数据库：show databases;（这个不是SQL语句，数据MySQL的命令）

3. 创建数据自己的数据库：create database salvatoredata;

4. 使用salvatoredata数据库：use salvatoredata;

5. 查看当前使用的数据库中有哪些表：show tables;

6. 初始化数据：source 文件路径

#### 5. spl脚本

文件以sql结尾，这样的文件被称为“sql脚本”，什么是sql脚本呢？

但一个文件的扩展名是.sql，并且该文件编写了大量的sql语句，我们称这样的文件为sql脚本

#### 6. 删除数据库：drop database salvatoredata

#### 7. 查看表结构：desc 表名

```
mysql> desc emp;
+----------+-------------+------+-----+---------+-------+
| Field    | Type        | Null | Key | Default | Extra |
+----------+-------------+------+-----+---------+-------+
| EMPNO    | int(4)      | NO   | PRI | NULL    |       |
| ENAME    | varchar(10) | YES  |     | NULL    |       |
| JOB      | varchar(9)  | YES  |     | NULL    |       |
| MGR      | int(4)      | YES  |     | NULL    |       |
| HIREDATE | date        | YES  |     | NULL    |       |
| SAL      | double(7,2) | YES  |     | NULL    |       |
| COMM     | double(7,2) | YES  |     | NULL    |       |
| DEPTNO   | int(2)      | YES  |     | NULL    |       |
+----------+-------------+------+-----+---------+-------+

mysql> desc dept;
+--------+-------------+------+-----+---------+-------+
| Field  | Type        | Null | Key | Default | Extra |
+--------+-------------+------+-----+---------+-------+
| DEPTNO | int(2)      | NO   | PRI | NULL    |       |
| DNAME  | varchar(14) | YES  |     | NULL    |       |
| LOC    | varchar(13) | YES  |     | NULL    |       |
+--------+-------------+------+-----+---------+-------+

mysql> desc salgrade;
+-------+---------+------+-----+---------+-------+
| Field | Type    | Null | Key | Default | Extra |
+-------+---------+------+-----+---------+-------+
| GRADE | int(11) | YES  |     | NULL    |       |
| LOSAL | int(11) | YES  |     | NULL    |       |
| HISAL | int(11) | YES  |     | NULL    |       |
+-------+---------+------+-----+---------+-------+
```

#### 8. 表格中的数据：select * from 表名;（这个是SQL语句）

```
mysql> select * from emp;
+-------+--------+-----------+------+------------+---------+---------+--------+
| EMPNO | ENAME  | JOB       | MGR  | HIREDATE   | SAL     | COMM    | DEPTNO |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK     | 7902 | 1980-12-17 |  800.00 |    NULL |     20 |
|  7499 | ALLEN  | SALESMAN  | 7698 | 1981-02-20 | 1600.00 |  300.00 |     30 |
|  7521 | WARD   | SALESMAN  | 7698 | 1981-02-22 | 1250.00 |  500.00 |     30 |
|  7566 | JONES  | MANAGER   | 7839 | 1981-04-02 | 2975.00 |    NULL |     20 |
|  7654 | MARTIN | SALESMAN  | 7698 | 1981-09-28 | 1250.00 | 1400.00 |     30 |
|  7698 | BLAKE  | MANAGER   | 7839 | 1981-05-01 | 2850.00 |    NULL |     30 |
|  7782 | CLARK  | MANAGER   | 7839 | 1981-06-09 | 2450.00 |    NULL |     10 |
|  7788 | SCOTT  | ANALYST   | 7566 | 1987-04-19 | 3000.00 |    NULL |     20 |
|  7839 | KING   | PRESIDENT | NULL | 1981-11-17 | 5000.00 |    NULL |     10 |
|  7844 | TURNER | SALESMAN  | 7698 | 1981-09-08 | 1500.00 |    0.00 |     30 |
|  7876 | ADAMS  | CLERK     | 7788 | 1987-05-23 | 1100.00 |    NULL |     20 |
|  7900 | JAMES  | CLERK     | 7698 | 1981-12-03 |  950.00 |    NULL |     30 |
|  7902 | FORD   | ANALYST   | 7566 | 1981-12-03 | 3000.00 |    NULL |     20 |
|  7934 | MILLER | CLERK     | 7782 | 1982-01-23 | 1300.00 |    NULL |     10 |
+-------+--------+-----------+------+------------+---------+---------+--------+
```

#### 9. 常见命令

- create database name; 创建数据库
- use name; 使用哪个数据库
- select database(); 查看使用的哪个数据库
- select version(); 查看数据库版本
- \c 结束一条语句
- exit 退出mysql
- show tables from name; 查看name数据库的表

#### 10. 查看创建表的语句

- show create table name; 查看name表的创建语句

#### 11. 简单的查询语句（DQL）

- 语法格式： select 字段名1,字段名2,字段名3... from 表名;(任何一条sql语句以分号结尾)

注意：

1. 任何一条sql语句以分号结尾
2. sql语句不区分大小写
3. 字段可以经行数学计算，计算的别名使用as：select sal * 12 as 'allSal' from emp; as可以使用空格代替
4. 实际开发中不建议使用 select * from tablename;效率比较低

12. 条件查询：

select 字段 from 表名 where 条件；执行顺序是：先from，然后where，最后select；

查询工资等于5000的员工姓名：select ename from emp where sal = 5000;

```
mysql> select ename from emp where sal = 5000;
+-------+
| ename |
+-------+
| KING  |
+-------+
```

查询smith的工资：select sal from emp where ename='smith';

```
mysql> select sal from emp where ename='smith';
+--------+
| sal    |
+--------+
| 800.00 |
+--------+
```

查询工资超过3000的人：

```
select ename,sal from emp where sal >= 1000;
+--------+---------+
| ename  | sal     |
+--------+---------+
| ALLEN  | 1600.00 |
| WARD   | 1250.00 |
| JONES  | 2975.00 |
| MARTIN | 1250.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| SCOTT  | 3000.00 |
| KING   | 5000.00 |
| TURNER | 1500.00 |
| ADAMS  | 1100.00 |
| FORD   | 3000.00 |
| MILLER | 1300.00 |
+--------+---------+
```

找到1100到3000之间的人；

```
mysql> select ename,sal from emp where sal >=1100 and sal <=3000;
+--------+---------+
| ename  | sal     |
+--------+---------+
| ALLEN  | 1600.00 |
| WARD   | 1250.00 |
| JONES  | 2975.00 |
| MARTIN | 1250.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| SCOTT  | 3000.00 |
| TURNER | 1500.00 |
| ADAMS  | 1100.00 |
| FORD   | 3000.00 |
| MILLER | 1300.00 |
+--------+---------+
```

```
mysql> select ename,sal from emp where sal between 1100 and 3000;
+--------+---------+
| ename  | sal     |
+--------+---------+
| ALLEN  | 1600.00 |
| WARD   | 1250.00 |
| JONES  | 2975.00 |
| MARTIN | 1250.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| SCOTT  | 3000.00 |
| TURNER | 1500.00 |
| ADAMS  | 1100.00 |
| FORD   | 3000.00 |
| MILLER | 1300.00 |
+--------+---------+
```

- between ... and ...：用与数字之间是闭区间，用于字符之间是左闭区右开

找出那些人没有津贴？ 在数据库中NULL不是一个值，代表什么也没有，为空
空不是一个，不能用等号衡量
必须使用is null 或者 is not null

```
mysql> select ename,sal,comm from emp where comm is null;
+--------+---------+------+
| ename  | sal     | comm |
+--------+---------+------+
| SMITH  |  800.00 | NULL |
| JONES  | 2975.00 | NULL |
| BLAKE  | 2850.00 | NULL |
| CLARK  | 2450.00 | NULL |
| SCOTT  | 3000.00 | NULL |
| KING   | 5000.00 | NULL |
| ADAMS  | 1100.00 | NULL |
| JAMES  |  950.00 | NULL |
| FORD   | 3000.00 | NULL |
| MILLER | 1300.00 | NULL |
+--------+---------+------+
```

```
mysql> select ename,sal,comm from emp where comm is null or comm = 0;
+--------+---------+------+
| ename  | sal     | comm |
+--------+---------+------+
| SMITH  |  800.00 | NULL |
| JONES  | 2975.00 | NULL |
| BLAKE  | 2850.00 | NULL |
| CLARK  | 2450.00 | NULL |
| SCOTT  | 3000.00 | NULL |
| KING   | 5000.00 | NULL |
| TURNER | 1500.00 | 0.00 |
| ADAMS  | 1100.00 | NULL |
| JAMES  |  950.00 | NULL |
| FORD   | 3000.00 | NULL |
| MILLER | 1300.00 | NULL |
+--------+---------+------+
```

找工资超过1000,部门为20或者30的人

```
mysql> select ename,sal,deptno from emp where  sal >= 1000 and (deptno = 20 or deptno = 30);
+--------+---------+--------+
| ename  | sal     | deptno |
+--------+---------+--------+
| ALLEN  | 1600.00 |     30 |
| WARD   | 1250.00 |     30 |
| JONES  | 2975.00 |     20 |
| MARTIN | 1250.00 |     30 |
| BLAKE  | 2850.00 |     30 |
| SCOTT  | 3000.00 |     20 |
| TURNER | 1500.00 |     30 |
| ADAMS  | 1100.00 |     20 |
| FORD   | 3000.00 |     20 |
+--------+---------+--------+
```

不确定的时候就加()

找到工作岗位为salesman和manager的员工

```
mysql> select ename,job,sal from emp where job = 'salesman' or job = 'manager';
+--------+----------+---------+
| ename  | job      | sal     |
+--------+----------+---------+
| ALLEN  | SALESMAN | 1600.00 |
| WARD   | SALESMAN | 1250.00 |
| JONES  | MANAGER  | 2975.00 |
| MARTIN | SALESMAN | 1250.00 |
| BLAKE  | MANAGER  | 2850.00 |
| CLARK  | MANAGER  | 2450.00 |
| TURNER | SALESMAN | 1500.00 |
+--------+----------+---------+
```

```
mysql> select ename,job,sal from emp where job in ('salesman','manager');
+--------+----------+---------+
| ename  | job      | sal     |
+--------+----------+---------+
| ALLEN  | SALESMAN | 1600.00 |
| WARD   | SALESMAN | 1250.00 |
| JONES  | MANAGER  | 2975.00 |
| MARTIN | SALESMAN | 1250.00 |
| BLAKE  | MANAGER  | 2850.00 |
| CLARK  | MANAGER  | 2450.00 |
| TURNER | SALESMAN | 1500.00 |
+--------+----------+---------+
```

- in 和 or 可以互换， 还有not in，注意括号不是区间啊

- 模糊查询like

在模糊查询必须必须掌握两个特殊的符号，一个是%，一个是_（有点正则的意思）

%--->任意多个字符
_--->任意一个字符

找出名字中带O的？

```
mysql> select * from emp where ename like '%o%';
+-------+-------+---------+------+------------+---------+------+--------+
| EMPNO | ENAME | JOB     | MGR  | HIREDATE   | SAL     | COMM | DEPTNO |
+-------+-------+---------+------+------------+---------+------+--------+
|  7566 | JONES | MANAGER | 7839 | 1981-04-02 | 2975.00 | NULL |     20 |
|  7788 | SCOTT | ANALYST | 7566 | 1987-04-19 | 3000.00 | NULL |     20 |
|  7902 | FORD  | ANALYST | 7566 | 1981-12-03 | 3000.00 | NULL |     20 |
+-------+-------+---------+------+------------+---------+------+--------+
```

找出第一个字母为J的人

```
mysql> select * from emp where ename like 'j%';
+-------+-------+---------+------+------------+---------+------+--------+
| EMPNO | ENAME | JOB     | MGR  | HIREDATE   | SAL     | COMM | DEPTNO |
+-------+-------+---------+------+------------+---------+------+--------+
|  7566 | JONES | MANAGER | 7839 | 1981-04-02 | 2975.00 | NULL |     20 |
|  7900 | JAMES | CLERK   | 7698 | 1981-12-03 |  950.00 | NULL |     30 |
+-------+-------+---------+------+------------+---------+------+--------+
```

找出名字中有下划线的？像正则一样转义

select * from emp where ename like '%\_%';

#### 13. 排序（升序、降序）

按照工资升序，找到员工姓名？

```
mysql> select ename,sal from emp order by sal;
+--------+---------+
| ename  | sal     |
+--------+---------+
| SMITH  |  800.00 |
| JAMES  |  950.00 |
| ADAMS  | 1100.00 |
| WARD   | 1250.00 |
| MARTIN | 1250.00 |
| MILLER | 1300.00 |
| TURNER | 1500.00 |
| ALLEN  | 1600.00 |
| CLARK  | 2450.00 |
| BLAKE  | 2850.00 |
| JONES  | 2975.00 |
| FORD   | 3000.00 |
| SCOTT  | 3000.00 |
| KING   | 5000.00 |
```

注意：order by 默认是升序

1. asc---> 升序
2. desc--->降序

```
mysql> select ename,sal from emp order by sal desc;
+--------+---------+
| ename  | sal     |
+--------+---------+
| KING   | 5000.00 |
| SCOTT  | 3000.00 |
| FORD   | 3000.00 |
| JONES  | 2975.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| ALLEN  | 1600.00 |
| TURNER | 1500.00 |
| MILLER | 1300.00 |
| MARTIN | 1250.00 |
| WARD   | 1250.00 |
| ADAMS  | 1100.00 |
| JAMES  |  950.00 |
| SMITH  |  800.00 |
+--------+---------+
```

按照工资降序排列，工资一样的按照名字的升序排列

```
mysql> select ename,sal from emp order by sal desc,ename;
+--------+---------+
| ename  | sal     |
+--------+---------+
| KING   | 5000.00 |
| FORD   | 3000.00 |
| SCOTT  | 3000.00 |
| JONES  | 2975.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| ALLEN  | 1600.00 |
| TURNER | 1500.00 |
| MILLER | 1300.00 |
| MARTIN | 1250.00 |
| WARD   | 1250.00 |
| ADAMS  | 1100.00 |
| JAMES  |  950.00 |
| SMITH  |  800.00 |
+--------+---------+
```

- 越靠前的字段作用大，后面的可能都用不上，后面的字段只会在前面的字段相等的时候才会用的到

排序可能根据前面的字段的顺序排列

```
mysql> select ename,sal from emp order by 1;
+--------+---------+
| ename  | sal     |
+--------+---------+
| ADAMS  | 1100.00 |
| ALLEN  | 1600.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| FORD   | 3000.00 |
| JAMES  |  950.00 |
| JONES  | 2975.00 |
| KING   | 5000.00 |
| MARTIN | 1250.00 |
| MILLER | 1300.00 |
| SCOTT  | 3000.00 |
| SMITH  |  800.00 |
| TURNER | 1500.00 |
| WARD   | 1250.00 |
+--------+---------+
```

```
mysql> select ename,sal from emp order by 2;
+--------+---------+
| ename  | sal     |
+--------+---------+
| SMITH  |  800.00 |
| JAMES  |  950.00 |
| ADAMS  | 1100.00 |
| WARD   | 1250.00 |
| MARTIN | 1250.00 |
| MILLER | 1300.00 |
| TURNER | 1500.00 |
| ALLEN  | 1600.00 |
| CLARK  | 2450.00 |
| BLAKE  | 2850.00 |
| JONES  | 2975.00 |
| FORD   | 3000.00 |
| SCOTT  | 3000.00 |
| KING   | 5000.00 |
+--------+---------+
```

找出工作岗位是salesman的员工，并且要求工资的降序排列

```
mysql> select ename,sal,job from emp where job in ('salesman') order by sal desc;
+--------+---------+----------+
| ename  | sal     | job      |
+--------+---------+----------+
| ALLEN  | 1600.00 | SALESMAN |
| TURNER | 1500.00 | SALESMAN |
| WARD   | 1250.00 | SALESMAN |
| MARTIN | 1250.00 | SALESMAN |
+--------+---------+----------+
```

```
select
  names     3
from
  tablename 1
where
  condition 2
order by
...         4
```

order by是最后执行的，肯定是把所有的数据查出来之后排序的，这一点还是比较好理解的

#### 14. 分组函数

1. count 计数
2. sum 求和
3. avg 平均值
4. max 最大值
5. min 最小值

找出工资总和？

```
mysql> select sum(sal) from emp;
+----------+
| sum(sal) |
+----------+
| 29025.00 |
```

分组函数一共5个，都是对某一组数据进行操作，分组函数还有另一个名字，多行处理函数
多行处理函数的特点：输入多行，最终输出一行

分组函数自动忽略NULL

找出工资高于平均工资的人？

```
mysql> select ename,sal from emp where sal > avg(sal);
ERROR 1111 (HY000): Invalid use of group function
```

原因：分组函数不可直接出现在where中，为什么呢？
因为group by是在where之后执行的

```
select    5
  ...
from      1
  ...
where     2
  ...
group by  3
  ...
having    4
  ...
order by  6
  ...
```

```
mysql> select ename,sal from emp where sal > (select avg(sal) from emp);
+-------+---------+
| ename | sal     |
+-------+---------+
| JONES | 2975.00 |
| BLAKE | 2850.00 |
| CLARK | 2450.00 |
| SCOTT | 3000.00 |
| KING  | 5000.00 |
| FORD  | 3000.00 |
+-------+---------+
```

两步合成一步

count (*) 和 count（字段）之间的区别？

count(*)：不是统计某个字段中的数据的个数，而是统计总记录的条数（和字段没有关系）
count（字段）：记录某个字段不为NULL的总数量

分组函数也能够组合起来用：

```
mysql> select sum(sal),max(sal),min(sal),avg(sal),count(sal) from emp;
+----------+----------+----------+-------------+------------+
| sum(sal) | max(sal) | min(sal) | avg(sal)    | count(sal) |
+----------+----------+----------+-------------+------------+
| 29025.00 |  5000.00 |   800.00 | 2073.214286 |         14 |
+----------+----------+----------+-------------+------------+
```

#### 15. 补充：什么是单行处理函数？

输入一行，输出一行？

计算每个员工的年薪？：select ename, (sal+comm)*12 yearsal from emp;

在数据库中数学表达式中只要有NULL，最后的结果都是NULL

> 数据库中，只要有NULL参与的运算结果一定是NULL

ifnull() 空处理函数？
if (可能为null的数据,被当作什么来处理)

```
mysql> select ename,(sal+ifnull(comm,0))*12 yearsal from emp;
+--------+----------+
| ename  | yearsal  |
+--------+----------+
| SMITH  |  9600.00 |
| ALLEN  | 22800.00 |
| WARD   | 21000.00 |
| JONES  | 35700.00 |
| MARTIN | 31800.00 |
| BLAKE  | 34200.00 |
| CLARK  | 29400.00 |
| SCOTT  | 36000.00 |
| KING   | 60000.00 |
| TURNER | 18000.00 |
| ADAMS  | 13200.00 |
| JAMES  | 11400.00 |
| FORD   | 36000.00 |
| MILLER | 15600.00 |
+--------+----------+

mysql> select sum(comm) from emp;
+-----------+
| sum(comm) |
+-----------+
|   2200.00 |
+-----------+
```

说明sum是忽略了null在计算的

#### 16. group by 和having

1. group by ：按某个字段或者某些字段进行分组
2. having ：having是对分组之后的数据进行过滤

指出每个工作岗位的最高薪资

注意： 分组函数一般都会和group by 联合使用，这也是为什么它被成为分组函数的原因。
并且任何一个分组函数（count、sum、avg、max、min）都是在group by语句执行结束之后才会执行的
当一条sql语句没有group by的话，整张表的数据会自成一组

```
mysql> select max(sal),job from emp group by job;
+----------+-----------+
| max(sal) | job       |
+----------+-----------+
|  3000.00 | ANALYST   |
|  1300.00 | CLERK     |
|  2975.00 | MANAGER   |
|  5000.00 | PRESIDENT |
|  1600.00 | SALESMAN  |
+----------+-----------+
```

```
mysql> select max(sal),job,ename from emp group by job;
+----------+-----------+-------+
| max(sal) | job       | ename |
+----------+-----------+-------+
|  3000.00 | ANALYST   | SCOTT |
|  1300.00 | CLERK     | SMITH |
|  2975.00 | MANAGER   | JONES |
|  5000.00 | PRESIDENT | KING  |
|  1600.00 | SALESMAN  | ALLEN |
+----------+-----------+-------+
```

第二个查询的数据毫无意义，在Oracle数据库中会报错，因为Oracle的语法规则比MySQL语法规则严谨

记住一个规则：当一条语句中有group by的话，select后面只能跟分组函数和参与分组的字段，就像第一个查询

找出每个部门不同工作岗位的最高薪资

```
mysql> select deptno,job,max(sal) from emp group by deptno,job;
+--------+-----------+----------+
| deptno | job       | max(sal) |
+--------+-----------+----------+
|     10 | CLERK     |  1300.00 |
|     10 | MANAGER   |  2450.00 |
|     10 | PRESIDENT |  5000.00 |
|     20 | ANALYST   |  3000.00 |
|     20 | CLERK     |  1100.00 |
|     20 | MANAGER   |  2975.00 |
|     30 | CLERK     |   950.00 |
|     30 | MANAGER   |  2850.00 |
|     30 | SALESMAN  |  1600.00 |
+--------+-----------+----------+
```

找出每个部门的最高薪资，要求显示薪资大于2900的数据

找出每个部门的最高薪资：

```
mysql> select max(sal),deptno from emp group by deptno;
+----------+--------+
| max(sal) | deptno |
+----------+--------+
|  5000.00 |     10 |
|  3000.00 |     20 |
|  2850.00 |     30 |
+----------+--------+
```

要求显示薪资大于2900的数据：

```
mysql> select max(sal),deptno from emp group by deptno having max(sal) > 2900;
+----------+--------+
| max(sal) | deptno |
+----------+--------+
|  5000.00 |     10 |
|  3000.00 |     20 |
+----------+--------+
```

上面的效率较低，以下的效率较高

```
mysql> select max(sal),deptno from emp where sal > 2900 group by deptno;
+----------+--------+
| max(sal) | deptno |
+----------+--------+
|  5000.00 |     10 |
|  3000.00 |     20 |
+----------+--------+
```

能够使用where就不要使用having，但是有些时候where搞不定的，就要使用having了

#### 17. 总结一个完整的DQL语句怎么写？

```
select    5
  ...
from      1
  ...
where     2
  ...
group by  3
  ...
having    4
  ...
order by  6
  ...
```

### 有哪些数据库管理系统

Oracle做数据库起家的

Oracle 包含 MySQL

DB2、Sybase、"MS SqlServer 支持标准sql的数据库管理系统"

Oracle（安全级别、传统行业）

MySQL（互联网网站使用的多）

### 储存引擎

  完整的建表语句：

```
CREATE TABLE `t_class` (
  `cno` int(11) NOT NULL DEFAULT '0',
  `cname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cno`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1
```

  mysql默认使用的引擎是innoDB，默认字符集是utf8

- 什么是存储引擎呢？

这个名字只会在mysql中出现，（Oracle中有对应的机制，但是不叫存储引擎，就叫表的存储方式）

mysql支持很多存储引擎，每一个存储引擎都对了一种不同的存储方式

每一个存储引擎都有自己的优缺点，需要在核实的时机选择合适的存储引擎

查看当前的mysql支持的存储引擎？

```

show engines \G;

mysql> show engines \G;
*************************** 1. row ***************************
      Engine: FEDERATED
     Support: NO
     Comment: Federated MySQL storage engine
Transactions: NULL
          XA: NULL
  Savepoints: NULL
*************************** 2. row ***************************
      Engine: MRG_MYISAM
     Support: YES
     Comment: Collection of identical MyISAM tables
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 3. row ***************************
      Engine: MyISAM
     Support: YES
     Comment: MyISAM storage engine
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 4. row ***************************
      Engine: BLACKHOLE
     Support: YES
     Comment: /dev/null storage engine (anything you write to it disappears)
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 5. row ***************************
      Engine: CSV
     Support: YES
     Comment: CSV storage engine
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 6. row ***************************
      Engine: MEMORY
     Support: YES
     Comment: Hash based, stored in memory, useful for temporary tables
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 7. row ***************************
      Engine: ARCHIVE
     Support: YES
     Comment: Archive storage engine
Transactions: NO
          XA: NO
  Savepoints: NO
*************************** 8. row ***************************
      Engine: InnoDB
     Support: DEFAULT
     Comment: Supports transactions, row-level locking, and foreign keys
Transactions: YES
          XA: YES
  Savepoints: YES
*************************** 9. row ***************************
      Engine: PERFORMANCE_SCHEMA
     Support: YES
     Comment: Performance Schema
Transactions: NO
          XA: NO
  Savepoints: NO
9 rows in set (0.00 sec)
```

- 常见的存储引擎

```
Engine: MyISAM
      Support: YES
      Comment: MyISAM storage engine
Transactions: NO
          XA: NO
  Savepoints: NO
```

  MyISAM：不支持事务，最常用，但是不是默认的

  优点：可被压缩，节省存储空间，并且可以转换为只读表，提高检索效率

  缺点：不支持事务

------------------------------------------------------------------------------

```
  Engine: InnoDB
     Support: DEFAULT
     Comment: Supports transactions, row-level locking, and foreign keys
Transactions: YES
          XA: YES
  Savepoints: YES
```

  优点：支持事务、行级锁，这种存储引擎最安全

  表结构存储在xxx.frm文件中

  表数据存储在tablespace中

  在mysql数据库崩溃之后提供自动恢复机制

-------------------------------------------------------------------------------

```
  Engine: MEMORY
     Support: YES
     Comment: Hash based, stored in memory, useful for temporary tables
Transactions: NO
          XA: NO
  Savepoints: NO
```

优点：不支持事务。数据容易丢失。因为所有数据和索引都存储在内存当中的。
优点：查询速度最快

### 数据库设计三范式

- 什么是设计范式？
  设计表的依据，按照这个三范式设计的表不会出现数据冗余

- 哪三范式？
第一范式：任何一张表都应该有主键，并且每个字段不可再分
第二范式：建议在第一范式的基础之上，所有非主键字段完全依赖主键，不能产生部份依赖。（多对多？三张表，关系表两个外键）
第三范式：建立在第二方式的基础上，所有非主键字段直接依赖主键，不能产生传递依赖。（一对多？两张表，多的表加外键）

提醒：在实际开发中，以满足客户需求为主，有时候会拿冗余来换执行速度

- 一对一设计？

- 主键共享

- 外键唯一

### 外连接查询

#### 1. 关于查询结果集的去重

```
mysql> select distinct job from emp;
+-----------+
| job       |
+-----------+
| CLERK     |
| SALESMAN  |
| MANAGER   |
| ANALYST   |
| PRESIDENT |
+-----------+
```

```
mysql> select ename,distinct job from emp;
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'distinct job from emp' at line 1
```

distinct 只能出现在所有字段的前方，后面所有的字段联合起来，所有的去重

统计岗位的数量

```
mysql> select count(distinct job) from emp;
+---------------------+
| count(distinct job) |
+---------------------+
|                   5 |
+---------------------+
```

#### 2. 链接查询

- 什么是链接查询

在实际开发中，大部分的情况都不是从单边中查询数据，一般都是多张表联合查询取出最终结果。

在实际开发过程中，一般一个业务都会对应多张表，eg:学生喝班级，起码两张表

学生和编辑信息存储到一张表中，数据会十分的冗余

- 连接查询的分类？

- 根据语法出现的年代划分的话，包括：

1. SQL92(一些老的DBA可能还在使用这种语法，DBA：Database Administrator, 数据库管理员)
2. SQL99(比较新的语法)

- 根据表的连接方式来划分，包括：

1. 内连接：

- 等值连接
- 非等值连接
- 自连接

2. 外连接：

- 左外连接（左连接）
- 右外连接（右连接）

3. 全连接（很少用）

- 在表的连接查询方面有一种现象：笛卡儿积现象（笛卡尔乘积现象）

找出每个员工的部门名称，要求显示员工和部门名

```
mysql> select ename,dname from emp,dept;
+--------+------------+
| ename  | dname      |
+--------+------------+
| SMITH  | ACCOUNTING |
| SMITH  | RESEARCH   |
| SMITH  | SALES      |
| SMITH  | OPERATIONS |
| ALLEN  | ACCOUNTING |
| ALLEN  | RESEARCH   |
| ALLEN  | SALES      |
| ALLEN  | OPERATIONS |
+--------+------------+
56 rows in set (0.00 sec)
```

? 笛卡儿积现象：当两张表进行连接查询的时候，没有任何条件限制，最终的查询结果条数是两张表记录条数的乘积

关于表的别名：

select e.ename,d.dname from emp e,dept d;

别的别名的好处？

1. 第一：可执行效率高
2. 第二：可读性好

- 怎么避免笛卡儿积现象？当然是加条件进行过滤。

思考：避免了笛卡尔积，会减少记录的匹配次数吗？不会的，还是56次查询，只是显示的是有效的记录

```
mysql> select e.ename,d.dname from emp e,dept d where e.deptno = d.deptno;
+--------+------------+
| ename  | dname      |
+--------+------------+
| CLARK  | ACCOUNTING |
| KING   | ACCOUNTING |
| MILLER | ACCOUNTING |
| SMITH  | RESEARCH   |
| JONES  | RESEARCH   |
| SCOTT  | RESEARCH   |
| ADAMS  | RESEARCH   |
| FORD   | RESEARCH   |
| ALLEN  | SALES      |
| WARD   | SALES      |
| MARTIN | SALES      |
| BLAKE  | SALES      |
| TURNER | SALES      |
| JAMES  | SALES      |
+--------+------------+
14 rows in set (0.00 sec)
```

上面这种等号的方法是SQL92的写法，以后不用

- 2.1.1 内连接之等值连接，最大的特点是：条件是等量关系

查询每个员工的部门名称，要求显示员工名和部门名

SQL99语法：

```
mysql> select e.ename,d.dname from emp e join dept d on e.deptno=d.deptno;
+--------+------------+
| ename  | dname      |
+--------+------------+
| CLARK  | ACCOUNTING |
| KING   | ACCOUNTING |
| MILLER | ACCOUNTING |
| SMITH  | RESEARCH   |
| JONES  | RESEARCH   |
| SCOTT  | RESEARCH   |
| ADAMS  | RESEARCH   |
| FORD   | RESEARCH   |
| ALLEN  | SALES      |
| WARD   | SALES      |
| MARTIN | SALES      |
| BLAKE  | SALES      |
| TURNER | SALES      |
| JAMES  | SALES      |
+--------+------------+
14 rows in set (0.00 sec)
```

```
select
  e.ename,d.dname
from
  emp e
inner join
  dept d
on
  e.deptno=d.deptno
;
语法：
...
  A
inner join
  B
on
  连接条件
where
  过滤条件
```

inner：内连接，可省略，带上是可读性好一些

- 2.1.2 内连接的非等值连接：最大的特点是：连接条件中的关系是非等量关系

找出员工的工资等级，要求显示员工名、工资、工资等级

```
mysql> select e.ename,e.sal,s.grade from emp e join salgrade s on e.sal between s.losal and s.hisal;
+--------+---------+-------+
| ename  | sal     | grade |
+--------+---------+-------+
| SMITH  |  800.00 |     1 |
| ALLEN  | 1600.00 |     3 |
| WARD   | 1250.00 |     2 |
| JONES  | 2975.00 |     4 |
| MARTIN | 1250.00 |     2 |
| BLAKE  | 2850.00 |     4 |
| CLARK  | 2450.00 |     4 |
| SCOTT  | 3000.00 |     4 |
| KING   | 5000.00 |     5 |
| TURNER | 1500.00 |     3 |
| ADAMS  | 1100.00 |     1 |
| JAMES  |  950.00 |     1 |
| FORD   | 3000.00 |     4 |
| MILLER | 1300.00 |     2 |
+--------+---------+-------+
14 rows in set (0.00 sec)
```

```
select
  e.ename,e.sal,s.grade
from
  emp e
inner join
  salgrade s
on
  e.sal between s.losal and s.hisal
;
```

- 2.1.3 自连接：最大的特点是：一张表看作两张表

找出每个员工的上级领导，要求显示，员工名和对应的领导名

```
mysql> select e.ename 'empName',ecp.ename 'leaderName' from emp e inner join emp ecp on e.mgr=ecp.empno;
+---------+------------+
| empName | leaderName |
+---------+------------+
| SMITH   | FORD       |
| ALLEN   | BLAKE      |
| WARD    | BLAKE      |
| JONES   | KING       |
| MARTIN  | BLAKE      |
| BLAKE   | KING       |
| CLARK   | KING       |
| SCOTT   | JONES      |
| TURNER  | BLAKE      |
| ADAMS   | SCOTT      |
| JAMES   | BLAKE      |
| FORD    | JONES      |
| MILLER  | CLARK      |
+---------+------------+
13 rows in set (0.00 sec)
```

- 2.2.1 外连接？

- 什么是外连接，和内连接有什么区别？

- 内连接：
  1. 假设A和B表进行连接，使用内连接的话，凡是A表和B表能够匹配上的记录查询出来，这就是内连接
  2. AB两张表没用主副之分，两张表是平等的

- 外连接：
  1. 假设A和B表连接，使用外连接的话，AB两张表中有一张表是主表，一张表是副表，主要查询主表中的数据，捎带查询副表，如果副表中的数据没有与主表中的数据匹配上副表自动模拟出NULL与之匹配

- 外连接的分类？
  1. 左外连接（左连接）：表示左边的这张表是主表
  2. 右外连接（右连接）：表示右边的这张表是主表
  3. 左连接有右连接的写法，右连接也会对应的做链接的写法

```
mysql> select a.ename empname,b.ename leadername from emp a left join emp b on a.mgr=b.empno;
+---------+------------+
| empname | leadername |
+---------+------------+
| SMITH   | FORD       |
| ALLEN   | BLAKE      |
| WARD    | BLAKE      |
| JONES   | KING       |
| MARTIN  | BLAKE      |
| BLAKE   | KING       |
| CLARK   | KING       |
| SCOTT   | JONES      |
| KING    | NULL       |
| TURNER  | BLAKE      |
| ADAMS   | SCOTT      |
| JAMES   | BLAKE      |
| FORD    | JONES      |
| MILLER  | CLARK      |
+---------+------------+
14 rows in set (0.00 sec)
```

外连接（左外连接）：内连接的数据会少，只有13条，数据丢失

```
select
  a.ename empname,b.ename leadername
from
  emp a
left outer join
  emp b
on
  a.mgr=b.empno;
```

右外连接

```
select
  a.ename empname,b.ename leadername
from
  emp b
right outer join
  emp a
on
  a.mgr=b.empno;
```

outer 可以省略，这个只是可读性强

区分内链接和外连接的标志主要是：是否右left、right，有必定是外连接，否必定是内连接，真实的使用场景肯定是外连接

外连接最重要的特点是：主表的数据无条件的全部查询出来

找出哪个部门没有员工？

```
mysql> select d.* from dept d left join emp e on d.deptno = e.deptno where e.deptno is null;
+--------+------------+--------+
| DEPTNO | DNAME      | LOC    |
+--------+------------+--------+
|     40 | OPERATIONS | BOSTON |
+--------+------------+--------+
1 row in set (0.00 sec)
```

- 2.3 三张表怎么连接查询

找出每一个员工的部门名称以及工资等级

注意：解释一下：

```
A 
join
B
on
join
C
on
```

表示A表先和B表连接，连接之后A表和C表连接

```
mysql> select e.ename,d.dname,s.grade from emp e left join dept d on e.deptno=d.deptno left join salgrade s on e.sal between s.losal and s.hisal;
+--------+------------+-------+
| ename  | dname      | grade |
+--------+------------+-------+
| SMITH  | RESEARCH   |     1 |
| ALLEN  | SALES      |     3 |
| WARD   | SALES      |     2 |
| JONES  | RESEARCH   |     4 |
| MARTIN | SALES      |     2 |
| BLAKE  | SALES      |     4 |
| CLARK  | ACCOUNTING |     4 |
| SCOTT  | RESEARCH   |     4 |
| KING   | ACCOUNTING |     5 |
| TURNER | SALES      |     3 |
| ADAMS  | RESEARCH   |     1 |
| JAMES  | SALES      |     1 |
| FORD   | RESEARCH   |     4 |
| MILLER | ACCOUNTING |     2 |
+--------+------------+-------+
14 rows in set (0.00 sec)
```

找出每个一个员工的部门名称、工资等级、以及上级领导

```
mysql> SELECT
    ->   e.ename '员工',d.dname,s.grade,ec.ename '领导'
    -> FROM
    ->   emp e
    -> LEFT JOIN
    ->   dept d
    -> ON
    ->   e.deptno=d.deptno
    -> LEFT JOIN
    ->   salgrade s
    -> ON
    ->   e.sal BETWEEN s.losal AND s.hisal
    -> LEFT JOIN
    ->   emp ec
    -> ON
    ->   e.mgr=ec.empno
    -> ;
+--------+------------+-------+-------+
|        | dname      | grade |       |
+--------+------------+-------+-------+
| SMITH  | RESEARCH   |     1 | FORD  |
| ALLEN  | SALES      |     3 | BLAKE |
| WARD   | SALES      |     2 | BLAKE |
| JONES  | RESEARCH   |     4 | KING  |
| MARTIN | SALES      |     2 | BLAKE |
| BLAKE  | SALES      |     4 | KING  |
| CLARK  | ACCOUNTING |     4 | KING  |
| SCOTT  | RESEARCH   |     4 | JONES |
| KING   | ACCOUNTING |     5 | NULL  |
| TURNER | SALES      |     3 | BLAKE |
| ADAMS  | RESEARCH   |     1 | SCOTT |
| JAMES  | SALES      |     1 | BLAKE |
| FORD   | RESEARCH   |     4 | JONES |
| MILLER | ACCOUNTING |     2 | CLARK |
+--------+------------+-------+-------+
14 rows in set, 2 warnings (0.00 sec)
```

### 增删改

#### 创建表

建表语句的语法格式：

```
create table 表名(
  字段名1，数据类型
  字段名2，数据类型
  字段名3，数据类型
  字段名4，数据类型
  ...
)
```

所有的命名都是一样，最好是见名知义

关于MySQL当中字段的数据类型？常见的数据类型

int     整数型

bigint  长整型

float   浮点型

char    定长字符串

varchar 可变长字符串

date    日期类型

BLOB    二进制大对象（存储图片、视频等流媒体信息）Binary Large Object

CLOB    字符大对象（存储较大文本，比如，存储4G的字符串） Character Large Object

...

char和varchar 怎么选择

char 定长 超出长度报错 效率高 不需要做运算，分配指定多个空间 适合已知定长的类型，不会发生变化的长度eg：性别，生日等

varchar 可变长度 帮助填充长度，超出长度报错，适合数据长度不确定eg：姓名，简介等

BLOB和CLOB类型的使用？

比较小的图片也会BLOB，但是更多的时候还是放在文件服务器上

表名在数据库当中一般建议以：t_或者tbl_开始

```
创建学生表：
  学生信息包括：
    学号、姓名、性别、班级编号、生日；
    学号：bigint
    姓名：varchar
    性别：char
    班级编号：varchar
    生日：char
```
  
```
create table t_mytest(
  no bigint,
  name varchar(255),
  sex char(1),
  classno varchar(255),
  birthday char(10)
);
```

```
mysql> create table t_mytest(
    ->   no bigint,
    ->   name varchar(255),
    ->   sex char(1),
    ->   classno varchar(255),
    ->   birthday char(10)
    -> );
Query OK, 0 rows affected (0.07 sec)

mysql> show tables
    -> ;
+----------------+
| Tables_in_test |
+----------------+
| dept           |
| emp            |
| salgrade       |
| t_class        |
| t_mytest       |
| t_student      |
+----------------+
6 rows in set (0.00 sec)
```

```
mysql> desc t_mytest;
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| no       | bigint(20)   | YES  |     | NULL    |       |
| name     | varchar(255) | YES  |     | NULL    |       |
| sex      | char(1)      | YES  |     | NULL    |       |
| classno  | varchar(255) | YES  |     | NULL    |       |
| birthday | char(10)     | YES  |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+
5 rows in set (0.00 sec)
```

#### 插入数据insert

语法格式：

insert into 表名 (字段名1,字段名2,字段名3...) values (值1,值2,值3...)

insert into t_mytest (no,name,sex,classno,birthday) values (201414790221,'salvatore','1','xinkeyi2ban','1994-03-25');

前面的key的顺序是位置是可以互换的，但values和key的顺序必须要一致

insert into t_mytest (name) values ('laolong');

在这种情况下面其他的字段将会自动填充NULL

drop table if exists t_mytest;

```
create table t_mytest(
  no bigint,
  name varchar(255),
  sex char(1) default '1',
  classno varchar(255),
  birthday char(10)
);
```

default指定默认值；如果没有默认值则默认指定NULL

需要注意的地方，当一条insert语句执行成功之后，表格当中必然会多一条记录。

即使表格的数据为null，也不可使用insert修改，只能使用update

insert into t_mytest values (201414790223,'vera','0','xinkeyi2ban','1996-02-27');

这种可以，但是对数量和顺序都是强要求的；

#### 表的复制

```
mysql> create table emp1 as select * from emp;
Query OK, 14 rows affected (0.07 sec)
Records: 14  Duplicates: 0  Warnings: 0
```

```
mysql> show tables;
+----------------+
| Tables_in_test |
+----------------+
| dept           |
| emp            |
| emp1           |
| salgrade       |
| t_class        |
| t_mytest       |
| t_student      |
+----------------+
7 rows in set (0.00 sec)
```

```
mysql> select * from emp1;
+-------+--------+-----------+------+------------+---------+---------+--------+
| EMPNO | ENAME  | JOB       | MGR  | HIREDATE   | SAL     | COMM    | DEPTNO |
+-------+--------+-----------+------+------------+---------+---------+--------+
|  7369 | SMITH  | CLERK     | 7902 | 1980-12-17 |  800.00 |    NULL |     20 |
|  7499 | ALLEN  | SALESMAN  | 7698 | 1981-02-20 | 1600.00 |  300.00 |     30 |
|  7521 | WARD   | SALESMAN  | 7698 | 1981-02-22 | 1250.00 |  500.00 |     30 |
|  7566 | JONES  | MANAGER   | 7839 | 1981-04-02 | 2975.00 |    NULL |     20 |
|  7654 | MARTIN | SALESMAN  | 7698 | 1981-09-28 | 1250.00 | 1400.00 |     30 |
|  7698 | BLAKE  | MANAGER   | 7839 | 1981-05-01 | 2850.00 |    NULL |     30 |
|  7782 | CLARK  | MANAGER   | 7839 | 1981-06-09 | 2450.00 |    NULL |     10 |
|  7788 | SCOTT  | ANALYST   | 7566 | 1987-04-19 | 3000.00 |    NULL |     20 |
|  7839 | KING   | PRESIDENT | NULL | 1981-11-17 | 5000.00 |    NULL |     10 |
|  7844 | TURNER | SALESMAN  | 7698 | 1981-09-08 | 1500.00 |    0.00 |     30 |
|  7876 | ADAMS  | CLERK     | 7788 | 1987-05-23 | 1100.00 |    NULL |     20 |
|  7900 | JAMES  | CLERK     | 7698 | 1981-12-03 |  950.00 |    NULL |     30 |
|  7902 | FORD   | ANALYST   | 7566 | 1981-12-03 | 3000.00 |    NULL |     20 |
|  7934 | MILLER | CLERK     | 7782 | 1982-01-23 | 1300.00 |    NULL |     10 |
+-------+--------+-----------+------+------------+---------+---------+--------+
14 rows in set (0.00 sec)
```

语法：

  create table 表名 as select语句->将查询出来的结果当作表创建出来

#### 将查询出来的结果插入到一张表中

```
mysql> select * from dept1;
+--------+------------+----------+
| DEPTNO | DNAME      | LOC      |
+--------+------------+----------+
|     10 | ACCOUNTING | NEW YORK |
|     20 | RESEARCH   | DALLAS   |
|     30 | SALES      | CHICAGO  |
|     40 | OPERATIONS | BOSTON   |
+--------+------------+----------+
4 rows in set (0.00 sec)
```

```
mysql> insert into dept1 select * from dept;
Query OK, 4 rows affected (0.04 sec)
Records: 4  Duplicates: 0  Warnings: 0
```

```
mysql> select * from dept1;
+--------+------------+----------+
| DEPTNO | DNAME      | LOC      |
+--------+------------+----------+
|     10 | ACCOUNTING | NEW YORK |
|     20 | RESEARCH   | DALLAS   |
|     30 | SALES      | CHICAGO  |
|     40 | OPERATIONS | BOSTON   |
|     10 | ACCOUNTING | NEW YORK |
|     20 | RESEARCH   | DALLAS   |
|     30 | SALES      | CHICAGO  |
|     40 | OPERATIONS | BOSTON   |
+--------+------------+----------+
8 rows in set (0.00 sec)
```

#### 修改表中的数据update

  语法格式：

  update 表名 set 字段名1=值1，字段名2=值2... where 条件

  注意：没有条件整张表全部更新

```
mysql> update dept1 set dname='SHANGHAI',loc='RENSHIBU' where deptno=10;
Query OK, 2 rows affected (0.04 sec)
Rows matched: 2  Changed: 2  Warnings: 0
```

```
mysql> select * from dept1;
+--------+------------+----------+
| DEPTNO | DNAME      | LOC      |
+--------+------------+----------+
|     10 | SHANGHAI   | RENSHIBU |
|     20 | RESEARCH   | DALLAS   |
|     30 | SALES      | CHICAGO  |
|     40 | OPERATIONS | BOSTON   |
|     10 | SHANGHAI   | RENSHIBU |
|     20 | RESEARCH   | DALLAS   |
|     30 | SALES      | CHICAGO  |
|     40 | OPERATIONS | BOSTON   |
+--------+------------+----------+
8 rows in set (0.00 sec)
```

```
mysql> update dept1 set dname='x', loc='y';
Query OK, 8 rows affected (0.02 sec)
Rows matched: 8  Changed: 8  Warnings: 0
```

```
mysql> select * from dept1;
+--------+-------+------+
| DEPTNO | DNAME | LOC  |
+--------+-------+------+
|     10 | x     | y    |
|     20 | x     | y    |
|     30 | x     | y    |
|     40 | x     | y    |
|     10 | x     | y    |
|     20 | x     | y    |
|     30 | x     | y    |
|     40 | x     | y    |
+--------+-------+------+
8 rows in set (0.00 sec)
```

#### 删除数据？

  语法格式：

  delete from 表名 where

  注意：没有条件全部删除

```
mysql> select * from dept1;
+--------+-------+------+
| DEPTNO | DNAME | LOC  |
+--------+-------+------+
|     20 | x     | y    |
|     30 | x     | y    |
|     40 | x     | y    |
|     20 | x     | y    |
|     30 | x     | y    |
|     40 | x     | y    |
+--------+-------+------+
6 rows in set (0.00 sec)
```

```
mysql> delete from dept1
    -> ;
Query OK, 6 rows affected (0.03 sec)

mysql> select * from dept1;
Empty set (0.00 sec)
```

怎么删除大表中的数据？

delete 的效率是非常慢的，不释放物理存储空间，可回滚

确定不需要的数据？风险大，不能回滚的操作，数据永久丢失

表截断

truncate table emp1;

#### insert delete update select 是需要写在程序里面去的，但是对于表结构的修改和创建等，是可以使用工具的，在实际开发中一旦表设计好之后，对表结构的修改是很少的，修改表结构就是对之前的设计的否定，但是一些修改也是必须的

增删改查：CRUD操作

create（增） retrieve（检索） update delete

### union(可以将查询结果集相加)

找出工作岗位是salesman和manager的员工

```
mysql> select ename,job from emp where job in ('salesman','manager');
+--------+----------+
| ename  | job      |
+--------+----------+
| ALLEN  | SALESMAN |
| WARD   | SALESMAN |
| JONES  | MANAGER  |
| MARTIN | SALESMAN |
| BLAKE  | MANAGER  |
| CLARK  | MANAGER  |
| TURNER | SALESMAN |
+--------+----------+
7 rows in set (0.00 sec)
```

也可以这么写

```
mysql> select ename,job from emp where job='salesman'
    -> union
    -> select ename,job from emp where job='manager';
+--------+----------+
| ename  | job      |
+--------+----------+
| ALLEN  | SALESMAN |
| WARD   | SALESMAN |
| MARTIN | SALESMAN |
| TURNER | SALESMAN |
| JONES  | MANAGER  |
| BLAKE  | MANAGER  |
| CLARK  | MANAGER  |
+--------+----------+
```

```
mysql> select ename,sal from emp
    -> union
    -> select sal from emp;
ERROR 1222 (21000): The used SELECT statements have a different number of columns
```

记住union的列数一定要相同

#### limit（重点中的重点，分页查询全靠这个）

1. limit是mysql特有的，其他数据库中没有，不通用，（Oracle中有一个相同的机制，叫做rownum）
2. limit取结果集中的部分数据，这是它的左右
3. 语法机制：limit startIndex length

startIndex：起始位置，length：取多少个

取出工资的前5名

```
mysql> select ename,sal from emp order by sal desc limit 0, 5;
+-------+---------+
| ename | sal     |
+-------+---------+
| KING  | 5000.00 |
| SCOTT | 3000.00 |
| FORD  | 3000.00 |
| JONES | 2975.00 |
| BLAKE | 2850.00 |
+-------+---------+
5 rows in set (0.00 sec)
```

如果limit后面只写一个数字那么这个数字为length，startIndex为0

limit为sql语句最后执行的一个环节

```
select    5
  ...
from      1
  ...
where     2
  ...
group by  3
  ...
having    4
  ...
order by  6
  ...
limit     7
  ...
```

找出工资排名在第4到第9的员工

```
mysql> select ename,sal from emp order by sal desc limit 3, 6;
+--------+---------+
| ename  | sal     |
+--------+---------+
| JONES  | 2975.00 |
| BLAKE  | 2850.00 |
| CLARK  | 2450.00 |
| ALLEN  | 1600.00 |
| TURNER | 1500.00 |
| MILLER | 1300.00 |
+--------+---------+
6 rows in set (0.00 sec)
```

通用的标准分页sql？

每页显示pageSize条记录

第pageNo页：limit (pageNo - 1)*pageSize,pageSize

### 约束（constraint）

什么是约束，常见的约束有哪些？

唯一性约束、非空性约束--->保证和法性、完整性、有效性等

在创建表的时候，可以给表的字段添加相应的约束，添加约束的目的是为了保证表中的数据的合法性、有效性、完整性等

- 常见的约束有哪些？

1. 非空约束（not null）：字段不能为null
2. 唯一约束（unique）：字段不能重复
3. 主键约束（primary key）：不为null，不能重复（简称：pk）
4. 外键约束（foreign key）：...（简称：fk）
 5.检查约束（check）：注意Oracle数据有有check约束，但是mysql没有，目前MySQL不支持该约束

#### not null

drop table if exists t_myuser;

```
create table t_myuser (
  id int,
  username varchar(255) not null,
  psd varchar(255)
)
```

```
mysql> desc t_myuser;
+----------+--------------+------+-----+---------+-------+
| Field    | Type         | Null | Key | Default | Extra |
+----------+--------------+------+-----+---------+-------+
| id       | int(11)      | YES  |     | NULL    |       |
| username | varchar(255) | NO   |     | NULL    |       |
| psd      | varchar(255) | YES  |     | NULL    |       |
+----------+--------------+------+-----+---------+-------+
3 rows in set (0.01 sec)
```

```
mysql> insert into t_myuser (id,psd) values (1,'lsx');
ERROR 1364 (HY000): Field 'username' doesn't have a default value
```

```
insert into t_myuser (id,username,psd) values (1,'salvatore','lsx');
```

```
mysql> insert into t_myuser (id,username,psd) values (1,'salvatore','lsx');
Query OK, 1 row affected (0.02 sec)

mysql> select * from t_myuser;
+------+-----------+------+
| id   | username  | psd  |
+------+-----------+------+
|    1 | salvatore | lsx  |
+------+-----------+------+
1 row in set (0.00 sec)
```

#### 唯一性约束：unique

  唯一性约束修饰的字段具有唯一性，不能重复，但是可以为null

```
mysql> drop table t_myuser;
Query OK, 0 rows affected (0.03 sec)

mysql> create table t_myuser(
    -> id int,
    -> username varchar(255) unique // 列级约束
    -> );
Query OK, 0 rows affected (0.04 sec)

mysql> insert into t_myuser(id,username) values(1,'salvatore');
Query OK, 1 row affected (0.02 sec)

mysql> select * from t_myuser;
+------+-----------+
| id   | username  |
+------+-----------+
|    1 | salvatore |
+------+-----------+
1 row in set (0.00 sec)
```

```
mysql> insert into t_myuser(id,username) values(2,'salvatore');
ERROR 1062 (23000): Duplicate entry 'salvatore' for key 'username'
```

多个字段联合起来不能重复（表级约束）

```
create table t_myuser(
  id int,
  username varchar(255),
  userrename varchar(255),
  unique(username,userrename) // 表级约束
);
```

所以说：方便统一，最好直接使用表级约束，但是列级也有优势，直观

注意：not null 只有列级约束，没有表级约束

#### 主键约束

- 如何给一张表添加主键约束

```
drop table if exists t_myuser;
create table t_myuser(
  id int primary key,
  username varchar(255),
  email varchar(255)
)
```

```
insert into t_myuser values(1, 'salvatore','11@yun.com');
insert into t_myuser values(2, 'nick','22@yun.com');
insert into t_myuser values(3, 'vera','33@yun.com');
insert into t_myuser values(4, 'long','44@yun.com');
```

```
mysql> select * from t_myuser;
+----+-----------+------------+
| id | username  | email      |
+----+-----------+------------+
|  1 | salvatore | 11@yun.com |
|  2 | nick      | 22@yun.com |
|  3 | vera      | 33@yun.com |
|  4 | long      | 44@yun.com |
+----+-----------+------------+
```

```
mysql> insert into t_myuser values(1, 'rose','44@yun.com');
ERROR 1062 (23000): Duplicate entry '1' for key 'PRIMARY'

mysql> insert into t_myuser(username,email) values ('rose','55@yun.com');
ERROR 1364 (HY000): Field 'id' doesn't have a default value
```

添加组件约束之后，不能重复也不能为空

```
create table t_myuser(
  id int,
  username varchar(255),
  email varchar(255),
  primary key(id) // 表级约束
)
```

- 主键相关的术语：主键约束（primary）、主键字段（id）、主键值（1、2、3、4）

- 主键有什么作用？

  1. 表的设计三范式中有要求，第一范式就要求任何一张表都有主键
  2. 主键的作用：主键值是这行记录在这张表当中的唯一标识。（就像一个人的身份证号一样）

- 主键分类？

  1. 根据主键的字段的字段数量来划分：

    单一主键（推荐使用，常用的）

    复合主键（多个字段联合起来添加一个主键约束）（不建议使用，因为复合主键违背三范式）

  2. 根据主键性质来划分：

    自然主键：主键值最好是一个和业务没什么关系的值（推荐使用）

    业务主键：主键值和系统的业务挂钩，例如：银行卡号、身份证号（不推荐使用，最好不要拿着和业务挂钩的字段作为主键。因为以后的业务一旦发生改变，主键值可能也需要发生改变）

- ****** 一张表的主键约束只能有一个 ******

- mysql提供主键自增（auto_increment）

```
drop table if exists t_myuser;
create table t_myuser(
  id int primary key auto_increment,
  username varchar(255),
  email varchar(255)
)
```

```
insert into t_myuser(username,email) values('salvatore','11@yun.com');
insert into t_myuser(username,email) values('nick','22@yun.com');
insert into t_myuser(username,email) values('vera','33@yun.com');
insert into t_myuser(username,email) values('long','44@yun.com');
```

Oracle也提供了一种自增机制，叫做序列（sequence）对象

#### 外键约束

- 外键约束的相关术语：  

1. 外键约束（foreign key）
2. 外键字段：添加有外键约束的字段
3. 外键值：外间字段对应的每一个值

```
mysql> select * from t_class;
+-----+------------------+
| cno | cname            |
+-----+------------------+
| 101 | xxxxxxxxxxxxxxxx |
| 102 | yyyyyyyyyyyyyyyy |
+-----+------------------+
```

```
mysql> select * from t_student;
+------+-------+---------+
| sno  | sname | classno |
+------+-------+---------+
|    1 | zs1   |     101 |
|    2 | zs2   |     101 |
|    3 | zs3   |     102 |
|    4 | zs4   |     102 |
|    5 | zs5   |     102 |
|    6 | zs6   |     102 |
+------+-------+---------+
6 rows in set (0.00 sec)
```

- 将以上表的建表语句写出来：

t_student中的classno字段引用t_class表中的cno字段，此时t_student表叫做子表。t_class表叫做父表

- 添加数据的时候先添加父表，再添加子表
- 删除数据的时候先删除子表，再删除父表
- 创建表的时候先创建父表，再创建子表
- 删除表的时候先删除子表，再删除父表

```
drop table if exists t_student;

drop table if exists t_class;

create table t_class(
  cno int,
  cname varchar(255),
  primary key(cno)
);

create table t_student(
  sno int,
  sname varchar(255),
  classno int,
  primary key(sno),
  foreign key(classno) references t_class(cno)
);

insert into t_class values (101,'xxxxxxxxxx'),(102,'yyyyyyyyyy');
insert into t_student values 
(1,'salvatore1',101),
(2,'salvatore2',102),
(3,'salvatore3',102),
(4,'salvatore4',101),
(5,'salvatore5',102),
(6,'salvatore6',101);
```

```
mysql> inser into t_student values (1,'liaoxuan',103);
ERROR 1064 (42000): You have an error in your SQL syntax; check the manual that corresponds to your MySQL server version for the right syntax to use near 'inser into t_student values (1,'liaoxuan',103)' at line 1
```

表的外键值只能是所依赖的外键字段所对因的字段的值的集合中的一个

- 外键是是否可以为null？可以为null

- 外键字段引用的字段必须是主键吗？不是，但是引用的字段必须是具有唯一性（unique约束）的

### 子查询

- 1. 什么是子查询？子查询可以出现在哪里？

select语句当中嵌套select语句，被嵌套的select语句是子查询

子查询可以出现在哪里？

```
select
  ...(select).
from
  ...(select).
where
  ...(select).
```

- 1.1 where子句中使用子查询

找出高于平均薪资的员工

```
select * from emp where sal > (selece avg(sal) from emp);
mysql> select * from emp where sal > (select avg(sal) from emp);
+-------+-------+-----------+------+------------+---------+------+--------+
| EMPNO | ENAME | JOB       | MGR  | HIREDATE   | SAL     | COMM | DEPTNO |
+-------+-------+-----------+------+------------+---------+------+--------+
|  7566 | JONES | MANAGER   | 7839 | 1981-04-02 | 2975.00 | NULL |     20 |
|  7698 | BLAKE | MANAGER   | 7839 | 1981-05-01 | 2850.00 | NULL |     30 |
|  7782 | CLARK | MANAGER   | 7839 | 1981-06-09 | 2450.00 | NULL |     10 |
|  7788 | SCOTT | ANALYST   | 7566 | 1987-04-19 | 3000.00 | NULL |     20 |
|  7839 | KING  | PRESIDENT | NULL | 1981-11-17 | 5000.00 | NULL |     10 |
|  7902 | FORD  | ANALYST   | 7566 | 1981-12-03 | 3000.00 | NULL |     20 |
+-------+-------+-----------+------+------------+---------+------+--------+
6 rows in set (0.00 sec)
```

- 1.2在from后面嵌套子查询

找出每个部门平均薪水的薪资等级

```
select
  fl.deptno,d.dname,fl.avgsal,s.grade
from
  (select avg(sal) avgsal,deptno from emp group by deptno) fl
join
  dept d
on
  d.deptno=fl.deptno
join
  salgrade s
on
fl.avgsal between s.losal and s.hisal
order by
  fl.avgsal desc
;
```

```
mysql> select
    ->   fl.deptno,d.dname,fl.avgsal,s.grade
    -> from
    ->   (select avg(sal) avgsal,deptno from emp group by deptno) fl
    -> join
    ->   dept d
    -> on
    ->   d.deptno=fl.deptno
    -> join
    ->   salgrade s
    -> on
    -> fl.avgsal between s.losal and s.hisal;
+--------+------------+-------------+-------+
| deptno | dname      | avgsal      | grade |
+--------+------------+-------------+-------+
|     30 | SALES      | 1566.666667 |     3 |
|     10 | ACCOUNTING | 2916.666667 |     4 |
|     20 | RESEARCH   | 2175.000000 |     4 |
+--------+------------+-------------+-------+
3 rows in set (0.00 sec)
```

- 1.3 在select后面嵌套子查询

找出每个员工所在的部门名称，要救显示员工名和部门名

之前的写法

```
mysql> select e.ename,d.dname from emp e join dept d on e.deptno=d.deptno;
+--------+------------+
| ename  | dname      |
+--------+------------+
| CLARK  | ACCOUNTING |
| KING   | ACCOUNTING |
| MILLER | ACCOUNTING |
| SMITH  | RESEARCH   |
| JONES  | RESEARCH   |
| SCOTT  | RESEARCH   |
| ADAMS  | RESEARCH   |
| FORD   | RESEARCH   |
| ALLEN  | SALES      |
| WARD   | SALES      |
| MARTIN | SALES      |
| BLAKE  | SALES      |
| TURNER | SALES      |
| JAMES  | SALES      |
+--------+------------+
14 rows in set (0.00 sec)
```

可以换一种写法

```
mysql> select e.ename,(select d.dname from dept d where d.deptno=e.deptno) dname from emp e;
+--------+------------+
| ename  | dname      |
+--------+------------+
| SMITH  | RESEARCH   |
| ALLEN  | SALES      |
| WARD   | SALES      |
| JONES  | RESEARCH   |
| MARTIN | SALES      |
| BLAKE  | SALES      |
| CLARK  | ACCOUNTING |
| SCOTT  | RESEARCH   |
| KING   | ACCOUNTING |
| TURNER | SALES      |
| ADAMS  | RESEARCH   |
| JAMES  | SALES      |
| FORD   | RESEARCH   |
| MILLER | ACCOUNTING |
+--------+------------+
14 rows in set (0.00 sec)
```

### 索引

- 什么是索引？有什么用？怎么创建？怎么删除？什么考虑给字段添加索引

1. 索引就相当于一本书的目录，通过目录可以快速找到对应的资源
在数据库方面，查询一张表的时候有两种索引方式：
第一种：全表扫描
第二种：根据索引检索（效率很高）

2. 索引为什么可以提高检索效率，其实就是减小了扫描范围
注意：索引虽然可以提高检索效率，但是不能随意添加索引，因为索引也是数据库当中的对象，也需要数据库不断的维护，是由维护成本的，eg：标中的数据经常被修改这样就不合适添加索引，因为数据一旦修改，索引需要重新排序，进行维护

select ename,sal from where ename='SMISH';

3. 数据量庞大、该字段很少的DML操作、该字段经常出现在where子句中

注意：主键和具有unique约束的字段会自动添加索引---> 根据主键查询会快

```
mysql> explain select ename,sal from emp where sal=5000;
+----+-------------+-------+------+---------------+------+---------+------+------+-------------+
| id | select_type | table | type | possible_keys | key  | key_len | ref  | rows | Extra       |
+----+-------------+-------+------+---------------+------+---------+------+------+-------------+
|  1 | SIMPLE      | emp   | ALL  | NULL          | NULL | NULL    | NULL |   14 | Using where |
+----+-------------+-------+------+---------------+------+---------+------+------+-------------+
1 row in set (0.04 sec)
```

```
create index emp_sal_index on emp(sal);

mysql> create index emp_sal_index on emp(sal);
Query OK, 0 rows affected (0.09 sec)
Records: 0  Duplicates: 0  Warnings: 0

mysql> explain select ename,sal from emp where sal=5000;
+----+-------------+-------+------+---------------+---------------+---------+-------+------+-------------+
| id | select_type | table | type | possible_keys | key           | key_len | ref   | rows | Extra       |
+----+-------------+-------+------+---------------+---------------+---------+-------+------+-------------+
|  1 | SIMPLE      | emp   | ref  | emp_sal_index | emp_sal_index | 9       | const |    1 | Using where |
+----+-------------+-------+------+---------------+---------------+---------+-------+------+-------------+
1 row in set (0.00 sec)
```

4. drop index 索引字段 on 表名；

- 索引底层采用的数据结构的是： B+Tree缩小扫描范围，底层索引进行了排序，分区，索引会携带数据在标中的“物理地址”，最终通过索引检索数据之后，获取到关联的物理地址，通过物理地址定位标中的数据，效率是最高的

select ename from emp where ename='smith';
通过索引转换为：
select ename from emp where 物理地址=0x3;

- 索引的分类？
单一索引：给单个字段添加索引
复合索引：给多个字段联合起来添加1个索引
主键索引：给多个字段联合起来添加1个索引
唯一索引：有unique约束的字段会自动添加索引

- 索引什么时候失效？
select ename from emp where ename like '%A%';

模糊查询的时候，第一个通配符使用的是%，这个时候索引是失效的。

### 事务

1. 什么是事务

一个事务是一个完整的业务逻辑单元，不可再分eg：银行账户转账，从账户A->账户B转账10000.需要执行update语句

update t_act set balance = balance - 10000 where acino='act-001';

update t_act set balance = balance + 10000 where acino='act-002';

这两项操作只能同时成功和同事失败，不允许一条成功一条失败

要保证以上的两天DML语句同事成功或者失败，那么需要使用数据库的“事务机制”

2. 和事务相关的语句只有：DML语句。（insert delete update）

为什么？因为他们这三个语句都是数据库表中的数据相关的

事务的存在是为了保证数据的完整性，安全性

3. 假设所有的业务都能使用1条DML语句搞定，还需要事务机制吗？不需要，但是显然实际情况不是这样的咯，一个事情（业务）肯定是很容易需要多个DML语句完成的

事务：TCL（commit、rollback、savepoint）

4. 事务的特性？ACID

A:原子性：事务是最小的工作单元

C:一致性：事务必须保证多条DML语句同时成功或者同时失败

I:隔离性：事务A与事务B之间具有隔离

D:持久性：最终数据持久化到硬盘文件中，事务才算成功的结束

5. 关于事务之间的隔离性

事务隔离性存在个理级别，理论上隔离级别包括4个：

第一级别：

  读未提交（read uncommitted）：对方事务还没有提交，而我就可以读取到未提交的数据了，这种存在脏读现象，表示读到了脏数据

第二级别：

  读已提交（read committed）：对方提交之后的数据，我方可以读取，

  解决了脏读现象

  存在的问题是：不可重复读

第三级别：

  可重复读（repeatable read）：

  这种级别解决了，不可重复读的问题

  这种隔离级别存在的问题：读取到的数据是幻象

第四级别：

  序列化读/串行化读

  解决了所有问题

  存在的问题：效率低，需要事务排队

Oracle数据库默认级别是：读已提交

MySQL数据库默认级别是：可重复读

6. 演示事务

- mysql事务默认情况下是自动提交。（只要执行任意一条DML语句则提交一次）

怎么关闭呢？start transaction

```
mysql> create table t_user(
    -> id int primary key auto_increment,
    -> username varchar(255)
    -> );
Query OK, 0 rows affected (0.04 sec)

mysql> insert into t_user(username) values('zs');
Query OK, 1 row affected (0.02 sec)

mysql> select * from t_user;
+----+----------+
| id | username |
+----+----------+
|  1 | zs       |
+----+----------+
1 row in set (0.00 sec)

mysql> rollback;
Query OK, 0 rows affected (0.00 sec)

mysql> select * from t_user;
+----+----------+
| id | username |
+----+----------+
|  1 | zs       |
+----+----------+
1 row in set (0.00 sec)
```

证明了自动提交

- 使用start transaction 关闭自动提交，也是再说开始一个事务（之后出现rollback/commit）事务关闭

```
mysql> insert into t_user (username) values('zs1');
Query OK, 1 row affected (0.00 sec)

mysql> select * from t_user;
+----+----------+
| id | username |
+----+----------+
|  1 | zs       |
|  2 | zs1      |
+----+----------+
2 rows in set (0.00 sec)

mysql> insert into t_user (username) values('ls');
Query OK, 1 row affected (0.00 sec)

mysql> select * from t_user;
+----+----------+
| id | username |
+----+----------+
|  1 | zs       |
|  2 | zs1      |
|  3 | ls       |
+----+----------+
3 rows in set (0.00 sec)

mysql> rollback;
Query OK, 0 rows affected (0.02 sec)

mysql> select * from t_user;
+----+----------+
| id | username |
+----+----------+
|  1 | zs       |
+----+----------+
1 row in set (0.00 sec)

mysql> start transaction;
Query OK, 0 rows affected (0.00 sec)

mysql> insert into t_user(username) values('zs');
Query OK, 1 row affected (0.00 sec)

mysql> insert into t_user(username) values('zs1');
Query OK, 1 row affected (0.00 sec)

mysql> insert into t_user(username) values('ls');
Query OK, 1 row affected (0.00 sec)

mysql> select * from t_user;
+----+----------+
| id | username |
+----+----------+
|  1 | zs       |
|  4 | zs       |
|  5 | zs1      |
|  6 | ls       |
+----+----------+
4 rows in set (0.00 sec)

mysql> commit;
Query OK, 0 rows affected (0.02 sec)

mysql> select * from t_user;
+----+----------+
| id | username |
+----+----------+
|  1 | zs       |
|  4 | zs       |
|  5 | zs1      |
|  6 | ls       |
+----+----------+
4 rows in set (0.00 sec)
```

* 设置事务隔离级别： set global transaction isolation level read uncommitted;
- 查看事务全局的隔离级别：select @@global.tx_isolation;

## 网站开发

一直想形成一套自己的开发标准，包括前端开发（vue/react）、服务端开发（nodejs）、运维部署等，这两天有点时间，把整套流程跑了一遍，中间遇到了一些问题作为一个我这么个前端菜鸟来说有点难的点，给记录下来，我以两个例子来记录整个过程

### 准备工作

1. 购买一台服务器，不用太贵太好的，主要是练手，等技术提升起来了或者访问量上去了再去换一个好的服务器，我购买的是腾讯云的服务器

2. 最好购买一个域名，也可以不买，主要是担心 IP 不好记，也别买太贵的，这个更没必要的

3. 下载一个 FileZilla，将本地文件上传到服务器

### 安装

先是一顿安装这个是免不了的，操作按照 linux 的操作习惯，我自己一点 linux 的基础都没有，全是网上查资料的

#### 1. 安装 nodeJS

```shell
## 如果没有src可以先cd /usr/local mkdir src
cd /usr/local/src
## 下载
wget https://nodejs.org/dist/v12.19.0/node-v12.19.0-linux-x64.tar.xz
## 解压
tar zxvf node-v12.19.0-linux-x64.tar.xz
## 重新命名一下
mv node-v12.19.0-linux-x64.tar.xz nodeJS
## 查看是否安装成功并查看版本
cd nodeJS
./bin/node --version
```

如果以上都是可以进行的话说明安装成功了，但是命令还不是属于全局的，设置一下软连接

> 除了系统自带的命令，我们第三方安装的包需要全局都会在/usr/local/bin 下面

```shell
ln -s /usr/local/src/nodeJS/bin/npm /usr/local/bin
ln -s /usr/local/src/nodeJS/bin/node /usr/local/node
ln -s /usr/local/src/nodeJS/bin/npx /usr/local/npx
cd ~
npm --version
```

如果能够查询到版本的话，node 的相关就是安装成功，中间如果遇到其他什么问题留言我们一起交流，虽然我也不是很会

#### 2. 安装 pm2

为什么要使用 [pm2](https://pm2.keymetrics.io/)

我们在本地管理项目的时候一般使用的就是 npm 就够了，但是这样有一点不好就是退出控制台的时候 npm 会挺，npm 也不方便我们查看相关的信息一起日志这样的

```shell
npm i pm2 -g
```

#### 3. 安装 mongodb

```shell
## 下载
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-4.4.1.tgz
## 解压
tar -zxvf mongodb-linux-x86_64-amazon-4.4.1.tgz
## 重命名
mv mongodb-src-r4.4.1  mongodb
## 软连接
ln -s /usr/local/src/mongodb/bin/mongo /usr/local/mongo
ln -s /usr/local/src/mongodb/bin/mongod /usr/local/mongod
ln -s /usr/local/src/mongodb/bin/mongos /usr/local/mongos
## 新建初始化目录
sudo mkdir -p /var/lib/mongo
sudo mkdir -p /var/log/mongodb
sudo chown `whoami` /var/lib/mongo     ## 设置权限
sudo chown `whoami` /var/log/mongodb   ## 设置权限
## 启动mongon
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
## 查看日志
tail -10f /var/log/mongodb/mongod.log
```

#### 4. 安装 Nginx

其实只需要上面的那三点就可以将我们的服务跑起来了，但 Nginx 迟早也是要安装的，就一块安装了吧

```shell
## yum安装，一般买服务器都会自带的yum命令，没有的话可以在网上找一下如何安装yum
yum install nginx
## 备注：也可以源码安装，但是有点繁琐，源码安装肯定是最好的
## 启动nginx
service nginx start
## 其他命令

systemctl enable nginx ## 设置开机启动

service nginx start ## 启动 nginx 服务

service nginx stop ## 停止 nginx 服务

service nginx restart ## 重启 nginx 服务

service nginx reload ## 重新加载配置，一般是在修改过 nginx 配置文件时使用。

## 备注：有一些如果没有权限的话添加sudo
```

### 上传本地文件到远端

0. 现在远端建立我放文件的地方

```shell
cd ~
mkdir run
```

1. 如果是整个项目上传，像 node 这样的直接通过 FillZilla 上传就可以，注意不要上传 node——modules，太大了，我们已经安装了 node，可以直接在服务器上面安装就可以

2. 如果是前端静态文件的话，直接将打包后的文件上传就可

### 启动项目

如果是一个 node 项目的我们用 pm2 启动的话，最好加一个配置(建立一个与 package.json 同级的 config)

```js
module.exports = {
  apps: [
    {
      name: "interface",
      script: "server/app.js",
      env: {
        NODE_ENV: "production",
      },
      instances: 0,
      exec_mode: "cluster",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      max_memory_restart: "1024M",
    },
  ],
};
```

在项目的 package.json 中添加

```json
{
  "...": "...",
  "prd": "pm2 start ./config/ecosystem.config.js",
  "reload": "pm2 reload all",
  "...": "..."
}
```

这样我们的服务就可以跑起来了

### nginx 配置域名

不多说直接上代码吧

```shell
user root;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

## Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    ## Load modular configuration files from the /etc/nginx/conf.d directory.
    ## See http://nginx.org/en/docs/ngx_core_module.html#include
    ## for more information.
    include /etc/nginx/conf.d/*.conf;
    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    ## Load modular configuration files from the /etc/nginx/conf.d directory.
    ## See http://nginx.org/en/docs/ngx_core_module.html#include
    ## for more information.
    include /etc/nginx/conf.d/*.conf;
    ## api文档信息
    server {
        listen       80;
        server_name  api.liaoxuan.run;
        location / {
            proxy_pass http://127.0.0.1:3000/;
            proxy_redirect off;
            proxy_set_header X-Real-IP $remote_addr;
            #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            #以下是一些反向代理的配置，可选。
            proxy_set_header Host $host;
            client_max_body_size 10m; #允许客户端请求的最大单文件字节数
            client_body_buffer_size 128k; #缓冲区代理缓冲用户端请求的最大字节数，
            proxy_connect_timeout 90; #nginx跟后端服务器连接超时时间(代理连接超时)
            proxy_send_timeout 90; #后端服务器数据回传时间(代理发送超时)
            proxy_read_timeout 90; #连接成功后，后端服务器响应时间(代理接收超时)
            proxy_buffer_size 4k; #设置代理服务器（nginx）保存用户头信息的缓冲区大小
            proxy_buffers 4 32k; #proxy_buffers缓冲区，网页平均在32k以下的设置
            proxy_busy_buffers_size 64k; #高负荷下缓冲大小（proxy_buffers*2）
            proxy_temp_file_write_size 64k;
            #设定缓存文件夹大小，大于这个值，将从upstream服务器传
        }
        error_page 404 /404.html;
        location = /404.html {
        }
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
    ## 表单网站信息
    server {
      listen    80;
      server_name  form.liaoxuan.run;
      root      /root/run/form;
      location / {
      }
      error_page 404 /404.html;
        location = /404.html {
      }
      error_page 500 502 503 504 /50x.html;
        location = /50x.html {
      }
    }

    ## 默认的首页，之后会添加相关的信息到首页
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  www.liaoxuan.run;
        root         /root/run;
        ## Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        location / {
        }
    }

    ## Settings for a TLS enabled server.
    server {
        listen       443;
        server_name  _;
        root         /usr/share/nginx/html;
        ## Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        location / {
        }
        error_page 404 /404.html;
        location = /404.html {
        }
        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
   }
}
```

> 1. api.liaoxuan.run 是 api 网站，需要自己启动服务的，需要代理
> 2. form.liaoxuan.run 是静态文件，直接利用 nginx 指定位置就可以，不需要代理

<gitask />
