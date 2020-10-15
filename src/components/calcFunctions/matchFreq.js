

function matchFreq (seasonsData) {

    let map = new Map();
    seasonsData.forEach(item => {
        if(item.venue!=undefined){
          if(map[item.venue] ){
            map[item.venue]++;
          }else{
            map[item.venue] = 1;
          }
        }
      });
      return map;
}
export default matchFreq;