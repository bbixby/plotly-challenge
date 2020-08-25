// Set the URL to import the data json
const url = "https://raw.githubusercontent.com/bbixby/plotly-challenge/master/data/samples.json";

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

// Initialize page with Test Subject ID dropdown options and display data for first ID
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
    buildPlots(firstID);
    });
};

//Populate the Demographic Info section based on selected ID
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

function buildPlots(ID) {
    d3.json(url).then(function(plotData) {
        //filter samples data to ID for plotting
        var samplePlot = plotData.samples.filter(plotID => plotID.id == ID)[0];
        //console.log(samplePlot);
        //slice top 10 of each samples data: otu_ids, otu_labels, and sample_values
        var slice_otu_ids = samplePlot.otu_ids.slice(0, 10);
        var slice_otu_labels = samplePlot.otu_labels.slice(0, 10);
        var slice_sample_values = samplePlot.sample_values.slice(0, 10);
        
        //BAR CHART plot
        var traceBar = {
            type: 'bar',
            x: slice_sample_values.reverse(),
            y: slice_otu_ids.reverse(),
            text: slice_otu_labels.reverse(),
            marker: {
                color: '#1978B5',
              },
            orientation: 'h'
        };

        var barData = [traceBar];

        var barLayout = {
            title: 'Top 10 OTU Results',
            showlegend: false
        };

        Plotly.newPlot('bar', barData, barLayout);
        console.log(barData);
    });
};

//on ID dropwdown change, rebuild plots
function optionChanged(newID) {
    //     // Fetch new data each time a new sample is selected
    buildDemos(newID);
    buildPlots(newID);
  };

//run init to start
init();