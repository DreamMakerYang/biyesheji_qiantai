module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: '垃圾分类',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '{{escape description }}' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  plugins: [
    {src: '~plugins/ElementUI',ssr: false,},
    { src: '~plugins/vue-infinite-scroll', ssr: false },
    { src: "~plugins/vue-quill-editor.js", ssr: false },
  ],
  css: [
    'element-ui/lib/theme-chalk/index.css',
    'quill/dist/quill.snow.css',
    'quill/dist/quill.bubble.css',
    'quill/dist/quill.core.css'
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
   //语法检查
    // extend (config, { isDev, isClient }) {
    //   if (isDev && isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
  },

  // modules: [
  //   // 请求代理配置，解决跨域
  //   '@gauseen/nuxt-proxy',
  // ],
  // proxyTable: {
  //   '/api': {
  //     target: 'http://127.0.0.1:8080',
  //     ws: true,
  //     pathRewrite: { '^/api': '/' },
  //   },
  // }

  // modules: [
  //   '@nuxtjs/axios'
  // ],
  // axios: {
  //   proxy: true
  // },
  // proxy: {
  //   '/api': {
  //     target: 'http://127.0.0.1:8080',
  //     pathRewrite: { '^/api': '/' },
  //   },
  // }
}

