<template>
  <div>
    <div class="Header">
      
      <h1 class="MainHeading"> IPL Dash </h1>
      <router-link class = "link" to="/" > Home</router-link>

      
    </div>
  <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from 'vue-router'
import Body from './Body.vue'
import Season from './Season.vue'
const routes = [
  { path: '/', component: Body },
  { path: '/season/:id', component: Season }
];
const router = new VueRouter({
   routes // short for `routes: routes`
});
export default {
  name: 'MainContainer',
  props: {
    
  },
  components:{
    
  },
  router,
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    .Header{
        width:100%;
        height: 10vh;
        background-color: #015417;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        
    }
    .link{
        color: wheat;
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
    }
    .MainHeading{
        color: wheat;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 1000;
        flex: 1;
        margin-top:30px;
    }
</style>
