const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  publicPath: isProd ? '/create/' : '/',
  devServer: {
    host: '127.0.0.1',
    port: 5177
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule.use('vue-svg-loader').loader('vue-svg-loader')
  }
}
