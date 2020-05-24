// Import the data from data.js.
const tableData = data;

// Reference the HTML table using d3.
var tbody = d3.select("tbody");


function buildTable(data) {
  // Clear out any existing data.
  tbody.html("");
  
  // Loop through each object in the data, append a row and cells for each value in the row.
  data.forEach((dataRow) => {
    // Append a row to the table body.
    let row = tbody.append("tr");
  
    // Loop through each field in the dataRow and add each value as a table cell (td).
    Object.values(dataRow).forEach((val) => {
      let cell = row.append("td");
      cell.text(val);
    });
  });
};


var filters = {};

function updateFilters() {
  console.log("Entering updateFilters");
  
  // Save the value and id of the filter that was changed.
  elementId = this.id;
  elementValue = this.value;
 
  // If a filter value was entered then add that filterId and value
  // to the filters list. Otherwise, clear that filter from the filters object.
  if (elementValue) {
    filters[elementId] = elementValue;
  } else {
    delete filters[elementId]
  };
  
  console.log(filters);

  // Call function to apply all filters and rebuild the table.
  filterTable(filters);
}

function filterTable(filters) {
  console.log("Entering filterTable");
  // Set the filtered data to the table.
  let filteredData = tableData;
    
  // Loop through all of the filters (keys) and filter the data where it matches the value.
  Object.keys(filters).forEach((filterKey) => {
    console.log(filterKey)
    filteredData = filteredData.filter(row => row[filterKey] === filters[filterKey]);
  });

  console.log(filteredData);
    
  // Rebuild the table.
  buildTable(filteredData);
}

// Attach an event listener to pick up changes that are made to each filter.
d3.selectAll(".change-input").on("change", updateFilters);

// Build the table when the page loads.
buildTable(tableData);