import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../components/auth/LogIn.vue'
import SignUp from '../components/auth/SignUp.vue'
import ToDos from '../components/views/ToDos.vue'
import TodoEdit from '../components/views/TodoEdit.vue'

const routes = [
  { path: '/login', name: 'LogIn', component: LogIn },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/', name: 'ToDos', component: ToDos },
  { path: '/todo/:id', name: 'TodoEdit', component: TodoEdit },
  { path: '/todo/newtodo', name: 'TodoNew', component: TodoEdit }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
