d3.json("Output/cases.json").then(function(cases) {

    // find the html that corresponds to the dropdown
    var dropDown=document.getElementById("selYear");

    // run the top 10 list initially
    updatetop10list(2000,cases)

    // run the top 10 list every time the dropdown is changed
    dropDown.onchange=function (){
    updatetop10list(dropDown.value, cases)
    }
});

// update top 10 list function
function updatetop10list(chosenYear, data){
    var casesList = []
    let list = document.getElementById("top10list");
    list.innerHTML='';

    // for loop that creates a list of dictionaries
    for(var i in data){
        var key = i;
        if( key != "Country"){
        var caseAmount = data[i]["Years"][chosenYear]
        let currentDict = {
            "country" : key,
            "numCases" : caseAmount
        }
        casesList.push(currentDict)
        }
        
    }

    // sort by the number of cases
    casesList.sort(function(a,b){
        return b.numCases - a.numCases;
    })

// Create the list elements for the top 10 list
    for(let i = 0; i < 10; i++){
        let li = document.createElement("li");
        li.appendChild(
        document.createTextNode(`${casesList[i]["country"]} (${casesList[i]["numCases"]})`));
        list.appendChild(li);
    }

}