import {defineConfig} from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'in嘉善开放平台',
  description: 'in嘉善开放平台用户使用文档',
  head: [
    ['link', {rel: 'icon', href: '/logo.png'}],
  ],
  lastUpdated: true,
  themeConfig: {
    logo: '/logo.png',
    lastUpdatedText: 'Updated Date',
    nav: [
      {text: '登录', link: "https://open.injs.jsxww.cn/#/login",},
    ],
    footer: {
      message: "Powered by 嘉善力通信息科技股份有限公司",
      copyright: 'Copyright © 2023-present 嘉善传媒中心'
    },
    docFooter: {
      prev: '上一节',
      next: '下一节'
    },
    sidebar: [
      {
        text: '开放平台对接文档',
        items: [
          {text: '对接流程', link: '/flow/index.html'},
          {text: '准备工作', link: '/quick/index.html'},
          {text: 'JSSDK', link: '/jssdk/index.html'},
          {text: '服务端接口', link: '/server-api/index.html'},
          {text: 'Demo代码', link: '/demo/index.html'},
          {text: '农信银行回调接口开发', link: '/rxyh/index.html'},
          {text: '扩展', link: '/ext/index.html'},
        ]
      }
    ],
  },
})
