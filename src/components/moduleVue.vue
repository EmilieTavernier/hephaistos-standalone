<template>
  <v-container>
    <h1>{{module.name}}</h1>

    <div v-for="session in sessions" v-bind:key="session.id">
      <h1>{{session.name}}</h1>

      <v-item-group active-class="primary">
        <v-container>
          <v-row>
            <v-col
              v-for="exercise in getExercisesBySessionId(session.id)"
              v-bind:key="exercise.id"
              cols="12"
              md="4"
            >
              <v-item v-slot:default="{ active, toggle }">
                <v-card class="d-flex" dark height="200" @click="toggle">
                  <router-link
                    :to="`/exercise/${session.id}/${exercise.id}`"
                    style="color:white; text-decoration: none"
                  >
                    <div class="mt-10 mx-10">{{exercise.title}}</div>
                  </router-link>
                </v-card>
              </v-item>
            </v-col>
          </v-row>
        </v-container>
      </v-item-group>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercises', ['exercices']),
    ...mapGetters('modules', ['getModuleById']),
    ...mapGetters('sessions', ['getSessionsByModuleId']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    module () {
      return this.getModuleById(this.moduleId) || { name: 'Loading..' }
    },
    moduleId () {
      return parseInt(this.$route.params.id)
    },
    sessions () {
      return this.getSessionsByModuleId(this.moduleId)
    }
  },
  methods: {
    ...mapActions('modules', ['fetchModule']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession'])
  },
  async mounted () {
    await this.fetchModule({ id: this.moduleId })
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
  }
}
</script>
