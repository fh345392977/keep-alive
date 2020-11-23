import { IRoute } from 'umi';

const routes: IRoute[] = [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './User/Login',
      },
    ],
  },
  {
    path: '/welcome',
    name: 'welcome',
    component: './Welcome',
    hideInMenu: true,
  },
  {
    path: '/allocate',
    name: 'allocate',
    icon: 'smile',
    routes: [
      {
        path: '/allocate/:type',
        name: 'allocate-label',
        component: './Allocate/Allocate',
        hideInMenu: true,
      },
      {
        path: '/allocate/label',
        name: 'allocate-label',
        component: './Allocate/Allocate',
      },
      {
        path: '/allocate/review',
        name: 'allocate-review',
        component: './Allocate/Allocate',
      },
      {
        path: '/allocate/refine',
        name: 'allocate-refine',
        component: './Allocate/Allocate',
      },
    ],
  },
  {
    path: '/annonation',
    name: 'annonation',
    icon: 'smile',
    routes: [
      {
        path: '/annonation/label',
        name: 'annonation-label',
        component: './Annonation/Label',
      },
      {
        path: '/annonation/review',
        name: 'annonation-review',
        component: './Annonation/Review',
      },
      {
        path: '/annonation/refine',
        name: 'annonation-refine',
        component: './Annonation/Refine',
      },
    ],
  },
  {
    path: '/model-manage',
    name: 'model-manage',
    icon: 'smile',
    routes: [
      {
        path: '/model/allocate',
        name: 'model-allocate',
        component: './ModelManage/Allocate',
      },
      {
        path: '/model/train',
        name: 'model-train',
        component: './ModelManage/Train',
      },
      {
        path: '/model/test',
        name: 'model-test',
        component: './ModelManage/Test',
      },
    ],
  },
  {
    path: '/statistic',
    name: 'statistic',
    icon: 'smile',
    routes: [
      {
        path: '/statistic/slide',
        name: 'statistic-slide',
        component: './Statistic/Slide',
      },
      {
        path: '/statistic/workload',
        name: 'statistic-workload',
        component: './Statistic/Workload',
      },
    ],
  },
  {
    path: '/classification',
    name: 'classification',
    icon: 'crown',
    access: 'canAdmin',
    component: './Classification',
  },
  {
    path: '/file',
    name: 'file',
    icon: 'crown',
    access: 'canAdmin',
    component: './File',
  },
  {
    path: '/slide',
    name: 'slide',
    icon: 'crown',
    access: 'canAdmin',
    component: './Slide',
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
        component: './System/User',
      },
      {
        path: '/system/slide',
        name: 'system-slide',
        component: './System/Slide',
      },
    ],
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
