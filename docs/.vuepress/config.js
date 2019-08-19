module.exports = {
  // 可以理解为路由的配置文件
  title: "salvatore and vera",
  description: 'Live is what? Get busy living, Or get busy dying',
  themeConfig: {
    lastUpdated: true,
    lastUpdated: '最后更新时间',
    // repo: 'https://github.com/0227vera',
    // repoLabel: 'Github',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about/' },
      { text: 'Posts', items: [
        {text: 'HTML', link:'/HTML/'},
        {text: 'CSS', link:'/CSS/'},
        {text: 'JavaScript', link:'/JavaScript/'},
        {text: 'webpack', link:'/webpack/'},
        {text: 'ES6', link:'/ES6/'},
        {text: 'Lodash', link:'/Lodash/'},
        {text: 'Vue', link:'/Vue/'},
        {text: 'nodeJS', link:'/nodeJS/'},
        {text: 'TypeScript', link:'/TypeScript/'},
        {text: 'react', link:'/react/'},
        {text: '网络', link:'/网络/'},
        {text: 'tool', link:'/tool/'},
        
      ] }
    ],
    sidebarDepth: 0,
    sidebar: [
        {
          title: 'HTML',
          collapsable: true,
          children: [
            '/HTML/',
            '/HTML/常见布局',
            '/HTML/问题',
          ] 
        },
        {
          title: 'CSS',
          collapsable: true,
          children: [
            '/CSS/',
            '/CSS/弹性盒',
            '/CSS/浮动和定位',
            '/CSS/玻璃磨砂效果',
            '/CSS/伪类',
            '/CSS/问题',
          ] 
        },
        {
          title: 'JavaScript',
          collapsable: true,
          children: [
            '/JavaScript/',
            '/JavaScript/变量',
            '/JavaScript/数组',
            '/JavaScript/对象',
            '/JavaScript/面向对象',
            '/JavaScript/正则',
            '/JavaScript/基本算法',
            '/JavaScript/js开发常用的工具函数',
            '/JavaScript/js中一些比较好的问题',
          ]
        },
        {
          title: 'webpack',
          collapsable: true,
          children: [
            '/webpack/',
            '/webpack/loader',
            '/webpack/dev-server',
            '/webpack/eslint',
          ]
        },
        {
          title: 'ES6',
          collapsable: true,
          children: [
            '/ES6/',
            '/ES6/let-const',
            '/ES6/解构',
            '/ES6/箭头函数',
            '/ES6/Set-Map',
            '/ES6/class',
            '/ES6/Promise',
            '/ES6/Module',
          ]
        },
        {
          title: 'Lodash',
          collapsable: true,
          children:[
            '/Lodash/'
          ]
        },
        {
          title: 'Vue',
          collapsable: true,
          children: [
            '/Vue/',
            '/Vue/axios',
            '/Vue/vue-router的两种mode',
            '/Vue/keep-alive',
            '/Vue/mixins',
            '/Vue/自定义指令',
            '/Vue/diff',
            '/Vue/vue中学习的问题'
          ]
        },
        {
          title: 'nodeJS',
          collapsable: true,
          children: [
            '/nodeJS/',
            '/nodeJS/npm'
          ]
        },
        {
          title: 'TypeScript',
          collapsable: true,
          children: [
            '/TypeScript/',
          ]
        },
        {
          title: 'react',
          collapsable: true,
          children: [
            '/react/',
          ]
        },
        {
          title:'网络',
          collapsable:true,
          children:[
            '/网络/',
            '/网络/HTTP',
            '/网络/多个请求如何书写'
          ]
        },
        {
          title:'tool',
          collapsable: true,
          children: [
            '/tool/',
            '/tool/设别设备类型',
            '/tool/ES6封装LS，SS',
            '/tool/method',
            '/tool/vscode',
            '/tool/优秀文章'
          ]
        }
      ]
  },
  markdown: {
    lineNumbers: true // 显示代码块行号
  }
}