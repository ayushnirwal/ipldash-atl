<template>
  <div class="season-container">
    <h1 class="Heading">{{title}}</h1>

    <div class="charts-container">
      <h1 class="head">Venue Usage</h1>
      <Bar
        class="bar"
        v-if="rederBar"
        :height="graphWidth"
        :chartdata="barDataVenue"
        :options="barOptionsVenue"
      />
      <h1 class="head">Toss Win-lose rate</h1>
      <Bar
        class="bar"
        v-if="rederBar"
        :height="graphWidth"
        :chartdata="barDataToss"
        :options="barOptionsToss"
      />

      <div class="pie-container">
        <div class="pie">
          <h1>Most Bat Heavy Team</h1>
          <Pie
            v-if="rederBar"
            :height="pieGraphWidth"
            :chartdata="pieBatData"
            :options="pieBatOptions"
          />
        </div>
        <div class="pie">
          <h1>Most Field Heavy Team</h1>
          <Pie
            v-if="rederBar"
            :height="pieGraphWidth"
            :chartdata="pieFieldData"
            :options="pieFieldOptions"
          />
        </div>
      </div>
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
const Bar = () => import("./chartComponets/Bar");
const Pie = () => import("./chartComponets/Pie");

import matchFreq from "./calcFunctions/matchFreq.js";
import teamStandings from "./calcFunctions/teamStandings.js";
import batBowlRate from "./calcFunctions/batBowlRate.js";
import localStorage from "localforage";

