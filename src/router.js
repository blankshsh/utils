const routers = [{
  path: '/',
  redirect: '/fix'
}, {
  path: '/fix',
  name: 'fix',
  component: (resolve) => require(['./components/fix/fix'], resolve),
  children: [{
    path: 'toOrder',
    component: (resolve) => require(['./components/toOrder/toOrder'], resolve)
  }]
}, {
  path: '/user',
  component: (resolve) => require(['components/user/user'], resolve),
  children: [{
    path: 'order',
    component: (resolve) => require(['components/order/order'], resolve)
  }, {
    path: 'coupon',
    component: (resolve) => require(['components/coupon/coupon'], resolve)
  }]
}];
export default routers;