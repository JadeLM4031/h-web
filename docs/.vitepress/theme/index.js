import DefaultTheme from "vitepress/theme";
import "./style/vitepress.less";
import "./style/themes.less";

import { watch, nextTick } from "vue";

import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({ showSpinner: true });

import { useRouter, useData, useRoute, inBrowser } from "vitepress";

export default {
  ...DefaultTheme,

  NotFound: () => "custom 404",

  enhanceApp({ app, router, siteData }) {
    // app is the Vue 3 app instance from `createApp()`.
    // router is VitePress' custom router. `siteData` is
    // a `ref` of current site-level metadata.
  },

  setup() {
    const router = useRouter();
    // refer: https://github.com/vuejs/vitepress/issues/318
    watch(router.route, (newVal, oldVal) => {
      NProgress.start();
      nextTick(() => {
        NProgress.done();
      });
    });
  },
};
