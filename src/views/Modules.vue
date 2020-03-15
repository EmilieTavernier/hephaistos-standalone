<template>
  <div class="Modules">
    <modulesVue />
  </div>
</template>

<script>
// @ is an alias to /src
import modulesVue from '@/components/modulesVue.vue'

export default {
  name: 'Modules',
  components: {
    modulesVue
  }
}
</script>
