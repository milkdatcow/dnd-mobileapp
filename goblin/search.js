document.addEventListener("DOMContentLoaded", async () => {
  const response = await fetch("/data/monsters.json");
  const data = await response.json();
  const monsters = data.monster;

  const input = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");

  input.addEventListener("input", () => {
    const query = input.value.toLowerCase();
    const filtered = monsters.filter(m => m.name.toLowerCase().includes(query));
    renderResults(filtered);
  });

  function renderResults(monsters) {
    resultsContainer.innerHTML = ""; // Clear old results
    if (monsters.length === 0) {
      resultsContainer.innerHTML = "<p>No matches found.</p>";
      return;
    }

    monsters.forEach(monster => {
      const el = document.createElement("div");
      el.className = "monster-card";
      el.innerHTML = `
        <h2>${monster.name}</h2>
        <p><strong>CR:</strong> ${monster.cr}</p>
        <p><strong>Type:</strong> ${monster.type?.type || "?"}</p>
        <p><strong>AC:</strong> ${monster.ac?.[0]?.ac || "?"}</p>
        <p><strong>HP:</strong> ${monster.hp?.average || "?"}</p>
      `;
      resultsContainer.appendChild(el);
    });
  }
});
