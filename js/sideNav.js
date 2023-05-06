//control sidenav
const mainMenuList = document.querySelector(".menuList_hold_mainOption");
const mainMenuOptions = document.querySelectorAll(".mainOption");
const homeOptions = document.querySelectorAll(".homeOption");

function slideToShowSubMenu(subMenuList) {
  mainMenuList.classList.add("menuList_translateX_left");
  subMenuList.classList.add("menuList_translateX");
}

function slideToHideSubMenu(subMenuList) {
  mainMenuList.classList.remove("menuList_translateX_left");
  subMenuList.classList.remove("menuList_translateX");
}

mainMenuOptions.forEach((mainOption) => {
  mainOption.addEventListener("click", (e) => {
    e.preventDefault();
    const subMenuId = e.currentTarget.getAttribute("href");
    const submenuList = document.querySelector(subMenuId);
    slideToShowSubMenu(submenuList);
  });
});

homeOptions.forEach((option) => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    const subMenuList = e.currentTarget.parentElement.parentElement;
    slideToHideSubMenu(subMenuList);
  });
});
