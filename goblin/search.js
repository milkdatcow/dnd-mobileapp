document.addEventListener("DOMContentLoaded", function () {
  const displaySearch = document.getElementById("results");
  const input = document.getElementById("searchInput");
  const typeSelect = document.getElementById("type-select");
  const crSelect = document.getElementById("cr-select");
  

  const displayData = () => {
    const query = input.value.toLowerCase();
    const selectedType = typeSelect.value;
    const selectedCR = crSelect.value;


    const filtered = data.monster.filter(m =>{
      const nameMatch = m.name.toLowerCase().includes(query);
      const typeMatch = !selectedType || m.type === selectedType;
      const crMatch = !selectedCR || m.challenge_rating === selectedCR;

      return nameMatch && typeMatch && crMatch;
  }); 

    filtered.sort((a, b) => a.name.localeCompare(b.name));

    const dataDisplay = filtered.map(monster => {
      const { name, type, challenge_rating } = monster;
      return `
        <div class="search-card">
          <p><a class="name" href="statblock.html?name=${encodeURIComponent(name)}">${name}</a></p>
          <p>${getMonsterType(monster)}</p>
          <p>${getCR(monster)}</p>
        </div>
      `;
    }).join("");

    displaySearch.innerHTML = dataDisplay;
  };

  displayData();
  input.addEventListener("input", displayData);
  typeSelect.addEventListener("change", displayData);
  crSelect.addEventListener("change", displayData);


  function getCR(monster) {
    return monster.challenge_rating || "Unknown";
  }

  function getMonsterType(monster) {
    return monster.type || "Unknown";
  }
});
