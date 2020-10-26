import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
    hideInMenu:true,
  },
  {
    path: '/allocate',
    name: 'allocate',
    icon: 'smile',
    routes: [
      {
        path: '/allocate/label',
        name: 'allocate-label',
        component: './allocate/label',
      },
      {
        path: '/allocate/review',
        name: 'allocate-review',
        component: './allocate/review',
      },
      {
        path: '/allocate/refine',
        name: 'allocate-refine',
        component: './allocate/refine',
      },
    ]
  },
  {
    path: '/annonation',
    name: 'annonation',
    icon: 'smile',
    routes: [
      {
        path: '/annonation/label',
        name: 'annonation-label',
        component: './annonation/label',
      },
      {
        path: '/annonation/review',
        name: 'annonation-review',
        component: './annonation/review',
      },
      {
        path: '/annonation/refine',
        name: 'annonation-refine',
        component: './annonation/refine',
      },
    ]
  },
  {
    path: '/model-manage',
    name: 'model-manage',
    icon: 'smile',
    routes: [
      {
        path: '/model/allocate',
        name: 'model-allocate',
        component: './model-manage/allocate',
      },
      {
        path: '/model/train',
        name: 'model-train',
        component: './model-manage/train',
      },
      {
        path: '/model/test',
        name: 'model-test',
        component: './model-manage/test',
      },
    ]
  },
  {
    path: '/statistic',
    name: 'statistic',
    icon: 'smile',
    routes: [
      {
        path: '/statistic/slide',
        name: 'statistic-slide',
        component: './statistic/slide',
      },
      {
        path: '/statistic/workload',
        name: 'statistic-workload',
        component: './statistic/workload',
      },
    ]
  },
  {
    path: '/classification',
    name: 'classification',
    icon: 'crown',
    access: 'canAdmin',
    component: './classification',
  },
  {
    path: '/file',
    name: 'file',
    icon: 'crown',
    access: 'canAdmin',
    component: './file',
  },
  {
    path: '/slide',
    name: 'slide',
    icon: 'crown',
    access: 'canAdmin',
    component: './slide',
  },
  {
    path: '/system',
    name: 'system',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        path: '/system/user',
        name: 'system-user',
        component: './system/user',
      },
      {
        path: '/system/slide',
        name: 'system-slide',
        component: './system/slide',
      },
    ]
  },
  {
    name: 'list.table-list',
    icon: 'table',
    path: '/list',
    component: './ListTableList',
  },
  {
    path: '/',
    redirect: '/welcome',
  },
  {
    component: './404',
  },
];

export default routes;
