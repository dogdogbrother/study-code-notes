

module.exports = {
  title: '读书笔记',
  description: '森林看过啥都记录下',
  evergreen: true,
  markdown: {
    lineNumbers: true
  },
  themeConfig: {
    nav: require('./config/nav_config'),
    sidebar: require('./config/sidebar_config')
  }
}