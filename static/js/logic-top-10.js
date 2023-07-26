d3.json("Output/cases.json").then(function(data) {
    var cases = data
    var dropDown=document.getElementById("selYear");
    updatetop10list(2000,cases)
    dropDown.onchange=function (){
    updatetop10list(dropDown.value, cases)
    }
});

function updatetop10list(chosenYear, data){
    var casesList = []
    let list = document.getElementById("top10list");
    list.innerHTML='';
    for(var i in data){
        var key = i;
        var caseAmount = data[i]["Years"][chosenYear]
        let currentDict = {
            "country" : key,
            "numCases" : caseAmount
        }
        casesList.push(currentDict)
    }
    casesList.sort(function(a,b){
        return b.numCases - a.numCases;
    })


for(let i = 0; i < 10; i++){
    let li = document.createElement("li");
    li.appendChild(
        document.createTextNode(`${casesList[i]["country"]} (${casesList[i]["numCases"]})`));
    list.appendChild(li);
}

}

d3.json("Output/countries.json").then(function(data) {
    let countries = data
    console.log(data)
});

d3.json("Output/deaths.json").then(function(data) {
    let deaths = data
    console.log(data)
});

d3.json("Output/mortality.json").then(function(data) {
   let mortality = data
    console.log(data)
});

d3.json("Output/rates.json").then(function(data) {
    let rates = data
    console.log(data)
});


