// Declare variables and empty list for loading json data into.
let casesListLine = [];
let line;

// Load json data using d3.
d3.json("Output/cases.json").then(function(data) {
   let casesLine = data;
    for(var i in casesLine) {
        var key = i;
        let graphDict = {
            "Country": key,
            "data": casesLine[i]
        };
        // We only want data from countries that have all 22 years in their dataset. Filter out countries that don't have 22 Years.
        if (casesLine[i].Years && Object.keys(casesLine[i].Years).length === 22) {
            casesListLine.push(graphDict);
        }
    }
    // Run the function that populates the two dropdown with country names
    populateDropdown();
    // Run the function to create the line graph initially
    updateLineGraph(casesListLine[0], casesListLine[0]);
});

// Assign location of dropdown menus using d3.select.
let selDataset1 = d3.select("#selDataset1");
let selDataset2 = d3.select("#selDataset2");

// Create the function that will populate the dropdown window.
function populateDropdown() {
    casesListLine.forEach(function (val) {
        let country = val.Country;
        // Populate the dropdown menu with country names
        selDataset1.append("option").attr("value", country).text(country);
        selDataset2.append("option").attr("value", country).text(country);
    });
    // Function that updates the line graph when dropdown #1 selection changes.
    selDataset1.on("change", function () {
        let newSelection1 = this.value;
        let arrayIndex1 = casesListLine.findIndex(x => x.Country == newSelection1);
        // Get the value of the second dropdown
        let newSelection2 = selDataset2.node().value; 
        let arrayIndex2 = casesListLine.findIndex(x => x.Country == newSelection2);
        // Run the function that updates the line graph with newly selected data.
        updateLineGraph(casesListLine[arrayIndex1], casesListLine[arrayIndex2]);
    });
    // Function that updates the line graph when dropdown #2 selection changes.
    selDataset2.on("change", function () {
        let newSelection2 = this.value;
        let arrayIndex2 = casesListLine.findIndex(x => x.Country == newSelection2);
        // Get the value of the first dropdown.
        let newSelection1 = selDataset1.node().value; 
        let arrayIndex1 = casesListLine.findIndex(x => x.Country == newSelection1);
        // Run the function that updates the line graph with newly selected data.
        updateLineGraph(casesListLine[arrayIndex1], casesListLine[arrayIndex2]);
    });
}

// Create function to update the line graph.
function updateLineGraph(country1, country2) {
    // Destroy the previous chart instance before creating a new one
    if (line) {
        line.destroy();
    }
    // Save values for y axis into a variable.
    let years = Object.keys(country1.data.Years);
    // Save values for each dataset's x axis.
    let setA = Object.values(country1.data.Years);
    let setB = Object.values(country2.data.Years);
    // Create the line chart.
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