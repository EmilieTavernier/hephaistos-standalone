<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6">
        <v-textarea filled v-model="instructions" name="input-7-4" label="Instruction"></v-textarea>
      </v-col>
      <v-col cols="12" md="6">
        <v-textarea outlined v-model="solution" name="input-7-4" label="Sandbox"></v-textarea>
        <button
          class="v-btn v-btn--depressed theme--light v-size--default primary"
          @click="runSandBox"
        >Run Sandbox</button>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" md="6">
        <v-textarea outlined v-model="tests" name="input-7-4" label="Tests"></v-textarea>
      </v-col>
    </v-row>
    <h1>Tests result</h1>

    <v-card max-width="800" tile>
      <v-list-item two-line v-bind:key="c.name" v-for="c in component">
        <v-list-item-content>
          <v-list-item-title>{{ c.name }}</v-list-item-title>
          <v-list-item-subtitle>{{ c.hasOwnProperty("failure") ? "failure: " + c.failure.message : 'success' }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-card>
    <br />
    <button class="v-btn v-btn--depressed theme--light v-size--default primary" @click="saveEx">Save</button>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',

  data: () => ({
    instructions: 'Be creative',
    lang: 'python',
    title: 'Calcul du nombre d\'occurrences',
    tests: '',
    solution: '',
    templateRegions: ['Cat'],
    templateRegionsRw: [0],
    difficulty: '3',
    score: '3',
    component: []
  }),

  methods: {
    async runSandBox () {
      const {
        lang,
        tests,
        solution
      } = this
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/exercise/sandbox', {
          lang,
          tests,
          solution
        })
        console.log('Running sandbox is a success: ' + result)

        this.component = result.data.result.tests
      } catch (err) {
        this.errorLogin = err
        console.log('Running sandbox is a failure: ' + err)
      }
    },

    async saveEx () {
      const {
        instructions,
        lang,
        title,
        tests,
        solution,
        templateRegions,
        templateRegionsRw,
        difficulty,
        score
      } = this
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/exercise', {
          instructions,
          lang,
          title,
          tests,
          solution,
          template_regions: templateRegions,
          template_regions_rw: templateRegionsRw,
          difficulty,
          score,
          creation_date: new Date()
        })
        console.log('Saving is a success: ' + result)
      } catch (err) {
        this.errorLogin = err
        console.log('Saving is a failure: ' + err)
      }
    }
  }
}
</script>
