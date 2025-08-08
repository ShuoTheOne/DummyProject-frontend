<script setup>
import { ref } from 'vue'
import LoginUser from './pages/LoginUser.vue'
import RegisterUser from './pages/RegisterUser.vue'

const showLogin = ref(false)
const showRegister = ref(false)
const loggedIn = ref(!!localStorage.getItem('token'))

function openLogin() {
  showLogin.value = true
  showRegister.value = false
}

function openRegister() {
  showRegister.value = true
  showLogin.value = false
}

function closeForms() {
  showLogin.value = false
  showRegister.value = false
}

function handleLoginSuccess() {
  loggedIn.value = true
  closeForms()
}

function logout() {
  localStorage.removeItem('token')
  loggedIn.value = false
}
</script>

<template>
  <h1>zugzug</h1>

  <div v-if="!loggedIn">
    <button @click="openLogin">Login</button>
    <button @click="openRegister">Register</button>
    <LoginUser v-if="showLogin" @login-success="handleLoginSuccess" />
    <RegisterUser v-if="showRegister" @login-success="handleLoginSuccess" />
    <button v-if="showLogin || showRegister" @click="closeForms">Close</button>
  </div>
  <div v-else>
    <p>You are logged in!</p>
    <button @click="logout">Logout</button>
  </div>
</template>

<style scoped></style>