let sidebar = {
  '/scopeCosuresJS1/': [
    {
      title: '第1章.作用域是什么'
    },
    {
      title: '第2章.词法作用域'
    },
    {
      title: '第3章.函数作用域和块作用域'
    },
    {
      title: '第4章.提升'
    },
    {
      title: '第5章.作用域是闭包'
    },
    {
      title: '第6章.关于this的2个误解'
    },
    {
      title: '第7章.this全面解析'
    },
    {
      title: '第8章.对象'
    },
    {
      title: '第9章.混合对象"类"'
    },
    {
      title: '第10章.原型'
    },
    {
      title: '第10章.行为委托'
    },
  ],
  '/scopeCosuresJS2/': [
    {
      title: '第1章.类型'
    },
    {
      title: '第2章.值'
    },
    {
      title: '第3章.原生函数'
    },
    {
      title: '第4章.强制类型转换'
    },
    {
      title: '第5章.语法'
    },
    {
      title: '第6章.异步'
    },
  ],
  "/JavaScriptDesignPatterns/": [
    {
      title: '第1章.高级函数'
    },
    {
      title: '第2章.单例模式'
    },
    {
      title: '第3章.策略模式'
    },
    {
      title: '第4章.代理模式'
    },
    {
      title: '第5章.迭代器模式'
    },
    {
      title: '第6章.发布订阅模式'
    },
    {
      title: '第7章.命令模式'
    },
  ],
  '/buildStation/': [
    {
      title: '第1步.准备'
    },
    {
      title: '第2步.武装服务器'
    },
    {
      title: '第3步.运行一个node项目'
    },
    {
      title: '第4步.运行一个静态页面'
    },
    {
      title: '第5步.自动部署项目'
    },
    {
      title: '第6步.MongoDB数据库'
    },
    {
      title: '总结'
    },
  ],
  '/nextjs/': [
    {
      title: '第1章.认识nextjs'
    },
    {
      title: '第2章.认识redis'
    },
    {
      title: '第3章.nextjs集成antd'
    },
    {
      title: '第4章.nextjs中的路由'
    },
    {
      title: '第5章.getInitialProps数据获取'
    },
    {
      title: '第6章.nextjs自定义App'
    },
  ],
  '/cssSecret/': [
    {
      title: '第1章.背景与边框'
    },
    {
      title: '第1章.形状'
    },
  ],


  '/front_note/webpack4/': [
    {
      title: '第1章.webpack',
      children: [
        {
          title: '了解webpack并安装',
        },
        {
          title: 'webpack配置文件',
        },
        {
          title: '浅析webpack打包输出的内容',
        },
      ]
    },
    {
      title: '第2章.loader',
      children: [
        {
          title: 'loader简介',
        },
        {
          title: '使用Loader打包静态资源(图片篇)',
        },
        {
          title: '使用Loader打包静态资源(css篇)',
        },
        {
          title: '使用Loader打包css静态资源(下篇)',
        },
      ]
    },
    {
      title: '第3章.plugin',
      children: [
        {
          title: '使用plugin让打包更便捷',
        },
        {
          title: 'Entry和Output的基础配置',
        },
        {
          title: 'sourceMap的作用和配置',
        }
      ]
    },
    {
      title: '第4章.webpackDevServer相关',
      children: [
        {
          title: '使用webpackDevServer提升开发效率',
        },
        {
          title: 'Hot Module Replacement 热模块更新'
        },
        {
          title: '使用babel处理ES6语法'
        },
      ]
    },
    // {
    //   title: '第14章.Tree Shaking概念'
    // },
    // {
    //   title: '第15章.Develoment和Production模式的区分打包'
    // },
  ]
}

for(let key  in sidebar){
  sidebar[key].forEach((item, index) => {
    index ++
    if (!item.children) {
      item.path = key + index + '/'
    } else {
      item.children.forEach((item2, index2) => {
        index2 ++ 
        item2.path = key + index + '/' + index2 + '/'
        console.log(item2.path);
      })
    }
    
  });
}

module.exports = sidebar