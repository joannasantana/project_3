d3.json("Output/cases.json").then(function(data) {
   let cases = data
    console.log(data)
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
