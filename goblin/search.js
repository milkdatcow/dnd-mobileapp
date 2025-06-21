document.addEventListener("DOMContentLoaded", function () {
  const displaySearch = document.getElementById("results");
  const input = document.getElementById("searchInput");

  const displayData = () => {
    const query = input.value;
    const lowerQuery = query.toLowerCase();

    const filtered = data.monster.filter(m =>
      m.name.toLowerCase().includes(lowerQuery)
    );

    filtered.sort((a, b) => a.name.localeCompare(b.name));

    const dataDisplay = filtered.map(monster => {
      const { name, type, cr} = monster;
      return `
        <div class="search-card">
          <p>${name}</p>
          <p>${type}</p>
          <p>${cr}</p>
        </div>
      `;
    }).join("");

    displaySearch.innerHTML = dataDisplay;
  };

  displayData();
  input.addEventListener("input", displayData);
});
