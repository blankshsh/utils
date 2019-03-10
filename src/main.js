import Vue from 'vue';
import { LoadingBar } from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import store from './store';
import Util from './libs/util';
import App from './app.vue';
import 'iview/dist/styles/iview.css';

Vue.use(VueRouter);
Vue.use(LoadingBar);

// 路由配置
const RouterConfig = {
  mode: 'history',
  routes: Routers
};
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
  LoadingBar.start();
  if (!to.params.legal && to.name !== 'fix') return router.push({ name: 'fix' })
  Util.title(to.meta.title);
  next();
});

router.afterEach(() => {
  LoadingBar.finish();
  window.scrollTo(0, 0);
});

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});