# loader

接着上一份文件继续写

  ```js
    module.exports = {
      mode : '', // none | development | production
      entry: '', // 单入口---SPA | 多入口---MPA 多入口的话是一个对象
      output: { // 输出 配置必须是一个对象
        path:'', // 文件路径， 推荐使用 path.resolve(__dirname,'')
        filename:'' // 文件名
      },
      module: { // webpack本身只识别js，json等数据结构
        rules: [
          {
          test:/\.css$/i,
          use:[ // use里面的先后顺序是有关系的, 执行顺序从后往前
            'style-loader',
            'css-loader',
            // 'postcss-loader'
            { // 这样写就可以不用postcss.config.js这个文件了
              loader:'postcss-loader',
              options:{
                plugins:[
                  require('autoprefixer')
                ]
              }
            }
            ]
          },
          /* {
            test:/\.(png|jpg|gif)$/i,
            use:[
              {
                loader:'file-loader',
                options: {
                  outputPath:'img/', // 相对路径，相对与output里面的路径
                  publicPath:'dist/img/' // 对外路径
                }
              }
            ]
          },
          */
         {
            test:/\.(png|jpg|gif)$/i,
            use:[
              {
                loader:'url-loader',
                options: {
                  limit: 10*1024,// 减少http请求，提高性能， 利用limit调取file-loader
                  outputPath:'img/', // 相对路径，相对与output里面的路径
                  publicPath:'dist/img/' // 对外路径
                }
              }
            ]
          },
          {
            test:/\.less$/i,
            use:['style-loader','css-loader', 'postcss-loader','less-loader']
          },
          {
            test:/\.(js|jsx)$/i,
            use:[
              {
                loader:'babel-loader',
                options:{
                  presets:['@babel/preset-env'],
                  devtool:'source-map' // 生成.map文件方便调试
                }
              }
            ]
          }
        ]
      },

    }
  ```

  ## loader

作用---帮助解析js以外的文件

* css-loader        读取css,输出成js字符成
* style-loader      输出字符串style标签
* postcss-loader    给浏览器加前缀（需要配置）

postcss.config.js

```js
module.exports = {
  plugins: [
    require('autoprefixer')
  ]
}
```

.browserslistrc 文件 (其中的一种)

``` json
{
  last 5 version
  >1%
}
```

或者在pageage.json里面加一项

```json
"borwserslist" : [
  "last 5 version",
  ">1%"
]
```

* autoprefixer      内置浏览器的表，什么样式应该加前缀什么不该加前缀（5%原则）

* file-loader 和 url-loader 这两哥们是配合使用的，url利用limit调用file

* less-loader (less-loader less)css预编译

* babel-loader      将es6，es7等转es5



<gitask />