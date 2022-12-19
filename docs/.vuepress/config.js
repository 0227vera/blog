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
          { text: "React", link: "/posts/React/", icon: 'react' },
          { text: "TypeScript", link: "/posts/TypeScript/", icon: 'typescript' },
          { text: "nodeJS", link: "/posts/nodeJS/", icon: 'node' },
          { text: "快应用和微前端", link: "/posts/快应用和微前端/", icon: 'xiaochengxu' },
          { text: "工程化", link: "/posts/工程化/", icon: 'webpack' },
          { text: "前端工具", link: "/posts/tool/", icon: 'gongju' },
          { text: "网络相关", link: "/posts/internet/", icon: 'wangluo' },
          { text: "常见问题", link: "/posts/question/", icon: 'changjianwentixiangguanwenti2' },
          { text: "算法扫盲", link: "/posts/算法扫盲/", icon: 'changjianwentixiangguanwenti2' },
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
        "20220614",
      ].reverse()),
      "/posts/": [
        {
          title: "HTML",
          icon: 'html5',
          children: [
            "/posts/HTML/",
            "/posts/HTML/常见案例",
            "/posts/HTML/面试题",
          ],
        },
        {
          title: "CSS",
          icon: 'css',
          children: [
            "/posts/CSS/",
            "/posts/CSS/常见案例",
            "/posts/CSS/面试题",
          ],
        },
        {
          title: "JavaScript",
          icon: 'javascript',
          children: [
            "/posts/JavaScript/",
            "/posts/JavaScript/js的数据类型及检测",
            "/posts/JavaScript/数组",
            "/posts/JavaScript/对象",
            "/posts/JavaScript/面向对象",
            "/posts/JavaScript/事件循环",
            "/posts/JavaScript/正则",
            "/posts/JavaScript/箭头函数",
            "/posts/JavaScript/尾调用",
            "/posts/JavaScript/class",
            "/posts/JavaScript/module",
            "/posts/JavaScript/Promise",
            "/posts/JavaScript/map-set",
            "/posts/JavaScript/基本算法",
            "/posts/JavaScript/polyfill",
            "/posts/JavaScript/工具函数",
            "/posts/JavaScript/面试",
          ],
        },
        {
          title: "Vue",
          icon: 'vue',
          children: [
            "/posts/Vue/",
            "/posts/Vue/面试",
          ],
        },
        {
          title: "React",
          icon: 'react',
          children: [
            "/posts/React/",
            "/posts/React/面试",
          ],
        },
        {
          title: "TypeScript",
          icon: 'typescript',
          children: [
            "/posts/TypeScript/",
            "/posts/TypeScript/面试",
          ],
        },
        {
          title: "nodeJS",
          icon: 'node',
          children: [
            "/posts/nodeJS/",
            "/posts/nodeJS/cli",
            "/posts/nodeJS/面试",
          ],
        },
        {
          title: '快应用和微前端',
          icon: 'xiaochengxu',
          children: [
            "/posts/快应用和微前端/",
            "/posts/快应用和微前端/mp",
            "/posts/快应用和微前端/electron",
            "/posts/快应用和微前端/RN",
            "/posts/快应用和微前端/微前端",
          ],
        },
        {
          title: '工程化',
          icon: 'webpack',
          children: [
            "/posts/工程化/",
            "/posts/工程化/plop",
            "/posts/工程化/webpack",
            "/posts/工程化/rollup",
            "/posts/工程化/vite",
          ],
        },
        {
          title: "前端工具",
          icon: 'gongju',
          children: [
            "/posts/tool/",
            "/posts/tool/git",
            "/posts/tool/vim",
            "/posts/tool/注释",
            "/posts/tool/vscode",
          ],
        },
        {
          title: "网络相关",
          icon: 'wangluo',
          children: [
            "/posts/internet/",
            "/posts/internet/JWT",
            "/posts/internet/多个请求如何书写",
            "/posts/internet/TCP的3次握手",
            "/posts/internet/常见的状态码",
          ],
        },
        {
          title: "常见问题",
          icon: 'changjianwentixiangguanwenti2',
          children: [
            "/posts/question/",
            "/posts/question/css问题",
            "/posts/question/js问题",
            "/posts/question/H5中遇到的问题",
          ],
        },
        {
          title: "算法扫盲",
          icon: 'changjianwentixiangguanwenti2',
          children: [
            "/posts/算法扫盲/",
            "/posts/算法扫盲/链表",
          ],
        }
      ],
      "/about/": [""],
      "/": [""],
    },
  }
});
