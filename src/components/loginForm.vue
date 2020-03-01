<template>
  <v-container>
    <h1>authentification</h1>
    <form>
      <div>
        <input v-model="username" type="text" placeholder="Enter email" name="uname" required />
        <br />

        <input v-model="password" type="password" placeholder="Enter password" name="psw" required />
        <br />

        <button
          class="v-btn v-btn--depressed theme--light v-size--default primary"
          @click="login"
        >Login</button>
      </div>
    </form>
  </v-container>
</template>

<script>
export default {
  name: 'loginForm',

  data: () => ({
    username: 'admin@example.com',
    password: 'XFHHOS33z0'
  }),

  methods: {
    displayCreds () {
      console.log('hello')
    },
    async login () {
      const { username, password } = this
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/login', {
          username,
          password
        })
        console.log('success')
        this.$root.user = result.data
        this.$root.loggedIn = true
        this.$router.push({ name: 'home' })
      } catch (err) {
        this.errorLogin = err
        console.log('failure')
      }
    }
  }
}
</script>
