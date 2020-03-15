import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import Modules from '../views/Modules.vue'
import Module from '../views/Module.vue'
import Student from '../views/Student.vue'
import store from '../store/index'

Vue.use(VueRouter)

async function beforeEnter (_to, _from, next) {
  if (!store.getters['user/isAuthenticated']) {
    await store.dispatch('user/fetchUser')
  }
  if (store.getters['user/isAuthenticated']) {
    next()
    return
  }
  next('/login')
}

const routes = [
  /*
  {
    path: '/',
    name: 'home',
    component: Home,
    beforeEnter // notice this new property
  },
  {
    path: '/module',
    name: 'module',
    component: Module,
    beforeEnter // notice this new property
  },
  */
  {
    path: '/',
    name: 'home',
    component: Modules,
    beforeEnter // notice this new property
  },
  {
    path: '/module/:id',
    name: 'module',
    component: Module,
    beforeEnter // notice this new property
  },
  {
    path: '/exercise/:sessionId/:exId',
    name: 'exercise',
    component: Student,
    beforeEnter // notice this new property
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  }
]

export default new VueRouter({
  routes
})
