const links = document.querySelectorAll(".links");
const divs = document.querySelectorAll(".displayDivs")
const bars = document.querySelector("#bars");
const sidemenu = document.querySelector("#side-navbar");
const closeBtn =document.querySelector("#close-btn");

links.forEach(link => {
    link.addEventListener("click", function (){
        divs.forEach(function (div){
            div.style.display = "none"
        });
        const id = this.getAttribute("data-target");
        console.log(location.hash)
        document.querySelector(id).style.display ="block";
        sidemenu.classList.remove("show")
    })
});


const side = () => {
    bars.addEventListener("click", () => {
        sidemenu.classList.add("show")
    })

    closeBtn.addEventListener("click", () => {
        sidemenu.classList.remove("show")
    })
}


side();