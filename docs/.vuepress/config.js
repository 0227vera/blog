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
        {text: 'Vue', link:'/Vue/'},
        {text: 'nodeJS', link:'/nodeJS/'},
        {text: 'TypeScript', link:'/TypeScript/'},
        {text: 'react', link:'/react/'},
        {text: '网络', link:'/网络/'},
        {text: 'tool', link:'/tool/'},
        {text: '工作中遇到的问题', link:'/工作中遇到的问题/'},
        
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
            '/JavaScript/数组',
            '/JavaScript/对象',
            '/JavaScript/面向对象',
            '/JavaScript/正则',
            '/JavaScript/基本算法',
            '/JavaScript/task-jobs',
            '/JavaScript/polyfill',
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
            '/webpack/vue项目webpack升级笔记',
            '/webpack/git提交',
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
            '/ES6/S-W-WeakS-WeakM',
            '/ES6/ES6-interview'
          ]
        },
        {
          title: 'Vue',
          collapsable: true,
          children: [
            '/Vue/',
            '/Vue/vue初始化项目',
            '/Vue/axios',
            '/Vue/vue-router的两种mode',
            '/Vue/keep-alive',
            '/Vue/mixins',
            '/Vue/自定义指令',
            '/Vue/diff',
            '/Vue/nextTick',
            '/Vue/vue中学习的问题',
            '/Vue/vue面试问题'
          ]
        },
        {
          title: 'nodeJS',
          collapsable: true,
          children: [
            '/nodeJS/',
            '/nodeJS/npm',
            '/nodeJS/video'
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
            '/react/reaxt脚手架',
            '/react/eventbus',
            '/react/refs知识点',
            'react/HTML-DOM事件对象',
          ]
        },
        {
          title:'网络',
          collapsable:true,
          children:[
            '/网络/',
            '/网络/HTTP',
            '/网络/JWT',
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
        },
        {
          title:'工作中遇到的问题',
          collapsable: true,
          children: [
            '/工作中遇到的问题/',
            '/工作中遇到的问题/html问题',
            '/工作中遇到的问题/css问题',
            '/工作中遇到的问题/js问题',
            '/工作中遇到的问题/H5中遇到的问题',
          ]
        }
      ]
  },
  markdown: {
    lineNumbers: true // 显示代码块行号
  }
}