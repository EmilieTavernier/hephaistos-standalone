<template>
  <v-container>
    <div v-for="module in modules" v-bind:key="module.id">
      <h1>
        <router-link
          :to="`/module/${module.id}`"
          style="color:black; text-decoration: none"
        >{{module.name}}</router-link>
      </h1>

      <v-item-group active-class="primary">
        <v-container>
          <v-row>
            <v-col v-for="session in sessions" v-bind:key="session.id" cols="12" md="4">
              <v-item v-slot:default="{ active, toggle }">
                <v-card class="d-flex" dark height="200" @click="toggle">
                  <div class="mt-10 mx-10">{{session.name}}</div>
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
import { mapState, mapActions } from 'vuex'

export default {
  data: () => ({
  }),
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions'])
  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule'])
  }

  /*
  data: () => ({
  }),
  computed: {
    ...mapState('modules', ['modules']),
    ...mapState('sessions', ['sessions']),
    ...mapState('exercices', ['exercices']),
    ...mapState('sessions', ['getSessionsByModuleId']),
    ...mapState('exercices', ['getExercicesBySessionId'])
  },
  async mounted () {
    await this.fetchModules()
    await Promise.all(
      this.modules.map(m => this.fetchSessionsForModule({ moduleId: m.id }))
    )
    await Promise.all(
      this.sessions.map(s => this.fetchExercisesForSession({ sessionId: s.id }))
    )
  },
  methods: {
    ...mapActions('modules', ['fetchModules']),
    ...mapActions('sessions', ['fetchSessionsForModule']),
    ...mapActions('exercises', ['fetchExercisesForSession']),
    getFirstExerciseIdOfSession (sessId) {
      const exos = this.getExerciseBySessionId(sessId)
      if (exos.length) {
        return exos[0].id
      } else {
        return 0;
      }
    }
  }
  */
}
</script>
