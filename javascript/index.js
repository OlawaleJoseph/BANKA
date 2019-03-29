const loginForm = document.querySelector("#login-form");
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

const loginFormDisplay = () => {
    const openLoginForm = document.querySelector("#login-btn");
    const closeLoginForm = document.querySelector("#close-login-form")
    
    openLoginForm.addEventListener("click", (event) =>{
        event.preventDefault();
        event.stopPropagation();
        loginForm.style.display = "block";

    });

    closeLoginForm.addEventListener("click", () => {
        loginForm.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if(!loginForm.contains(event.target)){
            loginForm.style.display = "none"
        }
        
    }, false)
}


const run = () => {
    sideNavs();
    sideNavigation();
    loginFormDisplay();
}

run();