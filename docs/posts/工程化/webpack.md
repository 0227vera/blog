# webpack

## 编译过程：

### 1. 初始化

将cli参数，配置文件（如：webpack.config.js、webpack.prod.config.js）、默认配置进行融合形成一个对象（了解：这个过程是通过yargs库完成的）

### 2. 编译

#### 2.1 根据入口文件创建chunk，每一个chunk（有两个属性，id和name）

#### 2.2 构建所有的依赖模块

1. 读取模块文件
2. 检查是否已经读取过该模块
3. ast抽象语法树，进行语法分析，生成依赖列表
4. 替换依赖函数，生成转换后的代码；比如之前的require变成_webpack_require(过程并没有修改文件本身)
5. 保存转换后的代码，id：为chunkname，内容为转换后的代码
6. 根据依赖列表循环以上过程，直到文件没有其他新的依赖
7. 生成当前的chunk的id、name、hash

最终形成chunk表格

### 3. 输出

根据刚才的配置生成资源列表，最终和并资源形成一个bundle，并且形成一个hash值到名字中


### loader

### plugin
