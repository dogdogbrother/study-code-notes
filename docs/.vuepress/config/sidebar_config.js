let sidebar = {
  // 电子书
  '/book_note/scopeCosuresJS1/': require('./catalog/book_note/scopeCosuresJS1'),
  '/book_note/scopeCosuresJS2/': require('./catalog/book_note/scopeCosuresJS2'),
  "/book_note/JavaScriptDesignPatterns/": require('./catalog/book_note/JavaScriptDesignPatterns'),
  '/book_note/rxjs/': require('./catalog/book_note/rxjs'),
  '/book_note/mysql/': require('./catalog/book_note/mysql'),
  // 后端
  '/buildStation/': require('./catalog/buildStation'),
  '/sever_note/python/': require('./catalog/sever_note/python'),
  '/sever_note/koa2/': require('./catalog/sever_note/koa2'),
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
  '/sever_note/ssr/': require('./catalog/sever_note/ssr'),
  '/sever_note/nginx/': require('./catalog/sever_note/nginx'),
  '/sever_note/java/': require('./catalog/sever_note/java'),

  // 前端
  '/front_note/basics-knowledge/': require('./catalog/front_note/basics-knowledge'),
  '/front_note/webpack4/': require('./catalog/front_note/webpack4'),
  '/front_note/TypeScript-axios/': require('./catalog/front_note/TypeScript-axios'),
  '/front_note/ts-reptile-react/': require('./catalog/front_note/ts-reptile-react'),
  '/front_note/react-native/': require('./catalog/front_note/react-native'),
  '/front_note/react-hooks/': require('./catalog/front_note/react-hooks'),
  '/front_note/vue2/': require('./catalog/front_note/vue2'),
  '/front_note/jest/': require('./catalog/front_note/jest.js'),
  '/front_note/interview/': require('./catalog/front_note/interview.js'),
  '/front_note/write-code/': require('./catalog/front_note/write-code.js'),
  '/front_note/optimization/': require('./catalog/front_note/optimization.js'),
  
  // 跨平台
  '/cross_platform/flutter/': require('./catalog/cross_platform/flutter'),
  '/cross_platform/electron/': require('./catalog/cross_platform/electron'),
  // 计算机基础
  '/computer_basic/markdown/': require('./catalog/computer_basic/markdown'),
  '/computer_basic/recording-leet-code/': require('./catalog/computer_basic/recording-leet-code'),
  '/computer_basic/groceries/': require('./catalog/computer_basic/groceries'),
  '/computer_basic/basic/': require('./catalog/computer_basic/basic'),
  '/computer_basic/linux/': require('./catalog/computer_basic/linux'),
  // 杂项
  '/miscellaneous/': require('./catalog/miscellaneous/miscellaneous'),
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
      })
    }
  });
}

module.exports = sidebar