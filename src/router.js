const routers = [{
  path: '/',
  name: 'index',
  meta: {
    title: 'index'
  },
  component: (resolve) => require(['./views/index.vue'], resolve)
}, {
  path: '/dfs',
  name: 'dfs',
  meta: {
    title: 'DFS'
  },
  component: (resolve) => require(['./views/dfs.vue'], resolve)
}];
export default routers;