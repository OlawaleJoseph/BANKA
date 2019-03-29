const sideNav = document.querySelector(".nav-menu");

const sideNavs = () => {
    const closeBtn = document.querySelector("#close-btn");
    const openSideNav = document.querySelector("#side-nav");

    closeBtn.addEventListener("click", () => {
        sideNav.style.width = 0;
    });
    
    openSideNav.addEventListener("click", () => {
        sideNav.style.width = "100%";
    })
}

const sideNavigation = () => {
    
    const sideNavLinks = document.querySelectorAll(".side-nav-link");

    sideNavLinks.forEach(link => {
        link.addEventListener("click", () => {
            if(window.innerWidth < 768){
                sideNav.style.width = 0;
            }
            else{
                sideNav.style.width = "100%";
            }
        })
    });
}

const run = () => {
    sideNavs();
    sideNavigation();
}

run();