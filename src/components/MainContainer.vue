<template>
  <div>
    <div class="Header">
      
      <h1 class="MainHeading"> IPL Dash </h1>
      <nav class="nav">
        <router-link class = "link" to="/" > Home</router-link>
        <a href="https://github.com/codingcarrots20/ipldash-atl" class="link"> Github </a>
      </nav>

      
    </div>
  <router-view></router-view>
  </div>
</template>

<script>
import VueRouter from 'vue-router'

const Body = () => import('./Body');
const Season = () => import('./Season');

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
        height: 100px;
        background-image: linear-gradient(#32e0c4, #0d7377);
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        
        
    }
    .link{
        color: wheat;
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
        flex:1;
        color: #222;
        font-size: 22px;
        font-weight: bolder;
        transition: 250ms;
    }
    .link:hover{
      color: wheat;
    }
    .MainHeading{
        color: wheat;
        font-family: Arial, Helvetica, sans-serif;
        font-weight: 1000;
        flex: 1;
        margin-top:30px;
    }
    .nav{
      width: 100%;
      display: flex;
    }
</style>
