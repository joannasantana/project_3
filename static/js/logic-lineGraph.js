// Declare empty list for loading json data into
let casesList = [];
let line;

// Load json data for number of malaria cases/country/year
d3.json("Output/cases.json").then(function(data) {
   let cases = data;
    console.log(data)
    for(var i in cases) {
        var key = i;
        let graphDict = {
            "Country": key,
            "data": cases[i]
        }
        casesList.push(graphDict)
    }
    console.log(casesList)
    populateDropdown()
    updateLineGraph(casesList[0], casesList[0])
});

// Assign location of dropdown menus using d3.select
let selDataset1 = d3.select("#selDataset1");
let selDataset2 = d3.select("#selDataset2");

// Create the function that will populate the dropdown window
function populateDropdown() {
    casesList.forEach(function (val) {
        let country = val.Country;
        selDataset1.append("option").attr("value", country).text(country);
        selDataset2.append("option").attr("value", country).text(country);
    });

    selDataset1.on("change", function () {
        let newSelection1 = this.value;
        let arrayIndex1 = casesList.findIndex(x => x.Country == newSelection1);
        console.log(arrayIndex1);

        let newSelection2 = selDataset2.node().value; // Get the value of the second dropdown
        let arrayIndex2 = casesList.findIndex(x => x.Country == newSelection2);
        console.log(arrayIndex2);

        updateLineGraph(casesList[arrayIndex1], casesList[arrayIndex2]);
    });

    selDataset2.on("change", function () {
        let newSelection2 = this.value;
        let arrayIndex2 = casesList.findIndex(x => x.Country == newSelection2);
        console.log(arrayIndex2);

        let newSelection1 = selDataset1.node().value; // Get the value of the first dropdown
        let arrayIndex1 = casesList.findIndex(x => x.Country == newSelection1);
        console.log(arrayIndex1);

        updateLineGraph(casesList[arrayIndex1], casesList[arrayIndex2]);
    });
}


// Create function to update the Line Graph
function updateLineGraph(country1, country2) {
        // Destroy the previous chart instance before creating a new one
    if (line) {
        line.destroy();
    }
    let graphData = [];
    let lineAData = [];
    let lineBData = [];
    let years = Object.keys(country1.data.Years);
    let setA = Object.values(country1.data.Years);
    let setB = Object.values(country2.data.Years);

    line = new Chart("line", {
        type: "line",
        data: {
            labels: years,
            datasets: [{
              label: country1.Country,
              data: setA,
              fill: false,
              borderColor: 'rgb(255, 0, 0)',
              tension: 0.1,
            },
            {
                label: country2.Country,
                data: setB,
                fill: false,
                borderColor: 'rgb(0, 0, 255)',
                tension: 0.1
              }
            ],
          },
      });
}


// Other json files to use time permitting
// d3.json("Output/countries.json").then(function(data) {
//     let countries = data
//     console.log(data)
    
// });

// d3.json("Output/deaths.json").then(function(data) {
//     let deaths = data
//     console.log(data)
// });

// d3.json("Output/mortality.json").then(function(data) {
//    let mortality = data
//     console.log(data)
// });

// d3.json("Output/rates.json").then(function(data) {
//     let rates = data
//     console.log(data)
// });

