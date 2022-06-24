const path = require('path');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');

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
  configureWebpack: (config) => {
    // 自动分包：抽离darkreader库
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          extraChunk: {
            test: /darkreader/,
            priority: 10,
            minChunks: 1,
            reuseExistingChunk: true,
          },
        },
      },
    };

    // 生产环境下：开启Gzip预压缩
    if (process.env.NODE_ENV === 'production') {
      const gzipExtList = ['html', 'css', 'js']; // 需要Gzip压缩的文件白名单

      config.plugins.push(
        new CompressionPlugin({ // 配置Gzip压缩的插件
          filename: '[path].gz[query]', // 默认
          algorithm: 'gzip', // 默认
          test: new RegExp(`\.(${gzipExtList.join('|')})$`),
          threshold: 10240, // 只有体积大于 10KB 的资源会被处理
          minRatio: 0.8, // 默认，只有压缩率优于 0.8 的资源才会被处理（Compressed Size / Original Size）
          deleteOriginalAssets: false, // 是否删除原文件（默认为false）
        }),
        // new BundleAnalyzerPlugin() // TODO: 需在上线前注释掉
      );
    }
  },
};
