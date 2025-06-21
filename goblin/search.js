//When the page loads
document.addEventListener("DOMContentLoaded", function() {

  const displaySearch = document.getElementById("results");
  const input = document.getElementById("searchInput");


  const displayData = async () =>{
    let query = input.value;
    console.log("query: ", query);


    let dataDisplay = data.monster.filter((eventData)=>{
      if (query === ""){return eventData}
      else if (eventData.name.toLowerCase().includes(query.toLowerCase())){return eventData}
    }).map((object)=>{
      const { name, cr, source} = object;

      return `
      <div class="search-card">
        <p>${name}</p>
        <p>${cr}</p>
        <p>${source}</p>
      </div>
      `
    }).join("");

    displaySearch.innerHTML = dataDisplay;
    
  }

input.addEventListener("input", displayData);

});



//Get the search from the search bar

//Filter through json file to find a match

//Display results in a list.





