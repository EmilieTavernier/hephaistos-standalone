<template>
  <v-container>
    <h1>authentification</h1>
    <form>
      <div>
        <input v-model="email" type="text" placeholder="Enter email" name="uname" required />
        <br />

        <input v-model="password" type="password" placeholder="Enter password" name="psw" required />
        <br />

        <button
          class="v-btn v-btn--depressed theme--light v-size--default primary"
          @click="loginMethod"
        >Login</button>
      </div>
    </form>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'loginForm',

  data: () => ({
    email: 'admin@example.com',
    // password: 'XFHHOS33z0'
    password: 'mNz1MJyWCc'
  }),

  methods: {
    ...mapActions('user', ['login']),

    async loginMethod () {
      const { email, password } = this
      await this.login({ email, password })
      if (this.isAuthenticated) {
        this.$router.push({ name: 'home' })
        console.log('Success')
      } else {
        console.log('Fail')
      }
    }
  },
  computed: {
    ...mapGetters('user', ['isAuthenticated'])
  }
}
</script>
