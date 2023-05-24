export default [
  {
    path: '/',
    component: '@/layouts/LayoutFixed',
    routes: [
      {
        path: '/',
        component: '@/pages/index',
      },
      {
        path: '/home',
        component: '@/pages/index',
      },
      // {
      //   path: '/browse/',
      //   component: '@/pages/Browse',
      // },
      // {
      //   path: '/contact',
      //   component: '@/pages/Contact',
      // },
      // {
      //   path: '/download',
      //   component: '@/pages/Download',
      // },
      {
        path: '/test',
        component: '@/pages/Test',
      },
      // {
      //   path: '/twas/:name',
      //   component: '@/pages/TWAS',
      // },
      // {
      //   path: '/documentation',
      //   component: '@/pages/Documentation',
      // },
    ],
  },
];
