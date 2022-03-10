const { config } = require("vuepress-theme-hope");

module.exports = config({
  // 可以理解为路由的配置文件
  title: "salvatore's blog",
  description: "Live is what? Get busy living, Or get busy dying",
  themeConfig: {
    lastUpdated: true,
    iconPrefix: 'icon-',
    sidebarDepth: 5,
    nav: [
      { text: "Home", link: "/", icon: 'homefill' },
      { text: "About", link: "/about/", icon: 'wode' },
      {
        text: "Posts",
        link: "/posts/",
        icon: 'zhishidian',
        items: [
          { text: "HTML", link: "/posts/HTML/", icon: 'html5' },
          { text: "CSS", link: "/posts/CSS/", icon: 'css' },
          { text: "JavaScript", link: "/posts/JavaScript/", icon: 'javascript' },
          { text: "Vue", link: "/posts/Vue/", icon: 'vue' },
          { text: "webpack", link: "/posts/webpack/", icon: 'webpack' },
          { text: "MiniProgrem", link: "/posts/MP/", icon: 'xiaochengxu' },
          { text: "nodeJS", link: "/posts/nodeJS/", icon: 'node' },
          { text: "mysql", link: "/posts/MySql/", icon: '16' },
          { text: "TypeScript", link: "/posts/TypeScript/", icon: 'typescript' },
          { text: "react", link: "/posts/react/", icon: 'react' },
          { text: "internet", link: "/posts/internet/", icon: 'wangluo' },
          { text: "MicroFrontends", link: "/posts/MicroFE/", icon: 'wode' },
          { text: "tool", link: "/posts/tool/", icon: 'gongju' },
          { text: "question", link: "/posts/question/", icon: 'changjianwentixiangguanwenti2' },
        ],
      },
      {
        text: "Essay",
        link: "/essay/",
        icon: '16'
      },
    ],
    sidebar: {
      "/essay/": [
        // 需要置顶的内容
        "/essay/",
        "20210122", 
      ].concat([
        // .concat(['---------'])
        "20200925", 
        "20201015", 
        "20201102", 
        "20201125", 
        "20201207", 
        "20201218", 
        "20210220",
        "20210409",
        "20210620",
        "20210829",
      ].reverse()),
      "/posts/": [
        {
          title: "HTML",
          collapsable: true,
          children: [
            "/posts/HTML/",
            "/posts/HTML/常见案例",
            "/posts/HTML/面试题",
          ],
        },
        {
          title: "CSS",
          collapsable: true,
          children: [
            "/posts/CSS/",
            "/posts/CSS/常见案例",
            "/posts/CSS/面试题",
            "/posts/CSS/炫酷效果",
          ],
        },
        {
          title: "JavaScript",
          collapsable: true,
          children: [
            "/posts/JavaScript/",
            "/posts/JavaScript/es6",
            "/posts/JavaScript/基本算法",
            "/posts/JavaScript/polyfill",
            "/posts/JavaScript/工具函数",
            "/posts/JavaScript/面试",
          ],
        },
        {
          title: "Vue",
          collapsable: true,
          children: [
            "/posts/Vue/",
            "/posts/Vue/axios",
            "/posts/Vue/面试",
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
          children: [
            "/posts/TypeScript/",
            "/posts/TypeScript/style",
          ],
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
            "/posts/tool/常见效果",
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
  // markdown: {
  //   lineNumbers: true, // 显示代码块行号
  // }
});
