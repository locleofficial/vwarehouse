const sideNav = document.querySelector(".sideNav");
const menuBtn_open = document.querySelector(".topNav__sideMenuToggle"); //here
const menuBtn_close = document.querySelector(".sideNav__sideMenuToggle"); //here

//new code
const sideNavContainer = document.querySelector(".sideNav-container"); //here
const sideNavCover = document.querySelector(".sideNav-cover");

const showSideNav = () => {
  sideNavContainer.classList.add("sideNav-active");
  sideNav.setAttribute("data-visible", true);
  if (window.innerWidth < 481) {
    sideNavContainer.style.top = "0";
    sideNavContainer.style.left = "0";
    sideNavContainer.style.right = "0";
    sideNavContainer.style.bottom = "0";
  } else {
    return;
  }
};

const hideSideNav = () => {
  sideNavContainer.classList.remove("sideNav-active");
  sideNav.setAttribute("data-visible", false);
};

menuBtn_open.addEventListener("click", () => {
  showSideNav();
});
menuBtn_open.addEventListener("mouseenter", () => {
  sideNavContainer.style.willChange = "opacity"; //hintBrowser(sideNavContainer) see matchList.js for hintBrowser() function
});

menuBtn_close.addEventListener("click", () => {
  hideSideNav();
  sideNavContainer.style.willChange = "auto"; //removeHint(sideNavContainer) see matchList.js for removeHint() function
});

sideNavCover.addEventListener("click", () => {
  hideSideNav();
  sideNavContainer.style.willChange = "auto"; //removeHint(sideNavContainer) see matchList.js for removeHint() function
});
