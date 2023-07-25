d3.json("Output/cases.json").then(function(data) {
   var cases = data
   var casesList2021 = []
    console.log(data)
    for(var i in cases){
        var key = i;
        var caseAmount = cases[i]["Years"]["2021"]
        let currentDict = {
            "country" : key,
            "numCases" : caseAmount
        }
        casesList2021.push(currentDict)
    }
    casesList2021.sort(function(a,b){
        return b.numCases - a.numCases;
    })

    let list = document.getElementById("top10list");
    for(let i = 0; i < 10; i++){
        let li = document.createElement("li");
        li.appendChild(document.createTextNode(casesList2021[i]["country"]));
        list.appendChild(li);
    }
    console.log(casesList2021)
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


