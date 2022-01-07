export default {
  target: 'server', // 'server' or 'static'

  head() {
    const i18nHead = this.$nuxtI18nHead({ addSeoAttributes: true })
    return {
      title: 'Site_name',
      noscript: [{ innerHTML: 'This website requires JavaScript.' }],
      htmlAttrs: {
        ...i18nHead.htmlAttrs,
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        // Display number in hyperlink on mobile to call when you click on it
        { name: 'format-detection', content: 'telephone=no' },
        // SEO
        {
          hid: 'description',
          name: 'description',
          content: 'Site_description',
        },
        { hid: 'og:type', property: 'og:type', content: 'website' },
        { hid: 'robots', property: 'robots', content: 'index, follow' },
        // Windows pin sharing
        {
          hid: 'msapplication-TileColor',
          name: 'msapplication-TileColor',
          content: '#ffffff',
        },
        {
          hid: 'msapplication-TileImage',
          name: 'msapplication-TileImage',
          content: '/favicon.ico',
        },
        { hid: 'theme-color', name: 'theme-color', content: '#ffffff' },
        // How the website display when is sharing on social media
        { hid: 'og:site_name', property: 'og:site_name', content: 'Site_name' },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://f.hellowork.com/blogdumoderateur/2013/09/google-logo.png',
        },
        { hid: 'og:title', property: 'og:title', content: 'Site_title' },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Site_description',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Site_description',
        },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        ...i18nHead.meta,
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'manifest', href: '/site.webmanifest' },
        ...i18nHead.link,
      ],
    }
  },

  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV || 'developpement',
    BASE_URL: process.env.BASE_URL || 'http://localhost:3000/',
  },

  css: ['@/assets/css/reset.css'],

  styleResources: {
    scss: ['./assets/scss/*.scss'],
  },

  components: [{ path: '~/components' }, { path: '~/components/reusable' }],

  buildModules: ['@nuxtjs/eslint-module'],

  modules: [
    '@nuxtjs/axios',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxtjs/i18n',
    '@nuxtjs/style-resources',
    '@nuxtjs/auth',
    '@nuxtjs/proxy',
  ],

  proxy: {
    '/socket.io/': { target: 'http://10.2.161.96:3001/', pathRewrite: { '^/': '' }, changeOrigin: true },
    '/api/': { target: 'http://10.2.161.96:3001/', pathRewrite: { '^/': '' }, changeOrigin: true },
  },

  auth: {
    strategies: {
      local: {
        endpoints: {
          login: {
            url: 'api/auth/login',
            method: 'post',
            propertyName: 'token',
          },
          user: {
            url: 'api/auth/user',
            method: 'get',
            propertyName: 'user',
          },
          logout: true,
        },
        tokenRequired: true,
        tokenType: 'Bearer',
      },
    },
    redirect: {
      login: '/user/login?required', // User will be redirected to this path if login is required
      logout: '/user/login', // User will be redirected to this path if after logout, current route is protected
      home: '/', // User will be redirect to this path after login if accessed login page directly
    },
    rewriteRedirects: true,
  },

  // https://i18n.nuxtjs.org/basic-usage
  i18n: {
    locales: [
      // { code: 'en', iso: 'en-US' },
      { code: 'fr', iso: 'fr-FR' },
    ],
    baseUrl: `https://${process.env.BASE_URL}`,
    defaultLocale: 'fr',
    vueI18n: { fallbackLocale: 'fr' },
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root', // recommended
    },
  },

  sitemap: {
    path: '/sitemap.xml',
    hostname: `https://${process.env.BASE_URL}`,
    cacheTime: 1000 * 60 * 15,
    gzip: true,
    trailingSlash: true,
    exclude: [],
  },

  axios: {},

  // Content module configuration: https://go.nuxtjs.dev/config-content
  content: {},

  build: {},
}
