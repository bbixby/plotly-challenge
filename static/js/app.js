// Set the URL to import the data json
const url = "https://raw.githubusercontent.com/bbixby/plotly-challenge/master/data/samples.json";
var sampleData

// Fetch the JSON data and console log it
d3.json(url).then((data) => {
    var sampleData = data;
    console.log(sampleData);
    var metadata = data.metadata;
    console.log(metadata);
    var names = data.names;
    console.log(names);
    var samples = data.samples;
    console.log(samples);
});

// Pull options for Test Subject ID No dropdown
//function to init page and populate dropdown
function init() {
    // Grab a reference to the dropdown select element
    var dropdown = d3.select("#selDataset");
    //pull all IDs from names
    d3.json(url).then(function (IDs) {
        var IDs = IDs.names;
        IDs.forEach((id) => {
          dropdown
            .append("option")
            .text(id)
            .property("value", id);
        });
    //set the initial ID to the first name
    var firstID = IDs[0];
    //build the plots with the firstID
    buildDemos(firstID);
    });
};

function buildDemos(ID) {
    d3.json(url).then(function (data) {
    var metadata = data.metadata;
    //filter to get metadata for passed ID
    var filteredDemo = metadata.filter(metadataID => metadataID.id == ID)[0];
    //clear any previous metadata
    d3.select('#sample-metadata').html('');
    //add each key value pair from metaData
    Object.entries(filteredDemo).forEach(([key, value]) => {
        d3.select('#sample-metadata')
        .append('p').text(`${key}: ${value}`);
    });
    });
};

function optionChanged(newID) {
    //     // Fetch new data each time a new sample is selected
    buildDemos(newID);
  };

//run init to start
init();