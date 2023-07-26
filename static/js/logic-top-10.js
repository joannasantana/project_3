d3.json("Output/cases.json").then(function(data) {
   var cases = data
    console.log(data)
    var dropDown=document.getElementById("selYear");
    dropDown.onchange=function (){
        var casesList = []
        let list = document.getElementById("top10list");
        list.innerHTML='';
        var yearCases = dropDown.value;
        for(var i in cases){
            var key = i;
            var caseAmount = cases[i]["Years"][yearCases]
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
        li.appendChild(document.createTextNode(casesList[i]["country"]));
        list.appendChild(li);
    }
    console.log(casesList)

    }
});

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


