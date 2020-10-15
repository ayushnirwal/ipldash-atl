


function teamStandings (seasonsData) {

    let map = [];
    seasonsData.forEach(item => {
        let teamA = item.team1;
        let teamB = item.team2;
        let winner = item.toss_winner;
        let loser = (teamA == winner)?teamB:teamB;
        


        if(winner!=undefined){
          if(map[winner] ){
            map[winner].win++;
          }else{
            map[winner] ={ win:1,loss:0}
            map[winner].win = 1;
          }

          if(map[loser] ){
            map[loser].loss++;
          }else{
            map[loser] ={ win:0,loss:1}
            map[loser].loss = 1;
          }


      }
      });

    const myMap = new Map();

    let key = Object.keys(map);
    key.forEach((ele)=>{
        myMap.set(ele,map[ele])
    });

    let mapSorted = ([...myMap.entries()].sort((a, b) => b[1].win - a[1].win))  
    let labels = mapSorted.map((ele)=>ele[0]);
    let win = mapSorted.map((ele)=>ele[1].win);
    let loss = mapSorted.map((ele)=>ele[1].loss);
    
    return {labels,win,loss};
}
export default teamStandings;