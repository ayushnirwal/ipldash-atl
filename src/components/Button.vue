<template>
  <router-link :to="link">
    <div class="button">
      <p class="season">Season : {{index +1}}</p>
      <p class="matches">Matches Played : {{matches}}</p>
      <p class="year">Year : {{year}}</p>
      <h1 class="head">Most Toss Win</h1>
      <img class="team-logo" :src="teamLogo" />
      <p>{{ teamName }}</p>
    </div>
  </router-link>
</template>

<script>
import RRlogo from "../assets/RR.png";
import CSKlogo from "../assets/CSK.png";
import SHlogo from "../assets/SH.png";
import MIlogo from "../assets/MI.png";
import KPlogo from "../assets/KP.png";
import DClogo from "../assets/DC.png";
import KKRlogo from "../assets/KKR.png";
export default {
  name: "Button",
  data() {
    let link = "/season/" + this.index;
    let teamLogo = null;
    if(this.teamName == "Rajasthan Royals"){
        teamLogo = RRlogo;
    }
    else if(this.teamName == "Deccan Chargers"){
        teamLogo = DClogo;
    }
    else if(this.teamName == "Chennai Super Kings"){
        teamLogo = CSKlogo;
    }
    else if(this.teamName == "Kings XI Punjab"){
        teamLogo = KPlogo;
    }
    else if(this.teamName == "Mumbai Indians"){
        teamLogo = MIlogo;
    }
    else if(this.teamName == "Kolkata Knight Riders"){
        teamLogo = KKRlogo;
    }
    else if(this.teamName == "Sunrisers Hyderabad"){
        teamLogo = SHlogo;
    }
    
    return {
      link,
      teamLogo
    };
  },

  props: ["year", "matches", "index", "teamName"],
  components: {},
  methods: {},

  created() {
    
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
a {
  text-decoration: none;
}
.button {
  /* Green */
  border: none;
  color: wheat;
  padding: 15px 32px;
  text-align: center;
  border: 1px solid wheat;
  font-size: 27px;
  flex: 1;
  margin: 2px 15px;
  font-family: Lato;
  border-radius: 5px;
  cursor: pointer;
  transition: 500ms;
  text-decoration: none;
}
.button:hover {
  box-shadow: 2px 2px 10px wheat;
  background-color: cadetblue;
}
.season {
  font-weight: 700;
}
.matches {
  font-size: 23px;
}
.year {
  font-size: 18px;
}
.team-logo {
  height: 150px;
}
.head {
  margin-top: 20px;
  font-size: 20px;
}

@media (min-width: 200px) and (max-width: 979px) {
  .button {
    margin: 10px 20px;
  }
  .team-logo {
    height: 70px;
}
}
</style>
