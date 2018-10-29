<style lang="sass">
    @import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css')
    @import "./assets/style/main.sass"
    @import "./assets/style/media.sass"
</style>
<template>
  <div id="app">
    <zip-code></zip-code>
  </div>
</template>

<script>
import ZipCode from './components/ZipCode.vue'


export default {
  name: 'app',
  components: {
  	ZipCode,
  },
};
</script>


