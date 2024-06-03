import * as firebase from 'firebase/app'
import { getAuth } from 'firebase/auth'

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

const auth = getAuth()

export { auth }
