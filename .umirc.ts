import { defineConfig } from "umi";
import routes from "./src/router"
import apiUrl from "./apiUrl";

const path = require('path');
const prodGzipList = ['js', 'css', 'jsx', 'less'];
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const { UMI_ENV = '', LOCATION = "" } = process.env;

function OutputPathName() {
  if (UMI_ENV&&LOCATION) {
    return `${UMI_ENV}-${LOCATION}-dist`
  }
  if (UMI_ENV) {
    return `${UMI_ENV}-dist`
  }
  return 'dist'
}

export default defineConfig({
  routes,
  npmClient: 'pnpm',
  plugins: ['@umijs/plugins/dist/dva', '@umijs/plugins/dist/locale'],
  dva:{},
  locale: {
    default: "en-US"
  },
  outputPath: OutputPathName(),
  define: {
    "process.env.API_URL": apiUrl[`${UMI_ENV}-${LOCATION}`]||apiUrl['test'],
  },
  alias: {
    '@/permissions': path.resolve(__dirname,'src/permissions'),
    '@/hooks': path.resolve(__dirname,'src/hooks'),
    '@/utils': path.resolve(__dirname,'src/utils'),
  },
  chainWebpack: (config) => {
    config
      .plugin('replace')
      .use(require('webpack').ContextReplacementPlugin)
      .tap(() => {
        return [/moment[/\\]locales$/, /zh-cn/];
      });
    config.merge({
      optimization: {
        minimize: true,
        splitChunks: {
          chunks: 'async',
          minSize: 30000,
          minChunks: 2,
          automaticNameDelimiter: '.',
          cacheGroups: {
            react: {
              name: 'react',
              priority: 20,
              test: /[\\/]node_modules[\\/](react|react-dom|react-dom-router)[\\/]/,
            },
            echarts: {
              name: 'echarts',
              chunks: 'async',
              test: /[\\/]node_modules[\\/](echarts|zrender)[\\/]/,
              priority: 10,
              enforce: true,
            },
            antdesigns: {
              name: 'antdesigns',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](antd|@ant-design|antd-mobile)/,
              priority: 10,
              enforce: true,
            },
            ahooks: {
              name: 'ahooks',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](ahooks)/,
              priority: 10,
              enforce: true,
            },
            antv: {
              name: 'antv',
              chunks: 'all',
              test: /[\\/]node_modules[\\/](@antv)[\\/]/,
              priority: 10,
              enforce: true,
            },
            lodash: {
              name: 'lodash',
              test: /[\\/]node_modules[\\/]lodash[\\/]/,
              priority: -2,
              enforce: true,
            },
            vendors: {
              name: 'vendors',
              test({ resource }: any) {
                return /[\\/]node_modules[\\/]/.test(resource)
              },
              priority: -11,
              enforce: true,
            },
          },
        },
      },
    });
    if (process.env.NODE_ENV === 'production') { 
      config.plugin('compression-webpack-plugin').use(
        new CompressionWebpackPlugin({
          algorithm: 'gzip', 
          test: new RegExp('\\.(' + prodGzipList.join('|') + ')$'),
          threshold: 10240, 
          minRatio: 0.6,
          deleteOriginalAssets: false
        })
      );
    }
  }
});