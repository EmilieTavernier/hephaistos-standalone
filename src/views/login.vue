<template>
  <div class="Login">
    <loginForm />
  </div>
</template>

<script>
// @ is an alias to /src
import loginForm from '@/components/loginForm.vue'

export default {
  name: 'Login',
  components: {
    loginForm
  }
}
</script>
