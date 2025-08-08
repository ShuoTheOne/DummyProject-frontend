<template>
  <form @submit.prevent="login">
    <input v-model="email" placeholder="Email" required />
    <input v-model="password" type="password" placeholder="Password" required />
    <button type="submit">Login</button>
    <div v-if="error">{{ error }}</div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      error: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await fetch('http://localhost:8000/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });
        const data = await res.json();
        if (data.token) {
          localStorage.setItem('token', data.token);
          this.$emit('login-success');
        } else {
          this.error = 'Login failed';
        }
      } catch (e) {
        this.error = 'Login failed';
      }
    }
  }
};
</script>