import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../components/views/HomePage.vue'
import AboutPage from '../components/views/AboutPage.vue'
import LogIn from '../components/auth/LogIn.vue'
import SignUp from '../components/auth/SignUp.vue'
import ToDos from '../components/views/ToDos.vue'

const routes = [
  { path: '/', name: 'HomePage', component: HomePage },
  { path: '/login', name: 'LogIn', component: LogIn },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/about', name: 'About', component: AboutPage },
  { path: '/todos', name: 'ToDos', component: ToDos }
  // { path: '/', name: 'Home', component: HomePage }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
