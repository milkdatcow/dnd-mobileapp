document.addEventListener("DOMContentLoaded", () => {
  //input box and the results container
  const searchInput = document.getElementById("searchInput");
  const resultsContainer = document.getElementById("results");

  let filteredResults = [];
  let currentIndex = 0;
  const PAGE_SIZE = 50;

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

  function formatCR(cr) {
    if (typeof cr === "object") {
      return Object.values(cr).join(", ");
    }
    return cr;
  }

  function renderNextPage() {
    const nextPage = filteredResults.slice(currentIndex, currentIndex + PAGE_SIZE);
    nextPage.forEach(monster => {
      const div = document.createElement("div");
      div.classList.add("monster-card");
      div.innerHTML = `
        <p>${monster.name}</p>
        <p>${formatCR(monster.cr)}</p>
        <p>${getMonsterType(monster)}</p>
      `;
      resultsContainer.appendChild(div);
    });
    currentIndex += PAGE_SIZE;
  }

  function searchMonsters(query) {
    const lowerQuery = query.toLowerCase();
    filteredResults = monsters.monster.filter(m => {
      const type = String(getMonsterType(m)).toLowerCase();
      const cr = m.cr ? String(formatCR(m.cr)).toLowerCase() : "";

      return (
        m.name.toLowerCase().includes(lowerQuery) ||
        type.includes(lowerQuery) ||
        cr.includes(lowerQuery)
      );
    });

    filteredResults.sort((a, b) => a.name.localeCompare(b.name));
    resultsContainer.innerHTML = "";
    currentIndex = 0;
    renderNextPage();
  }

  searchInput.addEventListener("input", e => {
    searchMonsters(e.target.value);
  });

  // Load all by default
  filteredResults = [...monsters.monster].sort((a, b) => a.name.localeCompare(b.name));
  renderNextPage();

  // Infinite scroll
  window.addEventListener("scroll", () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 100) {
      renderNextPage();
    }
  });
});
