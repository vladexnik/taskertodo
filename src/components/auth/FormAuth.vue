<script setup>
defineProps(['title', 'btn', 'text', 'link', 'action'])
import { ref, computed } from 'vue'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { useRoute } from 'vue-router'

const email = ref('')
const password = ref('')

const SignUp = () => {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      alert(error.message)
    })
}
const Login = () => {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      const user = userCredential.user
      console.log(user)
    })
    .catch((error) => {
      alert(error.message)
    })
}
const route = useRoute()
const currentPath = computed(() => route.path)
console.log(route.path, currentPath)

const formAction = computed(() => (route.path === '/login' ? Login() : SignUp()))
</script>

<template>
  <div class="wrapper">
    <div class="title">{{ title }}</div>
    <form @submit.prevent="formAction">
      <div class="field">
        <input type="text" placeholder="Email Address" v-model="email" required />
        <label></label>
      </div>
      <div class="field">
        <input type="password" placeholder="Password" v-model="password" required />
      </div>
      <div class="field btn">
        <input type="submit" :value="btn" />
      </div>
      <div class="signup-link">
        {{ text }}
        <router-link :to="link">{{ action }} now</router-link>
      </div>
    </form>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Poppins', sans-serif;
}

.wrapper {
  margin: 0 auto;
  margin-top: 100px;
  width: 380px;
  background: #fff;
  border-radius: 15px;
  box-shadow: 0px 15px 20px rgba(0, 0, 0, 0.1);
}
.wrapper .title {
  font-size: 35px;
  font-weight: 600;
  text-align: center;
  line-height: 100px;
  color: #fff;
  user-select: none;
  border-radius: 15px 15px 0 0;
  background: linear-gradient(-105deg, #c850c0, #394fbd);
}
.wrapper form {
  padding: 10px 30px 50px 30px;
}
.wrapper form .field {
  height: 50px;
  width: 100%;
  margin-top: 20px;
  position: relative;
}
.wrapper form .field input {
  height: 100%;
  width: 100%;
  outline: none;
  font-size: 17px;
  padding-left: 20px;
  border: 1px solid lightgrey;
  border-radius: 25px;
  transition: all 0.3s ease;
}
.wrapper form .field input:focus,
form .field input:valid {
  border-color: #4158d0;
}

form .content label {
  color: #262626;
  user-select: none;
  padding-left: 5px;
}

form .field input[type='submit'] {
  color: #fff;
  border: none;
  padding-left: 0;
  margin-top: 10px;
  font-size: 20px;
  font-weight: 500;
  cursor: pointer;
  background: linear-gradient(-105deg, #c850c0, #394fbd);
  transition: all 0.3s ease;
}
form .field input[type='submit']:active {
  transform: scale(0.95);
}
form .signup-link {
  color: #262626;
  margin-top: 20px;
  text-align: center;
}
form .pass-link a,
form .signup-link a {
  color: #4158d0;
  text-decoration: none;
}
form .pass-link a:hover,
form .signup-link a:hover {
  text-decoration: underline;
}
</style>
