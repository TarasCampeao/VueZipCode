<style lang="sass">
    @import url('https://use.fontawesome.com/releases/v5.3.1/css/all.css')
    @import "./assets/style/main.sass"
    @import "./assets/style/media.sass"
</style>
<template>
  <div id="app">
    <zip-block></zip-block>
  </div>
</template>

<script>
import ZipBlock from './components/ZipBlock.vue'


export default {
  name: 'app',
  components: {
  	ZipBlock,
  },
};
</script>


