// Declare variables
let myMap;
let geojson;

// Load json file
d3.json("Output/cases.json").then(function(data) {
  let cases = data;
  console.log(data)
  // Load the geojson file
  d3.json("Resources/countries.geojson").then(function(data) {
    let geoData = data;
    console.log(data)
    const combinedData = combineGeodataAndCases(geoData, cases)
    console.log(combinedData)
    // Creating the map object
    myMap = L.map("map", {
    center: [40.52, 34.34],
    zoom: 1.4
    });
    // Adding the tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(myMap);
    console.log("tileLayer")
    var dropDown=document.getElementById("selYear");
    createChoropleth(combinedData, 2000)
    dropDown.onchange=function (){
    createChoropleth(combinedData, dropDown.value)
    }
    
  });

});

// Create a function to combine both datasets with the cases data populating under features.properties
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

  return {
    "type": "FeatureCollection",
    "features": combinedData
  };
}

// Get the data with d3.
function createChoropleth(data, chosenYear) {
  console.log(data)
  // Create a new choropleth layer. 
  console.log(geojson);
  geojson = L.choropleth(data, {

    // Define which property in the features to use.
    valueProperty: function(feature) {
      return feature.properties.cases.Years[chosenYear]
    },

    // Set the color scale.
    scale: ["#ffffb2", "#b10026"],

    // The number of breaks in the step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.8
    },

    // Binding a popup to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<strong>" + feature.properties.ADMIN + "</strong><br /><br />Number of Malaria cases: " +
      feature.properties.cases.Years[chosenYear]);
    }
  }).addTo(myMap);
  console.log(geojson);

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

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding the legend to the map
  legend.addTo(myMap);
};
