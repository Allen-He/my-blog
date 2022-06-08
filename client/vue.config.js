const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const outputDir = path.resolve(__dirname, '../server/public');

module.exports = {
  outputDir, // 将生产环境构建文件的目录改为server下的public目录
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  devServer: {
    proxy: 'http://localhost:999',
  },
  publicPath: '/', // 防止npm run build后出现空白页面
  productionSourceMap: false,
  // configureWebpack: {
  //   plugins: [new BundleAnalyzerPlugin()] //TODO: 需配置为“仅在开发环境下生效”
  // },
};
