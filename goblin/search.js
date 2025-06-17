document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");

  function getMonsterType(monster) {
  if (typeof monster.type === "string") {
    return monster.type;
  } else if (typeof monster.type === "object" && monster.type.type) {
    const mainType = monster.type.type;
    const subTypes = Array.isArray(monster.type.tags) && monster.type.tags.length
      ? ` (${monster.type.tags.join(", ")})`
      : "";
    return mainType + subTypes;
  } else if (Array.isArray(monster.type)) {
    return monster.type.join(", ");
  }
  return "Unknown";
}

  function renderResults(filtered) {
    resultsContainer.innerHTML = ""; // Clear previous
    if (filtered.length === 0) {
      resultsContainer.innerHTML = "<p>No monsters found.</p>";
      return;
    }

    filtered.forEach(monster => {
      const div = document.createElement("div");
      div.classList.add("monster-card");
      div.innerHTML = `
        <h2>${monster.name}</h2>
        <p><strong>CR:</strong> ${monster.cr}</p>
        <p><strong>Type:</strong> ${getMonsterType(monster)}</p>
        <p><strong>Source:</strong> ${monster.source}</p>
      `;
      resultsContainer.appendChild(div);
    });
  }

  function searchMonsters(query) {
    const lowerQuery = query.toLowerCase();
    const filtered = monsters.monster.filter(m => {
      const type = String(getMonsterType(m)).toLowerCase();
      return (
        m.name.toLowerCase().includes(lowerQuery) ||
        type.includes(lowerQuery)
      );
    });
    renderResults(filtered);
  }

  searchInput.addEventListener("input", e => {
    searchMonsters(e.target.value);
  });

  // Load all by default
  renderResults(monsters.monster);
});
