import { createStore } from 'vuex'
import { auth } from '../../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import dayjs from 'dayjs'

const store = createStore({
  state: {
    user: null,
    authIsReady: false,
    activeDay: dayjs().format('YYYY-MM-DD')
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    },
    setActiveDay(state, activeDay) {
      state.activeDay = activeDay
    }
  },

  actions: {
    async signup(context, { email, password }) {
      // async code
      const response = await createUserWithEmailAndPassword(auth, email, password)
      if (response) {
        context.commit('setUser', response.user)
      } else {
        throw new Error('couldnt complete signup')
      }
    },

    async login(context, { email, password }) {
      const response = await signInWithEmailAndPassword(auth, email, password)
      if (response) {
        context.commit('setUser', response.user)
      } else {
        throw new Error('could not complete login')
      }
    },

    async logout(context) {
      await signOut(auth)
      context.commit('setUser', null)
    }
  }
})

// const SignUp = () => {
// const auth = getAuth()
// createUserWithEmailAndPassword(auth, email.value, password.value)
//   .then((userCredential) => {
//     const user = userCredential.user
//     store.dispatch('signup', { email: email.value, password: password.value })
//     console.log(user)
//   })
//   .catch((error) => {
//     showErrorMessageSignIn(error, errMsg)
//   })
// }
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})

export default store
