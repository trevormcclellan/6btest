module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('eslint');
  },
  pwa: {
    name: 'lab6b'
  },

  transpileDependencies: [
    'vuetify'
  ],

  lintOnSave: false
}
