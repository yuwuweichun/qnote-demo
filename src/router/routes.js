const routes = [
  // 主布局路由
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') }
    ]
  },

  // 简洁布局路由
  {
    path: '/',
    component: () => import('layouts/SimpleLayout.vue'),
    children: [
      {
        path: 'add',
        component: () => import('pages/AddPage.vue'),
        meta: { title: '添加 (ゝ∀･)' }
      },
      {
        path: 'edit/:id',
        component: () => import('pages/EditPage.vue'),
        meta: { title: '编辑 •_ゝ•' }
      }
    ]
  },
  // 404页面
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
