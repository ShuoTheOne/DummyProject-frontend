<template>
  <form @submit.prevent="register">
    <input v-model="name" placeholder="Name" required />
    <input v-model="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <input v-model="password_confirmation" type="password" placeholder="Confirm Password" required />
    <button type="submit">Register</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    };
  },
  methods: {
    async register() {
      try {
        await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
        });
      } catch (e) {
        this.error = 'Registration failed';
      }
    }
  }
};
</script>