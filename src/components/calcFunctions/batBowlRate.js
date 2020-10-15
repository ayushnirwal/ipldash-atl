


function batBowlRate (seasonsData) {

    let map = [];
    seasonsData.forEach((ele)=>{
        if (ele.result == "normal"){
            let winner = ele.toss_winner;
            let toss_decision = ele.toss_decision;
            if(map[winner]== undefined){
                
                map[winner] = {bat:0,field:0};
                
            }

            if(toss_decision == "bat"){
                map[winner].bat++;
            }
            else{
                
                map[winner].field++;
            }
        }
    });
    

    const myMap = new Map();

    let key = Object.keys(map);
    key.forEach((ele)=>{
        myMap.set(ele,map[ele])
    });

    let mapSortedBat = ([...myMap.entries()].sort((a, b) => b[1].bat - a[1].bat))
    let mapSortedField = ([...myMap.entries()].sort((a, b) => b[1].field - a[1].field))

    
    
    let retData ={
        "batHeavy":{
            name:mapSortedBat[0][0],
            chooseBat:mapSortedBat[0][1].bat,
            chooseField:mapSortedBat[0][1].field,
        },
        "fieldHeavy":{
            name:mapSortedField[0][0],
            chooseBat:mapSortedField[0][1].bat,
            chooseField:mapSortedField[0][1].field,
        }
    
    };
    
    return retData;
}
export default batBowlRate;