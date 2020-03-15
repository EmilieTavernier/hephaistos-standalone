<template>
  <div class="Module">
    <moduleVue />
  </div>
</template>

<script>
// @ is an alias to /src
import moduleVue from '@/components/moduleVue.vue'

export default {
  name: 'Module',
  components: {
    moduleVue
  }
}
</script>
