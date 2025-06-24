document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const monsterName = decodeURIComponent(params.get("name"));
  
  const stat = data.monster.find(m=>m.name === monsterName);

  if(!stat){
    document.body.innerHTML = `<p>${monsterName} not found</p>`;
  }

  function renderMonster(monster){
    const container = document.getElementById("statblock");

    const section = (title, content) =>`
      <div class="stat-section">
        <h3>${title}</h3>
        <p>${content}</p>
      </div>
      `;

      let html = `
      <a class="back-arrow" href="search.html"><svg class="back-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/></svg></a>
      <h1>${monsterName}</h1>
      ${monster.size && monster.type && monster.alignment ? section("", `${monster.size} ${monster.type}, ${monster.alignment}`) : ""}
      ${section("", formatAC(monster.armor_class))}
      ${section("", formatHP(monster.hit_points))}
      ${section("", formatSpeed(monster.speed))}
      ${section("", formatAbilities(monster))}
      ${monster.challenge_rating ? section("", formatCR(monster.challenge_rating)) : ""}
      ${monster.damage_vulnerabilities ? section("", formatVuln(monster.damage_vulnerabilities)) : ""}
      ${monster.damage_resistances ? section("", formatResist(monster.damage_resistances)) : ""}
      ${monster.damage_immunities ? section("", formatImm(monster.damage_immunities)) : ""}
      ${monster.condition_immunities ? section("", formatCondition(monster.condition_immunities)) : ""}
      ${monster.senses ? section("", formatSenses(monster.senses)) : ""}
      ${monster.languages ? section("", formatLanguage(monster.languages)) : "<strong>Languages:</strong> -"}
      ${monster.special_abilities ? section("", formatActions(monster.special_abilities)) : ""}
      ${monster.actions ? section("Actions", formatActions(monster.actions)) : ""}
      ${monster.legendary_actions ? section("Legendary Actions", formatActions(monster.legendary_actions)) : ""}
      `

    container.innerHTML = html;
    };

    renderMonster(stat);
});

function formatAC(ac){
  return (`<strong>Armour Class:</strong> ${ac}`)
}

function formatHP(hp){
  return (`<strong>Hit Points:</strong> ${hp}`)
}

function formatCR(cr){
  return (`<strong>Challenge Rating:</strong> ${cr}`)
}

function formatSpeed(speed) {
  if (typeof speed === "string") return `<strong>Speed:</strong> ${speed}`;
  return Object.entries(speed).map(([k, v]) => `${k}: ${v}`).join(", ");
}

function formatVuln(vuln){
  return (`<strong>Vulnerabilities:</strong> ${vuln}`)
}

function formatResist(resist){
  return (`<strong>Resistances:</strong> ${resist}`)
}

function formatImm(imm){
  return (`<strong>Immunities:</strong> ${imm}`)
}

function formatCondition(cond){
  return (`<strong>Condition Immunities:</strong> ${cond}`)
}

function formatSenses(senses){
  return (`<strong>Senses:</strong> ${senses}`)
}

function formatLanguage(language){
  return (`<strong>Languages:</strong> ${language}`)
}

function formatAbilities(monster) {
  return `<table>
          <tr>
            <th>STR</th>
            <th>DEX</th>
            <th>CON</th>
            <th>INT</th>
            <th>WIS</th>
            <th>CHA</th>
          </tr>
          <tr>
          <td>${monster.strength}</td>
          <td>${monster.dexterity}</td>
          <td>${monster.constitution}</td>
          <td>${monster.intelligence}</td>
          <td>${monster.wisdom}</td>
          <td>${monster.charisma}</td>
          </tr>
          </table>`
}

function formatActions(actions) {
  return actions.map(a => `<strong>${a.name}:</strong> ${a.desc}`).join("<br><br>");
}