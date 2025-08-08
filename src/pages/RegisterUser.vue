<script>
export default {
  emits: ['login-success'],
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
        const res = await fetch('http://localhost:8000/api/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation
          })
        });
        if (res.ok) {
          const loginRes = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({
              email: this.email,
              password: this.password
            })
          });
          const loginData = await loginRes.json();
          if (loginData.token) {
            localStorage.setItem('token', loginData.token);
            this.$emit('login-success');
          }
        } else {
          
if (res.status === 422) {
  const errorData = await res.json();
  this.error = Object.values(errorData.errors).flat().join(', ');
} else {
  this.error = 'Registration failed';
}

        }
      } catch (e) {
        this.error = 'Registration failed';
      }
    }
  }
}
</script>

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