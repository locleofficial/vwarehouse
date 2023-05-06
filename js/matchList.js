// rename to autoComplete_matchList.js
// take user's input from searchbar then provide a list of matching results (eventListener = input)

const search = document.getElementById("search");
const searchBtn = document.getElementById("submitSearch");
const matchList = document.getElementById("match-list");

const body = document.querySelector("body");
const topNav = document.querySelector(".topNav");
const topNavCover = document.querySelector(".topNav-cover");

//unavailable.html
const searchText = document.getElementById("searchText");
const searchAgainBtn = document.getElementById("searchAgainBtn");

const searchItemsForMatchList = async (searchText) => {
  //---same code as searchItemsOnSubmit()---//
  const res = await fetch("/database/items.json");
  const items = await res.json();

  let matches = items.availableItems.filter((item) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return (
      item.name.match(regex) ||
      item.type.match(regex) ||
      item.shortName.match(regex) ||
      item.brand.match(regex)
    );
  });
  //---same code as searchItemsOnSubmit()---//
  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  } else {
    matches.sort((a, b) => {
      return a.name.length - b.name.length;
    });
    if (window.innerWidth <= 481) {
      outputHtmlNoImage(matches);
    } else {
      outputHtmlWithImage(matches);
    }
  }
};

const searchItemsOnSubmit = async (searchText) => {
  //---same code as searchItemsForMatchList()---//
  const res = await fetch("/database/items.json");
  const items = await res.json();

  let matches = items.availableItems.filter((item) => {
    const regex = new RegExp(`${searchText}`, "gi");
    return (
      item.name.match(regex) ||
      item.type.match(regex) ||
      item.shortName.match(regex) ||
      item.brand.match(regex)
    );
  });
  //---same code as searchItemsForMatchList()---//
  if (searchText.length === 0) {
    matches = [];
  } else if (matches.length === 0) {
    sessionStorage.setItem("invalidSearchText", searchText);
    window.location.href = items.unavailableItems[0].url;
  } else {
    matches.sort((a, b) => {
      return a.name.length - b.name.length;
    });
    let firstMactchingUrl = matches
      .map((item, index) => {
        if (index === 0) {
          return item.url;
        } else {
          return;
        }
      })
      .join("");
    window.location.href = firstMactchingUrl;
  }
};

const outputHtmlNoImage = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <li class="match-item-container">
          <a class="match-item" href="${match.url}">
              <div class="match-item__text">
                  <small class="match-item__text-brand">${match.brand}</small>
                  <p class="match-item__text-name txt-font-default">${match.name}</p>
              </div>
          </a>
        </li>
            `
      )
      .join("");

    matchList.innerHTML = html;
  }
};

const outputHtmlWithImage = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
        <li class="match-item-container">
          <a class="match-item" href="${match.url}">
              <picture><img width="80" height="80" class="match-item__img" src="${match.thumbnail}" alt="${match.name}">
              </picture>
              <div class="match-item__text">
                  <small class="match-item__text-brand">${match.brand}</small>
                  <p class="match-item__text-name txt-font-default">${match.name}</p>
              </div>
          </a>
        </li>
            `
      )
      .join("");
    matchList.innerHTML = html;
  }
};

const initializeCover = (cover) => {
  let topNavHeight = 0;
  let bodyHeight = 0;
  let topNavCoverHeight = 0;
  bodyHeight = body.clientHeight;
  topNavHeight = topNav.clientHeight;
  topNavCoverHeight = bodyHeight - topNavHeight;
  cover.style.height = topNavCoverHeight.toString() + "px";
  cover.style.top = topNavHeight.toString() + "px";
  if (window.innerWidth < 481) {
    cover.style.left = 0;
    cover.style.right = 0;
    cover.style.bottom = 0;
  }
};

const activateCover = (cover) => {
  matchList.classList.add("matchList-active");
  cover.classList.add("topNavCover-active");
};
const deactivateCover = (cover) => {
  matchList.classList.remove("matchList-active");
  cover.classList.remove("topNavCover-active");
};

const hintBrowser = (element) => {
  element.style.willChange = "opacity";
};
const removeHint = (element) => {
  element.style.willChange = "auto";
};

window.addEventListener("load", () => {
  initializeCover(topNavCover);
});

window.addEventListener("resize", () => {
  initializeCover(topNavCover);
});

search.addEventListener("input", () => {
  searchItemsForMatchList(search.value);
});

search.addEventListener("keyup", (e) => {
  if (e.key === "Enter" || e.keyCode === 13) {
    searchItemsOnSubmit(search.value);
  }
});
searchBtn.addEventListener("click", () => {
  searchItemsOnSubmit(search.value);
});

search.addEventListener("focus", () => {
  activateCover(topNavCover);
});

search.addEventListener("mouseenter", () => {
  hintBrowser(matchList);
  hintBrowser(topNavCover);
});
topNavCover.addEventListener("click", () => {
  deactivateCover(topNavCover);
  removeHint(matchList);
  removeHint(topNavCover);
});

//return searchText for unavailable.html
window.addEventListener("load", () => {
  let invalidSearchText = sessionStorage.getItem("invalidSearchText");
  searchText.innerHTML = invalidSearchText;
});

//focus on searchbar when clicked on searchAgainBtn
searchAgainBtn.addEventListener("click", () => {
  search.focus();
});
