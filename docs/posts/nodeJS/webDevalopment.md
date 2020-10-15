# 网站开发

一直想形成一套自己的开发标准，包括前端开发（vue/react）、服务端开发（nodejs）、运维部署等，这两天有点时间，把整套流程跑了一遍，中间遇到了一些问题作为一个我这么个前端菜鸟来说有点难的点，给记录下来，我以两个例子来记录整个过程

## 准备工作

1. 购买一台服务器，不用太贵太好的，主要是练手，等技术提升起来了或者访问量上去了再去换一个好的服务器，我购买的是腾讯云的服务器

2. 最好购买一个域名，也可以不买，主要是担心 IP 不好记，也别买太贵的，这个更没必要的

3. 下载一个 FileZilla，将本地文件上传到服务器

## 安装

先是一顿安装这个是免不了的，操作按照 linux 的操作习惯，我自己一点 linux 的基础都没有，全是网上查资料的

### 1. 安装 nodeJS

```shell
# 如果没有src可以先cd /usr/local mkdir src
cd /usr/local/src
# 下载
wget https://nodejs.org/dist/v12.19.0/node-v12.19.0-linux-x64.tar.xz
# 解压
tar zxvf node-v12.19.0-linux-x64.tar.xz
# 重新命名一下
mv node-v12.19.0-linux-x64.tar.xz nodeJS
# 查看是否安装成功并查看版本
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

### 2. 安装 pm2

为什么要使用 [pm2](https://pm2.keymetrics.io/)

我们在本地管理项目的时候一般使用的就是 npm 就够了，但是这样有一点不好就是退出控制台的时候 npm 会挺，npm 也不方便我们查看相关的信息一起日志这样的

```shell
npm i pm2 -g
```

### 3. 安装 mongodb

```shell
# 下载
wget https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-amazon-4.4.1.tgz
# 解压
tar -zxvf mongodb-linux-x86_64-amazon-4.4.1.tgz
# 重命名
mv mongodb-src-r4.4.1  mongodb
# 软连接
ln -s /usr/local/src/mongodb/bin/mongo /usr/local/mongo
ln -s /usr/local/src/mongodb/bin/mongod /usr/local/mongod
ln -s /usr/local/src/mongodb/bin/mongos /usr/local/mongos
# 新建初始化目录
sudo mkdir -p /var/lib/mongo
sudo mkdir -p /var/log/mongodb
sudo chown `whoami` /var/lib/mongo     # 设置权限
sudo chown `whoami` /var/log/mongodb   # 设置权限
# 启动mongon
mongod --dbpath /var/lib/mongo --logpath /var/log/mongodb/mongod.log --fork
# 查看日志
tail -10f /var/log/mongodb/mongod.log
```

### 4. 安装 Nginx

其实只需要上面的那三点就可以将我们的服务跑起来了，但 Nginx 迟早也是要安装的，就一块安装了吧

```shell
# yum安装，一般买服务器都会自带的yum命令，没有的话可以在网上找一下如何安装yum
yum install nginx
# 备注：也可以源码安装，但是有点繁琐，源码安装肯定是最好的
# 启动nginx
service nginx start
# 其他命令

systemctl enable nginx # 设置开机启动

service nginx start # 启动 nginx 服务

service nginx stop # 停止 nginx 服务

service nginx restart # 重启 nginx 服务

service nginx reload # 重新加载配置，一般是在修改过 nginx 配置文件时使用。

# 备注：有一些如果没有权限的话添加sudo
```

## 上传本地文件到远端

0. 现在远端建立我放文件的地方

```shell
cd ~
mkdir run
```

1. 如果是整个项目上传，像 node 这样的直接通过 FillZilla 上传就可以，注意不要上传 node——modules，太大了，我们已经安装了 node，可以直接在服务器上面安装就可以

2. 如果是前端静态文件的话，直接将打包后的文件上传就可

## 启动项目

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

## nginx 配置域名

不多说直接上代码吧

```shell
user root;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

# Load dynamic modules. See /usr/share/doc/nginx/README.dynamic.
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

    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;
    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    # Load modular configuration files from the /etc/nginx/conf.d directory.
    # See http://nginx.org/en/docs/ngx_core_module.html#include
    # for more information.
    include /etc/nginx/conf.d/*.conf;
    # api文档信息
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
    # 表单网站信息
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

    # 默认的首页，之后会添加相关的信息到首页
    server {
        listen       80 default_server;
        listen       [::]:80 default_server;
        server_name  www.liaoxuan.run;
        root         /root/run;
        # Load configuration files for the default server block.
        include /etc/nginx/default.d/*.conf;
        location / {
        }
    }

    # Settings for a TLS enabled server.
    server {
        listen       443;
        server_name  _;
        root         /usr/share/nginx/html;
        # Load configuration files for the default server block.
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

<back-to-top />

<gitask />
