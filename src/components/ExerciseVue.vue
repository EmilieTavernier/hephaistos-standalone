<template>
  <v-container fluid>
    <div>
      <v-item-group active-class="primary">
        <v-container>
          <v-row>
            <v-col cols="12" md="6">
              <h1>{{exercise.title}}</h1>
              <p v-html="exercise.instructions"></p>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" md="6">
              <h2 style="display: inline-block">Your solution</h2>
              <button
                class="v-btn v-btn--depressed theme--light v-size--default primary mx-5"
                @click="runSandBox"
              >></button>
              <div
                id="editor"
                class="exercise-editor-ace-editor"
                style="position: relative; height: 20rem;"
              ></div>
            </v-col>
            <v-col cols="12" md="6">
              <h2>Tests</h2>

              <v-card max-width="800" tile>
                <v-list-item two-line v-bind:key="c.name" v-for="c in component">
                  <v-list-item-content>
                    <v-list-item-title>{{ c.name }}</v-list-item-title>
                    <v-list-item-subtitle>{{ c.hasOwnProperty("failure") ? "failure: " + c.failure.message : 'success' }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </div>
  </v-container>
</template>

<script>
import ace from 'ace-builds/src-noconflict/ace'
import 'ace-builds/src-noconflict/theme-monokai'
import 'ace-builds/src-noconflict/mode-python'
import 'ace-builds/webpack-resolver'

import { mapState, mapActions, mapGetters } from 'vuex'

export default {

  data: () => ({
    editor: null,
    component: []
  }),
  computed: {
    ...mapState('exercises', ['exercices']),
    ...mapGetters('exercises', ['getExerciseById']),

    sessionId () {
      return parseInt(this.$route.params.sessionId)
    },
    exerciseId () {
      return parseInt(this.$route.params.exId)
    },
    exercise () {
      return this.getExerciseById(this.exerciseId)
    }
  },
  methods: {
    ...mapActions('exercises', ['fetchExerciseForSession']),

    async runSandBox () {
      try {
        const result = await this.axios.post('http://localhost:3000/api/v1/exercise/sandbox', {
          lang: this.exercise.lang,
          tests: this.exercise.tests,
          solution: this.editor.getValue()
        })
        console.log('Running sandbox is a success: ' + result)

        this.component = result.data.result.tests
      } catch (err) {
        this.errorLogin = err
        console.log('Running sandbox is a failure: ' + err)
      }
    }

  },
  async mounted () {
    await this.fetchExerciseForSession({ sessionId: this.sessionId, exerciseId: this.exerciseId })
    this.editor = ace.edit('editor')
    this.editor.setTheme('ace/theme/monokai')
    this.editor.session.setMode(`ace/mode/${this.exercise.lang}`)
  }

}
</script>
