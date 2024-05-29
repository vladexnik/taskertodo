import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import firebase from 'firebase/compat/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAUhcb7mv3FdTY95dKLpwca_aY71_VK4WM',
  authDomain: 'taskervue.firebaseapp.com',
  projectId: 'taskervue',
  storageBucket: 'taskervue.appspot.com',
  messagingSenderId: '739724837895',
  appId: '1:739724837895:web:ca3bc156690626e68216a2'
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig)
console.log(initializeApp(firebaseConfig))

createApp(App).use(router).mount('#app')
