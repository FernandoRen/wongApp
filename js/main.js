let menuHamburguesa = document.querySelector(".hamburguesa-logo");
let menuLista = document.querySelector(".menu-lista");
let closeIcon = document.querySelector(".close-icon");
menuHamburguesa.addEventListener("click", ()=>{
    menuLista.style.display= "flex";
    menuHamburguesa.style.display = "none";
});

closeIcon.addEventListener("click", () => {
    menuLista.style.display= "none";
    menuHamburguesa.style.display = "block";
})
