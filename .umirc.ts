import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  
  fastRefresh: {},

  // 跨域问题
  // proxy: {
  //   '/api': {
  //     'target': 'http://public-api-v1.aspirantzhang.com',
  //     'changeOrigin': true,
  //     'pathRewrite': { '^/api' : '' },
  //   },
  // },
 
});
