<template>
  <div class="Body">
    <Loader/>
    
  </div>
</template>

<script>
const Loader = () => import ('./Loader');
export default {
  name: 'Body',
  props: {
    
  },
  components:{
    Loader
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    
</style>