export default {
  name: "Season",
  componenets: {
    Bar,
    Pie
  },

  data() {
    let title = "Season " + (Number(this.$route.params.id) + 1);

    let width = window.innerWidth;
    let graphWidth = 0;
    let pieTitleFontSize = 0;
    let pieGraphWidth = 0;

    if (width > 0 && width <= 500) {
      graphWidth = 400;
      pieTitleFontSize = 22;
      pieGraphWidth = 400;
    } else {
      graphWidth = 200;
      pieTitleFontSize = 32;
      pieGraphWidth = 400;
    }

    let barOptionsVenue = {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: "wheat", // this here
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: "wheat", // this here
              beginAtZero: true
            }
          }
        ]
      },

      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: "wheat"
        }
      }
    };

    let barOptionsToss = {
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: "wheat", // this here
              min: 0,
              beginAtZero: true
            }
          }
        ],
        yAxes: [
          {
            gridLines: {
              display: false
            },
            ticks: {
              fontColor: "wheat", // this here
              beginAtZero: true
            }
          }
        ]
      },

      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: "wheat"
        }
      }
    };
    let pieBatOptions = {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: "wheat"
        }
      },
      title: {
        display: true,
        fontColor: "wheat",
        fontSize: pieTitleFontSize,
        text: undefined
      }
    };
    let pieFieldOptions = {
      legend: {
        labels: {
          // This more specific font property overrides the global property
          fontColor: "wheat"
        }
      },
      title: {
        display: true,
        fontColor: "wheat",
        fontSize: pieTitleFontSize,
        text: undefined
      }
    };

    return {
      title,
      barOptionsVenue,
      barDataVenue: undefined,
      barOptionsToss,
      barDataToss: undefined,
      pieBatOptions,
      pieBatData: undefined,
      pieFieldData: undefined,
      pieFieldOptions,
      pieGraphWidth,
      show: true, // show loader if true
      graphWidth,
      rederBar: false, // show data if true
      seasonInfo: null,
      msg: "Getting Data from server"
    };
  },
  props: [],
  created() {
    let year = Number(this.$route.params.id) + 2008;
    console.log("year", year);

    this.checkSeasonCache(year).then(res => {
      if (res) {
        console.log("found cache year", year);
        this.loadData(year);
      } else {
        console.log("no cache have to fetch for ", year);
        this.fetchData();
      }
    });
  },

  methods: {
    checkSeasonCache(year) {
      return new Promise(resolve => {
        console.log("checking for :" + String(year));
        localStorage.getItem(String(year)).then(a => {
          if (a == undefined) {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    },
    loadData(year) {
      console.log("loading for year ", year);

      localStorage
        .getItem(String(year))
        .then(response => {
          this.seasonInfo = response;

          this.msg = null;
          let mapVenue = matchFreq(this.seasonInfo);
          let mapToss = teamStandings(this.seasonInfo);
          let batBowl = batBowlRate(this.seasonInfo);
          let labelsVenue = Object.keys(mapVenue);
          let dataVenue = Object.values(mapVenue);

          this.barDataVenue = {
            labels: labelsVenue, // initialized in fetchData
            datasets: [
              {
                label: "No of matches",
                data: dataVenue, // initialized in fetchData
                backgroundColor: "rgba(255, 99, 132, 0.2)",

                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
              }
            ]
          };

          this.barDataToss = {
            labels: mapToss.labels, // initialized in fetchData
            datasets: [
              {
                label: "win",
                data: mapToss.win, // initialized in fetchData
                backgroundColor: "rgba(0, 149, 255, 0.2)",

                borderColor: "rgba(0, 149, 255, 1)",
                borderWidth: 1
              },
              {
                label: "loss",
                data: mapToss.loss, // initialized in fetchData
                backgroundColor: "rgba(255, 99, 132, 0.2)",

                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
              }
            ]
          };

          this.pieBatOptions.title.text = batBowl.batHeavy.name;

          this.pieBatData = {
            labels: ["Choose Bat", "Choose Bowl"],

            datasets: [
              {
                label: "Toss Decision",
                data: [
                  batBowl.batHeavy.chooseBat,
                  batBowl.batHeavy.chooseField
                ],
                backgroundColor: [
                  "rgba(255, 99, 132,0.2)",
                  "rgba(54, 162, 235,0.2)"
                ],
                borderColor: ["rgba(255, 99, 132,1)", "rgba(54, 162, 235,1)"],
                hoverOffset: 4
              }
            ]
          };

          this.pieFieldOptions.title.text = batBowl.fieldHeavy.name;

          this.pieFieldData = {
            labels: ["Choose Bat", "Choose Bowl"],

            datasets: [
              {
                label: "Toss Decision",
                data: [
                  batBowl.fieldHeavy.chooseBat,
                  batBowl.fieldHeavy.chooseField
                ],
                backgroundColor: [
                  "rgba(255, 99, 132,0.2)",
                  "rgba(54, 162, 235,0.2)"
                ],
                borderColor: ["rgba(255, 99, 132,1)", "rgba(54, 162, 235,1)"],
                hoverOffset: 4
              }
            ]
          };

          this.rederBar = true;
          this.show = false;
        })
        .catch(er => {
          console.log(er);
          this.msg = "Sorry, Server Bro is not working today";
        });
    },

    fetchData() {
      let link =
        "https://ipldash-back.herokuapp.com/season/" + this.$route.params.id;
      axios
        .get(link)
        .then(response => {
          this.seasonInfo = response.data.dataArray;

          this.msg = null;
          let mapVenue = matchFreq(this.seasonInfo);
          let mapToss = teamStandings(this.seasonInfo);
          let batBowl = batBowlRate(this.seasonInfo);
          let labelsVenue = Object.keys(mapVenue);
          let dataVenue = Object.values(mapVenue);

          this.barDataVenue = {
            labels: labelsVenue, // initialized in fetchData
            datasets: [
              {
                label: "No of matches",
                data: dataVenue, // initialized in fetchData
                backgroundColor: "rgba(255, 99, 132, 0.2)",

                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
              }
            ]
          };

          this.barDataToss = {
            labels: mapToss.labels, // initialized in fetchData
            datasets: [
              {
                label: "win",
                data: mapToss.win, // initialized in fetchData
                backgroundColor: "rgba(0, 149, 255, 0.2)",

                borderColor: "rgba(0, 149, 255, 1)",
                borderWidth: 1
              },
              {
                label: "loss",
                data: mapToss.loss, // initialized in fetchData
                backgroundColor: "rgba(255, 99, 132, 0.2)",

                borderColor: "rgba(255, 99, 132, 1)",
                borderWidth: 1
              }
            ]
          };

          this.pieBatOptions.title.text = batBowl.batHeavy.name;

          this.pieBatData = {
            labels: ["Choose Bat", "Choose Bowl"],

            datasets: [
              {
                label: "Toss Decision",
                data: [
                  batBowl.batHeavy.chooseBat,
                  batBowl.batHeavy.chooseField
                ],
                backgroundColor: [
                  "rgba(255, 99, 132,0.2)",
                  "rgba(54, 162, 235,0.2)"
                ],
                borderColor: ["rgba(255, 99, 132,1)", "rgba(54, 162, 235,1)"],
                hoverOffset: 4
              }
            ]
          };

          this.pieFieldOptions.title.text = batBowl.fieldHeavy.name;

          this.pieFieldData = {
            labels: ["Choose Bat", "Choose Bowl"],

            datasets: [
              {
                label: "Toss Decision",
                data: [
                  batBowl.fieldHeavy.chooseBat,
                  batBowl.fieldHeavy.chooseField
                ],
                backgroundColor: [
                  "rgba(255, 99, 132,0.2)",
                  "rgba(54, 162, 235,0.2)"
                ],
                borderColor: ["rgba(255, 99, 132,1)", "rgba(54, 162, 235,1)"],
                hoverOffset: 4
              }
            ]
          };

          this.rederBar = true;
          this.show = false;
        })
        .catch(er => {
          console.log(er);
          this.msg = "Sorry, Server Bro is not working today";
        });
    }
  }
};
</script>
<style scoped>
h1 {
  color: wheat;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 40px;
}
.season-container {
  width: 100%;
  margin-top: 20px;
}
.loader-wrapper {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 100;
  background-color: #333;
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
.below {
  position: absolute;
}
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
.bar,
.pie-container {
  margin: auto;
  width: 60vw;
  display: flex;

  padding: 20px;
}
.bar {
  box-shadow: 10px 10px 100px #000;
  border: 2px solid wheat;
  background-color: #222;
}
.pie-container {
  margin-top: 100px;
}
.head {
  margin-top: 100px;
}
.pie {
  border: 2px solid wheat;
  width: 40%;
  margin: 3%;
  background-color: #222;
  box-shadow: 10px 10px 100px #000;
  flex: 1;
  padding: 2%; /* (100 - 2*width - 4*margin )/4   */
}
.charts-container {
  position: absolute;
  z-index: -1;
  width: 80%;
  margin-left: 10%;
}
@media (min-width: 200px) and (max-width: 979px) {
  h1 {
    font-size: 20px;
  }
  .pie-container {
    display: block;
  }
  .pie {
    width: 90%;
  }
  .bar {
    width: 90%;
  }
  .charts-container {
    width: 90%;
    margin: 5%;
  }
}
</style>