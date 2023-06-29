import { defineConfig } from 'umi';
import routes from './routes';

export default defineConfig({
  routes: routes,
  title: 'PharmGWAS',
  dva: {
    immer: true,
    hmr: false,
    lazyLoad: true,
    disableModelsReExport: true,
  },
  locale: {
    default: 'en-US',
    antd: false,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  hash: true,
  //由于最终部署在二级域名下，因此需要配置base,outputpath,publicpath
  base: '/pharmgwas',
  outputPath: './dist/pharmgwas',
  publicPath: '/pharmgwas/',
  // //动态加载能减小初次加载时长
  dynamicImport: {
    loading: '@/Loading',
  },
  theme: {
    '@primary-color': '#0c64b6',
  },
  favicon: 'https://ngdc.cncb.ac.cn/pharmgwas/img/favicon.ico',
  headScripts: [
    {
      content: `var _hmt = _hmt || []; (function() {var hm = document.createElement("script");hm.src = "https://hm.baidu.com/hm.js?4d1079128b03d56379e3b9bd954af2cc";var s = document.getElementsByTagName("script")[0]; s.parentNode.insertBefore(hm, s);})();`,
    },
  ],
  metas: [
    {
      name: 'viewport',
      content: 'shrink-to-fit=yes',
    },
  ],
  targets: {
    ie: 11,
  },
});
