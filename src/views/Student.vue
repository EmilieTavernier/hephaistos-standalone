<template>
  <div class="Exercise">
    <v-item-group active-class="primary">
      <v-container>
        <v-row>
          <v-col cols="12" md="2">
            <exercisesList />
          </v-col>
          <v-col cols="12" md="10">
            <exerciseVue />
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
// @ is an alias to /src
import exerciseVue from '@/components/ExerciseVue.vue'
import exercisesList from '@/components/ExercisesList.vue'

export default {
  name: 'Exercise',
  components: {
    exerciseVue,
    exercisesList
  }
}
</script>
