<template>
  <div id="app">
    
    <MainContainer/>
  </div>
</template>

<script>
import MainContainer from './components/MainContainer.vue'

export default {
  name: 'App',
  components: {
    MainContainer
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
  box-sizing: content-box;
  
}
body{
  background-color: #333;
}

</style>
