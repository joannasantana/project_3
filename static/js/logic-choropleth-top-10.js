// Declare variables.
let myMap;
let geojson;

// Load json file using d3.
d3.json("Output/cases.json").then(function(data) {
  let cases = data;
  console.log(cases);
  // Load the geojson file using d3.
  d3.json("Resources/countries.geojson").then(function(data) {
    let geoData = data;
    console.log(geoData);
    // Run the function that combines json and geojson data.
    const combinedData = combineGeodataAndCases(geoData, cases);
    console.log(combinedData);
    // Find the html element that corresponds to the dropdown.
    var dropDown=document.getElementById("selYear");
    // Create the top 10 list initially.
    updatetop10list(2000,cases);
    // Create the map initially.
    createChoropleth(combinedData, 2000);
    // Run function that will update the top 10 list and map when selected year changes by dropdown interaction.
    dropDown.onchange=function (){
    // Remove previous instance of the map.
      if (myMap && myMap.remove) {
          myMap.off();
          myMap.remove();
      }
      // Update the map.
      createChoropleth(combinedData, dropDown.value);
      // Update the top 10 list.
      updatetop10list(dropDown.value, cases);
    } 
  });
});

// Create a function to combine both datasets with the cases data populating under features.properties.
function combineGeodataAndCases(geoData, casesData) {
  const combinedData = [];
  geoData.features.forEach((feature) => {
    const countryName = feature.properties.ADMIN;
    if (countryName in casesData) {
      const countryInfo = casesData[countryName];
      feature.properties.cases = countryInfo;
      combinedData.push(feature);
    }
  });
  // Make sure data still returns in geojson format.
  return {
    "type": "FeatureCollection",
    "features": combinedData
  };
}

// Create a function that will generate the choropleth map.
function createChoropleth(data, chosenYear) {
  // Creating the map object
  myMap = L.map("map", {
    center: [40.52, 34.34],
    zoom: 1.4
    });
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
  // Create a new choropleth layer. 
  geojson = L.choropleth(data, {
    // Define which property in the features to use. Make sure the data type is "number".
    valueProperty: function(feature) {
      return Number(feature.properties.cases.Years[chosenYear]);
    },
    // Set the color scale.
    scale: ["#ffffb2", "#b10026"],    
    // The number of breaks in the step range
    steps: 15,
    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },
    // Binding a popup for when you click on a country.
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.ADMIN + "</strong><br /><br />Number of Malaria cases: " +
      feature.properties.cases.Years[chosenYear]);
    }
  }).addTo(myMap);
  // Set up the legend.
  let legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend");
    let limits = geojson.options.limits;
    let colors = geojson.options.colors;
    let labels = [];
    // Add the minimum and maximum.
    let legendInfo = "<h5>Number of Malaria Cases</h5>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";
    div.innerHTML = legendInfo;
    // Get the colors to correspond to the values.
    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });
    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };
  // Adding the legend to the map.
  legend.addTo(myMap);
};

// Create the function toupdate top 10 list.
function updatetop10list(chosenYear, data){
  var casesList = []
  let list = document.getElementById("top10list");
  list.innerHTML='';
  // For loop that creates a list of dictionaries.
  for(var i in data) {
      var key = i;
      if( key != "Country") {
      var caseAmount = data[i]["Years"][chosenYear];
      let currentDict = {
          "country" : key,
          "numCases" : caseAmount
      };
      casesList.push(currentDict);
      };
  }
  // Sort by the number of cases.
  casesList.sort(function(a,b){
      return b.numCases - a.numCases;
  })
  // Create the list elements for the top 10 list.
  for(let i = 0; i < 10; i++){
      let li = document.createElement("li");
      li.appendChild(
      document.createTextNode(`${casesList[i]["country"]} (${casesList[i]["numCases"]})`));
      list.appendChild(li);
  }
}