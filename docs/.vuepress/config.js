module.exports = {
  // 可以理解为路由的配置文件
  title: "salvatore and vera",
  description: 'Live is what? Get busy living, Or get busy dying',
  themeConfig: {
    lastUpdated: true,
    lastUpdated: '最后更新时间',
    repo: 'https://github.com/0227vera',
    repoLabel: 'Github',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Posts', items: [
        {text: 'HTML', link:'/HTML/'},
        {text: 'CSS', link:'/CSS/'},
        {text: 'JavaScript', link:'/JavaScript/'},
        {text: 'webpack', link:'/webpack/'},
        {text: 'ES6', link:'/ES6/'},
        {text: 'Vue', link:'/Vue/'},
        {text: 'nodeJS', link:'/nodeJS/'},
        {text: 'tool', link:'/tool/'},
        
      ] }
    ],
    sidebarDepth: 0,
    sidebar: [
        {
          title: 'HTML',
          collapsable: false,
          children: [
            '/HTML/',
            '/HTML/常见布局.md'
          ] 
        },
        {
          title: 'CSS',
          collapsable: false,
          children: [
            '/CSS/',
            '/CSS/弹性盒.md',
            '/CSS/浮动和定位.md',
            '/CSS/玻璃磨砂效果.md'
          ] 
        },
        {
          title: 'JavaScript',
          collapsable: false,
          children: [
            '/JavaScript/',
            '/JavaScript/变量',
            '/JavaScript/数组',
            '/JavaScript/对象',
            '/JavaScript/面向对象',
            '/JavaScript/正则',
          ] 
        },
        {
          title: 'webpack',
          collapsable: false,
          children: [
            '/webpack/',
            '/webpack/loader',
            '/webpack/dev-server',
          ]
        },
        {
          title: 'ES6',
          collapsable: false,
          children: [
            '/ES6/',
            '/ES6/let-const',
            '/ES6/解构',
            '/ES6/箭头函数',
            '/ES6/class',
            '/ES6/Promise',
          ]
        },
        {
          title: 'Vue',
          collapsable: false,
          children: [
            '/Vue/axios.md'
          ]
        },
        {
          title: 'nodeJS',
          collapsable: false,
          children: [
            '/nodeJS/'
          ]
        },
        {
          title:'tool',
          collapsable: false,
          children: [
            '/tool/',
            '/tool/设别设备类型'
          ]
        }
      ]
  },
  markdown: {
    lineNumbers: true // 显示代码块行号
  }
}