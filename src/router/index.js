import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ProdutoView from '../views/ProdutoView.vue'
import LoginView from '../views/LoginView.vue'
import UserView from '../views/user/UserView.vue'
import UserProducts from '../views/user/UserProducts.vue'
import UserSell from '../views/user/UserSell.vue'
import UserBuy from '../views/user/UserBuy.vue'
import UserEdit from '../views/user/UserEdit.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/produto/:id',
    name: 'product',
    component: ProdutoView,
    props: true
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/user',
    component: UserView,
    children: [
      {
        path: '', // vai ser o mesmo do pai
        name: 'user',
        component: UserProducts
      },
      {
        path: 'buy',
        name: 'buy',
        component: UserBuy
      },
      {
        path: 'sell',
        name: 'sell',
        component: UserSell
      },
      {
        path: 'edit',
        name: 'user-edit',
        component: UserEdit
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
