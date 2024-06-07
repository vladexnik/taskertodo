import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../components/auth/LogIn.vue'
import SignUp from '../components/auth/SignUp.vue'
import ToDos from '../components/views/ToDos.vue'
import ToDoDetails from '../components/views/ToDoDetails.vue'
import TodoAdd from '../components/views/TodoAdd.vue'

const routes = [
  { path: '/login', name: 'LogIn', component: LogIn },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/', name: 'ToDos', component: ToDos },
  { path: '/todo/:id', name: 'ToDoDetails', component: ToDoDetails },
  { path: '/todo/newtodo', name: 'TodoAdd', component: TodoAdd }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
export default router
