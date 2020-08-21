const url = "https://raw.githubusercontent.com/bbixby/plotly-challenge/master/data/samples.json";
var sampleData

// Fetch the JSON data and console log it
d3.json(url).then(function(response) {
    sampleData = response;
    console.log(response);
});