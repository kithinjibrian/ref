import colors from 'vuetify/es5/util/colors'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  target:"static",
  head: {
    titleTemplate: '%s | cloud360',
    title: 'Cloud360',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "Everybody is joining Cloud360, don't be left out. Get paid Kshs 200 to watch YouTube videos, kshs 200 answer survey questions, kshs 750 for inviting your friends or win 10x your money by playing magic boxes." },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  loading: {
    color: 'orange',
    height: '1px'
  },
  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
plugins: [{ 
  src: '~/plugins/vplyr', mode: 'client' 
  },{
    src:"~/plugins/gtag" , mode:"client"
  }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    //'@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    "@nuxtjs/auth-next",
    'cookie-universal-nuxt',
    "@nuxtjs/toast",
    "nuxt-facebook-pixel-module"
  ],

  facebook:{
    pixelId:"574448177692240",
    track:"PageView",
    autoPageView:true
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: 'https://cloud360.co.ke',
  },

  auth: {
    strategies: {
      local: {
        scheme:"refresh",
        token: {
          property: "AccessToken",
          type: "Bearer",
          global: true,
          required: true
        },
        refreshToken : {
          property: "RefreshToken",
          data:"RefreshToken"
        },
        user: {
          property: false,
          autofetch: true
        },
        endpoints: {
          logout: false,
          login: {
            url: "/api/users/login",
            method: "post"
          },
          refresh: {
            url: "/api/users/refresh",
            method: "post"
          },
          user: {
            url: "/api/users/self",
            method: "get"
          }
        }
      }
    },
    redirect:{
      home:"/dashboard"
    } 
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
    meta:{
      name:"Cloud360",
      ogTitle:"Cloud360 - Aim for the moon.",
      ogSiteName:"Cloud360",
      ogDescription:"Everybody is joining Cloud360, don't be left out. Get paid Kshs 200 to watch YouTube videos, kshs 200 answer survey questions, kshs 750 for inviting your friends or win 10x your money by playing magic boxes.",
      ogImage:"https://cloud360.co.ke/money.jpg",
      ogUrl:"https://cloud360.co.ke",
      ogHost:"https://cloud360.co.ke"
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake:true,
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
        },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  serverMiddleware : [
    {path:"api",handler:"~/api/app"}
  ]
}
