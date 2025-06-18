document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const monsterName = decodeURIComponent(params.get("name"));

  if (!monsterName || !monsters || !monsters.monster) {
    document.getElementById("statblock").innerHTML = "<p>Monster not found.</p>";
    return;
  }

  const monster = monsters.monster.find(m => m.name === monsterName);

  if (!monster) {
    document.getElementById("statblock").innerHTML = "<p>Monster not found.</p>";
    return;
  }

  function getType(m) {
    if (typeof m.type === "string") return m.type;
    if (typeof m.type === "object" && m.type.type)
      return m.type.type + (m.type.tags?.length ? ` (${m.type.tags.join(", ")})` : "");
    return "Unknown";
  }

  function formatCR(cr) {
    return typeof cr === "object" ? Object.values(cr).join(", ") : cr;
  }

  function formatAC(ac) {
    if (Array.isArray(ac)) {
      return ac.map(a => a.ac).join(", ");
    }
    return ac;
  }

  function formatSpeed(speed) {
    if (typeof speed === "string") return speed;
    return Object.entries(speed)
      .map(([k, v]) => `${k} ${v}`)
      .join(", ");
  }

  function renderEntries(title, items = []) {
    if (!items.length) return "";
    return `
      <h2>${title}</h2>
      <ul>
        ${items
          .map(
            item => `
          <li>
            <strong>${item.name}.</strong>
            ${Array.isArray(item.entries) ? item.entries.join(" ") : item.entries}
          </li>
        `
          )
          .join("")}
      </ul>
    `;
  }

  const statblock = document.getElementById("statblock");

  statblock.innerHTML = `
    <h1>${monster.name}</h1>
    <p><strong>CR:</strong> ${formatCR(monster.cr)}</p>
    <p><strong>Type:</strong> ${getType(monster)}</p>
    <p><strong>Source:</strong> ${monster.source}</p>
    <p><strong>Size:</strong> ${monster.size}</p>
    <p><strong>Alignment:</strong> ${monster.alignment?.join(", ")}</p>
    <p><strong>HP:</strong> ${monster.hp?.average} (${monster.hp?.formula})</p>
    <p><strong>AC:</strong> ${formatAC(monster.ac)}</p>
    <p><strong>Speed:</strong> ${formatSpeed(monster.speed)}</p>
    <p><strong>STR/DEX/CON/INT/WIS/CHA:</strong>
      ${monster.str} / ${monster.dex} / ${monster.con} / ${monster.int} / ${monster.wis} / ${monster.cha}
    </p>
  `;

  statblock.innerHTML += renderEntries("Traits", monster.trait || []);
  statblock.innerHTML += renderEntries("Actions", monster.action || []);
  statblock.innerHTML += renderEntries("Reactions", monster.reaction || []);
  statblock.innerHTML += renderEntries("Legendary Actions", monster.legendary || []);
  statblock.innerHTML += renderEntries("Lair Actions", monster.lairAction || []);
  statblock.innerHTML += renderEntries("Regional Effects", monster.regional || []);
});
