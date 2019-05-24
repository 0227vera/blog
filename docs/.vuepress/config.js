module.exports = {
  // 可以理解为路由的配置文件
  title: "salvatore and vera",
  description: 'Live is what? Get busy linving, Or get busy dying',
  themeConfig: {
    lastUpdated: true,
    lastUpdated: '最后更新时间:',
    sidebar: 'auto',
    repo: 'https://github.com/0227vera',
    repoLabel: 'Github',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'About', link: '/about' },
      { text: 'Posts', items: [
        { text: 'HTML', link: '/HTML/' },
        { text: 'CSS', link: '/CSS/' },
        { text: 'JavaScript', link: '/JavaScript/' },
        { text: 'Vue', link: '/Vue/' }
      ]}
    ],
    sidebar: [
      {
        title: 'HTML',
        collapsable: false,
        children: [
          '/HTML/'
        ] 
      },
      {
        title: 'CSS',
        collapsable: false,
        children: [
          '/CSS/盒模型.md'
        ] 
      },
      {
        title: 'JavaScript',
        collapsable: false,
        children: [
          '/JavaScript/'
        ] 
      },
      {
        title: 'Vue',
        collapsable: false,
        children: [
          '/Vue/axios.md'
        ]
      }
    ]
  },
  markdown: {
    lineNumbers: true // 显示代码块行号
  }
}