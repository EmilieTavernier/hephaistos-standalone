import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/login.vue'
import axios from 'axios'

Vue.use(VueRouter)

function createRouter (state) {
  async function beforeEnter (to, from, next) {
    try {
      const { data: user } = await axios.get('http://localhost:3000/api/v1/me')
      state.user = user
      next()
    } catch (err) {
      console.log('err', err)
      next('/login') // redirect to login if user is not authenticated
    }
  }

  const routes = [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter // notice this new property
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]

  return new VueRouter({
    routes
  })
}

export default createRouter
