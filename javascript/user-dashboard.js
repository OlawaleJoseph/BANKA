const closeBtn = document.querySelector("#close-btn");
const sideNav = document.querySelector("#side-menu");
const openSideNav = document.querySelector("#bars");
const links = document.querySelectorAll('.nav-links');
const divs = document.querySelectorAll('.display-div');

const openNcloseSideNav = () => {
    closeBtn.addEventListener("click", () => {
        sideNav.style.display = "none";
    });
    
    openSideNav.addEventListener("click", () => {
        sideNav.style.display = "block";
    })
}

const sideMenu = function(){
    links.forEach(function(link){
        link.addEventListener("click", function(){
            divs.forEach(function(div){
                div.style.display = "none";
            });
            const id = this.getAttribute("data-id");
            if(id == '#transaction'){
                document.querySelector(id).style.display = "grid";
                if(window.innerWidth < 768){
                    sideNav.style.display = "none";
                }
            }else{
                document.querySelector(id).style.display = "block";
                if(window.innerWidth < 768){
                    sideNav.style.display = "none";
                }
            }
            
            
    
        });
    })
}


const run = () => {
    openNcloseSideNav();
    sideMenu();

}

run();

   