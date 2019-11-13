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
          { text: '中册', link: '/scopeCosuresJS2/' },
        ]
      },
      {
        text: '建站小攻略',
        link: '/buildStation/'
      },
      {
        text: '服务端渲染nextJS',
        link: '/nextjs/'
      },
      { text: 'github', link: 'https://github.com/dogdogbrother/study-code-notes'},
    ],
    sidebar:{
      '/scopeCosuresJS1/': [
        {
          title: '第1章.作用域是什么',
          path: '/scopeCosuresJS1/1/'
        },
        {
          title: '第2章.词法作用域',
          path: '/scopeCosuresJS1/2/'
        },
        {
          title: '第3章.函数作用域和块作用域',
          path: '/scopeCosuresJS1/3/'
        },
        {
          title: '第4章.提升',
          path: '/scopeCosuresJS1/4/'
        },
        {
          title: '第5章.作用域是闭包',
          path: '/scopeCosuresJS1/5/'
        },
        {
          title: '第6章.关于this的2个误解',
          path: '/scopeCosuresJS1/6/'
        },
        {
          title: '第7章.this全面解析',
          path: '/scopeCosuresJS1/7/'
        },
        {
          title: '第8章.对象',
          path: '/scopeCosuresJS1/8/'
        },
        {
          title: '第9章.混合对象"类"',
          path: '/scopeCosuresJS1/9/'
        },
        {
          title: '第10章.原型',
          path: '/scopeCosuresJS1/10/'
        },
        {
          title: '第10章.行为委托',
          path: '/scopeCosuresJS1/11/'
        },
      ],
      '/scopeCosuresJS2/': [
        {
          title: '第1章.类型',
          path: '/scopeCosuresJS2/1/'
        },
        {
          title: '第2章.值',
          path: '/scopeCosuresJS2/2/'
        },
        {
          title: '第3章.原生函数',
          path: '/scopeCosuresJS2/3/'
        },
        {
          title: '第4章.强制类型转换',
          path: '/scopeCosuresJS2/4/'
        },
        {
          title: '第5章.语法',
          path: '/scopeCosuresJS2/5/'
        },
        {
          title: '第6章.异步',
          path: '/scopeCosuresJS2/6/'
        },
      ],
      "/JavaScriptDesignPatterns/": [
        {
          title: '第1章.高级函数',
          path: '/JavaScriptDesignPatterns/1/'
        },
        {
          title: '第2章.单例模式',
          path: '/JavaScriptDesignPatterns/2/'
        },
        {
          title: '第3章.策略模式',
          path: '/JavaScriptDesignPatterns/3/'
        },
        {
          title: '第4章.代理模式',
          path: '/JavaScriptDesignPatterns/4/'
        },
        {
          title: '第5章.迭代器模式',
          path: '/JavaScriptDesignPatterns/5/'
        },
        {
          title: '第6章.发布订阅模式',
          path: '/JavaScriptDesignPatterns/6/'
        },
        {
          title: '第7章.命令模式',
          path: '/JavaScriptDesignPatterns/7/'
        },
      ],
      '/buildStation/': [
        {
          title: '第1步.准备',
          path: '/buildStation/1/'
        },
        {
          title: '第2步.武装服务器',
          path: '/buildStation/2/'
        },
        {
          title: '第3步.运行一个node项目',
          path: '/buildStation/3/'
        },
        {
          title: '第4步.运行一个静态页面',
          path: '/buildStation/4/'
        },
        {
          title: '第5步.自动部署项目',
          path: '/buildStation/5/'
        },
        {
          title: '第6步.MongoDB数据库',
          path: '/buildStation/6/'
        },
        {
          title: '总结',
          path: '/buildStation/7/'
        },
      ],
      '/nextjs/': [
        {
          title: '第1步.认识nextjs',
          path: '/nextjs/1/'
        },
      ]
    }
  }
  
}