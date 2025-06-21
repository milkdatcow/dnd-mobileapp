document.addEventListener("DOMContentLoaded", function () {
  const displaySearch = document.getElementById("results");
  const input = document.getElementById("searchInput");

  const displayData = () => {
    const query = input.value.toLowerCase();

    const filtered = data.monster.filter(m =>
      m.name.toLowerCase().includes(query)
    );

    filtered.sort((a, b) => a.name.localeCompare(b.name));

    const dataDisplay = filtered.map(monster => {
      const { name, type, challenge_rating } = monster;
      return `
        <div class="search-card">
          <p class="name">${name}</p>
          <p>${getMonsterType(monster)}</p>
          <p>${getCR(monster)}</p>
        </div>
      `;
    }).join("");

    displaySearch.innerHTML = dataDisplay;
  };

  displayData();
  input.addEventListener("input", displayData);

  function getCR(monster) {
    return monster.challenge_rating || "Unknown";
  }

  function getMonsterType(monster) {
    return monster.type || "Unknown";
  }
});
