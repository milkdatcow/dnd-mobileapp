const typeOptions =["aberration","beast","celestial","construct","dragon","elementals","fey","fiend","giant","humanoid","monstrosity","ooze","plant","undead"];
const crOptions=["0","1/8","1/4","1/2","1","2","3","4","5","6","7","8","9","10","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30"];

const typeSelect = document.getElementById("type-select");
const crSelect = document.getElementById("cr-select");

typeOptions.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeSelect.appendChild(option);
});

crOptions.forEach(cr => {
    const option = document.createElement("option");
    option.value = cr;
    option.textContent = cr;
    crSelect.appendChild(option);
});