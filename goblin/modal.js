const modalHide = document.getElementById("hide");
const closeBtn = document.getElementById("close-modal");
const menu = document.getElementById("open-modal");
const modal = document.getElementById("modal-backdrop");

function openModal(){
    modalHide.classList.remove("hidden");
}

function closeModal(){
    modalHide.classList.add("hidden");
}

closeBtn.addEventListener("click", closeModal);

modal.addEventListener("click", (e)=>{
    if(e.target === modal){
        closeModal();
    }
})

document.addEventListener("keydown", (e)=>{
    if(e.key === "Escape"){
        closeModal();
    }
})

menu.addEventListener("click", openModal);