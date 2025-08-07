<script setup>
import { ref } from 'vue'
import LoginUser from './pages/LoginUser.vue'
import RegisterUser from './pages/RegisterUser.vue'

const showLogin = ref(false)
const showRegister = ref(false)

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
</script>

<template>
  <h1>zugzug</h1>

  <button @click="openLogin">Login</button>
  <button @click="openRegister">Register</button>

  <LoginUser v-if="showLogin" />
  <RegisterUser v-if="showRegister" />

  <button v-if="showLogin || showRegister" @click="closeForms">Close</button>
</template>

<style scoped></style>