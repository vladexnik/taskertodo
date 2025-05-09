import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../components/auth/LogIn.vue'
import SignUp from '../components/auth/SignUp.vue'
import ToDos from '../components/views/ToDos.vue'
import ToDoDetails from '../components/views/ToDoDetails.vue'
import TodoAdd from '../components/views/TodoAdd.vue'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import NotFound from '@/components/views/NotFound.vue'

const routes = [
  { path: '/login', name: 'LogIn', component: LogIn },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/', name: 'ToDos', component: ToDos },
  { path: '/todo/:id', name: 'ToDoDetails', component: ToDoDetails },
  { path: '/todo/newtodo', name: 'TodoAdd', component: TodoAdd },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

const auth = getAuth()

router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    if (user && (to.path === '/login' || to.path === '/signup')) {
      next('/')
    } else if (!user && to.path !== '/login' && to.path !== '/signup') {
      next('/login')
    } else {
      next()
    }
  })
})

export default router
