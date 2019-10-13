module.exports = {
  title: '读书笔记',
  description: '森林看过啥都记录下',
  evergreen: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: [
      {
        text: '《JavaScript设计模式与开发实践》',
        link: '/JavaScriptDesignPatterns/'
      },
      { 
        text: '《你不知道的JS》',
        items: [
          { text: '上册', link: '/scopeCosuresJS1/' },
        ]
      },
      { text: 'github', link: 'https://github.com/dogdogbrother/study-code-notes'},
    ],
    sidebar:{
      '/scopeCosuresJS1/': [
        {
          title: '第一章',
          path: '/scopeCosuresJS1/1/'
        }
      ]
    }
  }
  
}