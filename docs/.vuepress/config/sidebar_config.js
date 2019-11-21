let sidebar = {
  // 电子书
  '/book_note/scopeCosuresJS1/': require('./catalog/scopeCosuresJS1'),
  '/book_note/scopeCosuresJS2/': require('./catalog/scopeCosuresJS2'),
  "/book_note/JavaScriptDesignPatterns/": require('./catalog/JavaScriptDesignPatterns'),
  // 后端
  '/buildStation/': require('./catalog/buildStation'),
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
  // 前端
  '/front_note/webpack4/': require('./catalog/webpack4'),
  '/front_note/TypeScript-axios/': require('./catalog/TypeScript-axios'),
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