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
      {
        path: '/datasetoverview',
        component: '@/pages/DatasetOverview',
      },
      {
        path: '/cmapoverview',
        component: '@/pages/CMapOverview',
      },
      {
        path: '/geooverview',
        component: '@/pages/GEOOverview',
      },
      {
        path: '/contact',
        component: '@/pages/Contact',
      },
      {
        path: '/download',
        component: '@/pages/Download',
      },
      {
        path: '/test',
        component: '@/pages/Test',
      },
      {
        path: '/documentation',
        component: '@/pages/Documentation',
      },
    ],
  },
];
