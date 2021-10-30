const path = require('path');

const outputDir = path.resolve(__dirname, '../server/public');

module.exports = {
  // TODO: ★★★每次向outputDir打包工程时，不能清除public/resource目录
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
};
