const fs = require('fs')

module.exports = {
  // 可以理解为路由的配置文件
  title: "salvatore's blog",
  description: "Live is what? Get busy living, Or get busy dying",
  themeConfig: {
    lastUpdated: true,
    lastUpdated: "最后更新时间",
    // repo: 'https://github.com/0227vera',
    // repoLabel: 'Github',
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about/" },
      {
        text: "Posts",
        link: "/posts/",
        items: [
          { text: "HTML", link: "/posts/HTML/" },
          { text: "CSS", link: "/posts/CSS/" },
          { text: "JavaScript", link: "/posts/JavaScript/" },
          { text: "webpack", link: "/posts/webpack/" },
          { text: "ES6", link: "/posts/ES6/" },
          { text: "Vue", link: "/posts/Vue/" },
          { text: "MiniProgrem", link: "/posts/MP/" },
          { text: "nodeJS", link: "/posts/nodeJS/" },
          { text: "mysql", link: "/posts/MySql/" },
          { text: "TypeScript", link: "/posts/TypeScript/" },
          { text: "react", link: "/posts/react/" },
          { text: "internet", link: "/posts/internet/" },
          { text: "MicroFrontends", link: "/posts/MicroFE/"},
          { text: "tool", link: "/posts/tool/" },
          { text: "question", link: "/posts/question/" },
        ],
      },
      {
        text: "Essay",
        link: "/essay/",
      },
    ],
    sidebarDepth: 0,
    sidebar: {
      "/essay/": [
        // 需要置顶的内容
        "/essay/",
        "20210122", 
      ].concat(['---------']).concat([
        "20200925", 
        "20201015", 
        "20201102", 
        "20201125", 
        "20201207", 
        "20201218", 
        "20210220",
        "20210409",
        "20210620",
      ].reverse()),
      "/posts/": [
        {
          title: "HTML",
          collapsable: true,
          children: [
            "/posts/HTML/",
            "/posts/HTML/常见布局",
            "/posts/HTML/问题",
          ],
        },
        {
          title: "CSS",
          collapsable: true,
          children: [
            "/posts/CSS/",
            "/posts/CSS/弹性盒",
            "/posts/CSS/浮动和定位",
            "/posts/CSS/玻璃磨砂效果",
            "/posts/CSS/伪类",
            "/posts/CSS/问题",
          ],
        },
        {
          title: "JavaScript",
          collapsable: true,
          children: [
            "/posts/JavaScript/数组",
            "/posts/JavaScript/",
            "/posts/JavaScript/对象",
            "/posts/JavaScript/面向对象",
            "/posts/JavaScript/正则",
            "/posts/JavaScript/基本算法",
            "/posts/JavaScript/task-jobs",
            "/posts/JavaScript/polyfill",
            "/posts/JavaScript/js开发常用的工具函数",
            "/posts/JavaScript/js中一些比较好的问题",
          ],
        },
        {
          title: "webpack",
          collapsable: true,
          children: [
            "/posts/webpack/",
            "/posts/webpack/loader",
            "/posts/webpack/dev-server",
            "/posts/webpack/eslint",
            "/posts/webpack/vue项目webpack升级笔记",
            "/posts/webpack/git提交",
          ],
        },
        {
          title: "ES6",
          collapsable: true,
          children: [
            "/posts/ES6/",
            "/posts/ES6/let-const",
            "/posts/ES6/解构",
            "/posts/ES6/箭头函数",
            "/posts/ES6/Set-Map",
            "/posts/ES6/class",
            "/posts/ES6/Promise",
            "/posts/ES6/Module",
            "/posts/ES6/S-W-WeakS-WeakM",
            "/posts/ES6/ES6-interview",
          ],
        },
        {
          title: "Vue",
          collapsable: true,
          children: [
            "/posts/Vue/",
            "/posts/Vue/vue初始化项目",
            "/posts/Vue/axios",
            "/posts/Vue/vue-router的两种mode",
            "/posts/Vue/keep-alive",
            "/posts/Vue/mixins",
            "/posts/Vue/自定义指令",
            "/posts/Vue/diff",
            "/posts/Vue/nextTick",
            "/posts/Vue/vue中学习的问题",
            "/posts/Vue/vue面试问题",
          ],
        },
        {
          title: "MiniProgrem",
          collapsable: true,
          children:[
            "/posts/MP/",
          ]
        },
        {
          title: "nodeJS",
          collapsable: true,
          children: [
            "/posts/nodeJS/",
            "/posts/nodeJS/video",
            "/posts/nodeJS/webDevalopment",
          ],
        },
        {
          title: "mysql",
          collapsable: true,
          children: [
            "/posts/MySql/",
            "/posts/MySql/基本数据库知识",
            "/posts/MySql/有哪些数据库管理系统",
            "/posts/MySql/储存引擎",
            "/posts/MySql/三范式",
            "/posts/MySql/外连接查询",
            "/posts/MySql/增删改",
            "/posts/MySql/limit",
            "/posts/MySql/约束",
            "/posts/MySql/子查询",
            "/posts/MySql/索引",
            "/posts/MySql/事务",
          ]
        },
        {
          title: "TypeScript",
          collapsable: true,
          children: ["/posts/TypeScript/"],
        },
        {
          title: "react",
          collapsable: true,
          children: [
            "/posts/react/",
            "/posts/react/reaxt脚手架",
            "/posts/react/eventbus",
            "/posts/react/refs知识点",
            "/posts/react/HTML-DOM事件对象",
            "/posts/react/study",
            "/posts/react/antd",
          ],
        },
        {
          title: "internet",
          collapsable: true,
          children: [
            "/posts/internet/",
            "/posts/internet/JWT",
            "/posts/internet/多个请求如何书写",
            "/posts/internet/TCP的3次握手",
            "/posts/internet/常见的状态码",
          ],
        },
        { 
          title: "MicroFrontends",
          collapsable: true,
          children: [
            "/posts/MicroFE/",
            "/posts/MicroFE/qiankun",
            "/posts/MicroFE/EMP微前端",
          ],
        },
        {
          title: "tool",
          collapsable: true,
          children: [
            "/posts/tool/",
            "/posts/tool/ES6封装LS，SS",
            "/posts/tool/method",
            "/posts/tool/vscode",
            "/posts/tool/优秀文章",
            "/posts/tool/plop",
            "/posts/tool/注释",
          ],
        },
        {
          title: "question",
          collapsable: true,
          children: [
            "/posts/question/",
            "/posts/question/css问题",
            "/posts/question/js问题",
            "/posts/question/H5中遇到的问题",
          ],
        },
      ],
      "/about/": [""],
      "/": [""],
    },
  },
  markdown: {
    lineNumbers: true, // 显示代码块行号
  },
};
