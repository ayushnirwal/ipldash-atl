<template>
  <div>
    <div class="buttons-container">
      <Buttons v-if="!show " class="below" v-bind:mainInfo="l1" :teamList="t1" v-bind:start="0"/>
      <Buttons v-if="!show " class="below" v-bind:mainInfo="l2" :teamList="t2" v-bind:start="4"/>
      <Buttons v-if="!show " class="below" v-bind:mainInfo="l3" :teamList="t3" v-bind:start="8"/>
    </div>


    <transition name="fade">
      <div v-if="show" class="loader-container up" id="loader">
        <div class="loader-wrapper">
          <div class="loader">
            <div class="ball"></div>
            <div class="ball"></div>
            <div class="ball"></div>
          </div>
          <div class="msg">{{ msg }}</div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import axios from "axios";
import Buttons from "./Buttons.vue";
export default {
  name: "Loader",
  data() {
    return {
      show: true,
      l1:null,
      l2:null,
      l3:null,
      t1:null,
      t2:null,
      t3:null,
      msg: "Getting Data from server"
    };
  },
  props: [],
  components: {
    Buttons
  },
  methods: {
    fetchData() {
      axios
        .get("https://ipldash-back.herokuapp.com/main")
        .then(response => {
          let key = Object.keys(response.data.map);
          let teamNames = response.data.bestTeamNames;
          let l1 = {};
          let l2 = {};
          let l3 = {};
          let t1 = [];
          let t2 = [];
          let t3 = [];

          key.forEach((ele,index)=>{
            if(index >=0 && index <=3)
              l1[ele]= response.data.map[ele];
              t1.push(teamNames[index]);
            if(index >=4 && index <=7)
              l2[ele]= response.data.map[ele];
              t2.push(teamNames[index]);
            if(index >=8)
              l3[ele]= response.data.map[ele];
              t3.push(teamNames[index]);
          })

          
          
          this.l1 = l1;
          this.l2 = l2;
          this.l3 = l3;
          this.t1 = t1;
          this.t2 = t2;
          this.t3 = t3;
          this.show = false;
          this.msg = null;
        })
        .catch(er => {
          console.log(er);
          this.msg = "Sorry, Server Bro is not working today";
        });
    }
  },

  created() {
    this.fetchData();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.loader-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #555;
}

.loader-wrapper .text {
  position: absolute;
  bottom: 0;
  left: 50%;
  -webkit-transform: translateX(-50%);
  -ms-transform: translateX(-50%);
  transform: translateX(-50%);
  margin: 0 0 100px;
  color: rgba(255, 255, 255, 0.7);
  text-transform: uppercase;
  font-size: 11px;
  font-family: sans-serif, helvetica;
  letter-spacing: 0.5px;
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 300px;
  height: 24px;
  border-left: 8px solid #fff;
  border-right: 8px solid #fff;
  overflow: hidden;
}

.loader .ball {
  height: 8px;
  width: 0;
  background: white;
  position: relative;
  margin: 0;
}

.loader .ball:nth-child(1) {
  -webkit-animation: ball 2s ease-in-out infinite;
  animation: ball 2s ease-in-out infinite;
}

.loader .ball:nth-child(2) {
  -webkit-animation: ball 2s ease-in-out 0.1s infinite;
  animation: ball 2s ease-in-out 0.1s infinite;
}

.loader .ball:nth-child(3) {
  -webkit-animation: ball 2s ease-in-out 0.2s infinite;
  animation: ball 2s ease-in-out 0.2s infinite;
}

@-webkit-keyframes ball {
  0% {
    left: 0;
    width: 0px;
  }
  25% {
    left: 0;
    width: 300px;
  }
  50% {
    left: 300px;
    width: 0px;
  }
  75% {
    left: 0;
    width: 300px;
  }
  100% {
    left: 0;
    width: 0px;
  }
}

@keyframes ball {
  0% {
    left: 0;
    width: 0px;
  }
  25% {
    left: 0;
    width: 300px;
  }
  50% {
    left: 300px;
    width: 0px;
  }
  75% {
    left: 0;
    width: 300px;
  }
  100% {
    left: 0;
    width: 0px;
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.up,

.up {
  z-index: 1;
}
.down {
  z-index: 0;
}
.msg {
  position: absolute;
  z-index: 3;
  margin-top: 150px;
  color: white;
  font: 23px Roboto;
  width: 100%;
  text-align: center;
}
.buttons-container{
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  
}

@media (min-width: 200px) and (max-width: 979px) {
}
</style>
