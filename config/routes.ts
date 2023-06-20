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
        path: '/datasetoverview/:name',
        component: '@/pages/DatasetOverview',
      },
      {
        path: '/datasetresult/:name',
        component: '@/pages/DatasetResult',
      },
      {
        path: '/cmapoverview/:name',
        component: '@/pages/CMapOverview',
      },
      {
        path: '/cmapresult/:name',
        component: '@/pages/CMapResult',
      },
      {
        path: '/explorecmap/:dataset/:tissue/:sig_index',
        component: '@/pages/ExploreCMap',
      },
      {
        path: '/geooverview/:name',
        component: '@/pages/GEOOverview',
      },
      {
        path: '/georesult/:name',
        component: '@/pages/GEOResult',
      },
      {
        path: '/exploregeo/:dataset/:tissue/:accession',
        component: '@/pages/ExploreGEO',
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
        path: '/documentation',
        component: '@/pages/Documentation',
      },
    ],
  },
];
