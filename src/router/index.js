import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    name: 'index',
    path: '/',
    alias: '/index',
    component: () => import('../views/index'),
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: 'home',
        component: () => import('../views/home'),
        meta: {
          title: 'Home Page'
        }
      },
      {
        name: 'reward',
        path: 'reward',
        component: () => import('../views/reward'),
        meta: {
          title: 'Reward Page'
        }
      },
      {
        name: 'order',
        path: 'order',
        component: () => import('../views/order'),
        meta: {
          title: 'Order Page'
        }
      },
      {
        name: 'user',
        path: 'user',
        component: () => import('../views/user'),
        meta: {
          title: 'User Page'
        }
      }
    ]
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('../views/pages/about'),
    meta: {
      title: 'About Us Page'
    }
  },
  {
    name: 'contact',
    path: '/contact',
    component: () => import('../views/pages/contact'),
    meta: {
      title: 'Contact Page'
    }
  },
  {
    name: 'faq',
    path: '/faq',
    component: () => import('../views/pages/faq'),
    meta: {
      title: 'FAQ Page'
    }
  },
  {
    name: 'nutritional',
    path: '/nutritional',
    component: () => import('../views/pages/nutritional'),
    meta: {
      title: 'Nutritional Information Page'
    }
  },
  {
    name: 'page404',
    path: '/page404',
    component: () => import('../views/pages/page404'),
    meta: {
      title: '404 Page'
    }
  },
  {
    name: 'vouchers',
    path: '/vouchers',
    component: () => import('../views/pages/vouchers'),
    meta: {
      title: 'Vouchers Page'
    }
  },
  {
    path: '*',
    redirect: '/page404'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// Dynamic update title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'App Default Title';
  next();
});

export default router;
