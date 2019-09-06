const routers = [{
  path: '/',
  name: 'index',
  meta: {
    title: 'index'
  },
  component: (resolve) => require(['./views/index.vue'], resolve)
}, {
  path: '/pic',
  name: 'pic',
  meta: {
    title: 'pic'
  },
  component: (resolve) => require(['./views/pic.vue'], resolve)
}, {
  path: '/drag',
  name: 'drag',
  meta: {
    title: 'drag'
  },
  component: (resolve) => require(['./views/drag.vue'], resolve)
}];
export default routers;