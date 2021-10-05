const path = require('path');

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
};
