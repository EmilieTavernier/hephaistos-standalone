
<template>
  <v-container fluid>
    <v-card max-width="400" tile>
      <v-list-item two-line v-bind:key="e.id" v-for="e in getExercisesBySessionId(sessionId)">
        <router-link
          :to="`/exercise/${sessionId}/${e.id}`"
          style="color:black; text-decoration: none"
        >
          <v-list-item-content>
            <v-list-item-title
              style="width:100px;overflow:hidden;height:50px;line-height:50px;"
            >{{ e.title }}</v-list-item-title>
            <v-list-item-subtitle>{{ e.lang }}</v-list-item-subtitle>
          </v-list-item-content>
        </router-link>
      </v-list-item>
    </v-card>
  </v-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

export default {
  computed: {
    ...mapState('exercises', ['exercices']),
    ...mapGetters('exercises', ['getExercisesBySessionId']),
    sessionId () {
      return parseInt(this.$route.params.sessionId)
    }
  }
}
</script>
