<template>
  <div class="button-container card-list">
      <Button class="card"
        v-for="(value,name,index) in mainInfo"
        :key="name"
        v-bind:year="name"
        v-bind:matches="value"
        v-bind:index="index+start"
        v-bind:teamName = "teamList[index+start]"
      />
      
  </div>
</template>

<script>
const Button = () => import ('./Button');



export default {
  name: "Buttons",
  data(){
    return{
      
    }
  },

  props: ["mainInfo","start","teamList"],
  components: {
    Button
  },
  methods: {},

  created() {
  
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import '../assets/card.css';

.button-container {
  
  width: 90%;
  margin: 0 5%;
  text-decoration: none;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(1, 1fr);
  
  
}
.card:nth-child(5) {
    margin-left: 0px;
}
.card:nth-child(9) {
    margin-left: 0px;
}
.card{
  
}
@media (min-width: 200px) and (max-width: 979px) {
  .button-container {
    width: 100%;
    margin: 0;
    text-decoration: none;
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(1, 1fr);
    overflow: hidden;
  }
  .card{
    width: 75%;
    margin-left: -10px;
    padding: 5%;
    
  }
  .card:focus-within~.card, .card:hover~.card {
    transform: none;
  }

  .card:hover {
      transform: none;
  }
}
</style>
