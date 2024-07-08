import { defineConfig } from 'dumi';
import { homepage } from './package.json';

export default defineConfig({
  themeConfig: {
    name: 'antd-analysis',
    github: homepage,
  },
  html2sketch: {},
});
