//control thumbnailSlider to auto resize depending on imageSection's size
const thumbnailSlider = document.querySelector(".thumbnail");
const thumbnailContainer = document.querySelector(".thumbnail-flex");
const thumbnailImages = document.querySelectorAll(".thumbnail__img"); //fix here to => <a>
const thumbnailImage = document.querySelector(".thumbnail-flex > li"); //fix here change thumbnail list
const imageSection = document.querySelector(".item-flex__image-item");
const thumbnailLinks = document.querySelectorAll(".thumbnail__link");
const imageBox = document.querySelector(".item-card__imgBox");
const imageBox_rect = imageBox.getBoundingClientRect();
const imageBox_image = document.querySelector(".item-card__img");

const prev_btn = document.querySelector(".thumbnail__prev");
const next_btn = document.querySelector(".thumbnail__next");

const iframe = document.getElementById("fullSizeImageIframe");

//---code for: scrolling thumbnail_container---//
let xCurrentScrollPosition = 0;
let thumbnailContainer_width_noBorder = thumbnailContainer.clientWidth;
let leftScrollDistance = xCurrentScrollPosition; //start point
let rightScrollDistance =
  xCurrentScrollPosition + thumbnailContainer_width_noBorder; //end point

function resizeThumbnailContainer() {
  let imageSection_width = imageSection.offsetWidth;
  let thumbnailSlider_width = thumbnailSlider.offsetWidth;
  let thumbnailContainer_width = thumbnailContainer.offsetWidth;
  let thumbnailImage_width = thumbnailImage.offsetWidth;
  let thumbnailSliderPlusImage_width =
    thumbnailSlider_width + thumbnailImage_width;

  if (thumbnailSlider_width >= imageSection_width) {
    let tempThumbnailSlider_width = thumbnailSlider.offsetWidth;
    let allocatedImage_width = 0;
    while (tempThumbnailSlider_width >= imageSection_width) {
      allocatedImage_width += thumbnailImage_width;
      tempThumbnailSlider_width -= thumbnailImage_width;
    }
    let updateWidth = thumbnailContainer_width - allocatedImage_width;
    let updateWidth_text = updateWidth.toString() + "px";
    thumbnailContainer.style.width = updateWidth_text;
  } else if (
    thumbnailSliderPlusImage_width < imageSection_width &&
    isOverflown(thumbnailContainer)
  ) {
    let tempThumbnailSlider_width =
      thumbnailSlider.offsetWidth + thumbnailImage_width;
    let allocatedImage_width = 0;
    while (tempThumbnailSlider_width < imageSection_width) {
      allocatedImage_width += thumbnailImage_width;
      tempThumbnailSlider_width += thumbnailImage_width;
    }
    let updateWidth = thumbnailContainer_width + allocatedImage_width;
    let updateWidth_text = updateWidth.toString() + "px";
    thumbnailContainer.style.width = updateWidth_text;
  }
}

let thumbnailContainer_scrollWidth = thumbnailContainer.scrollWidth;
let nextprevButtonExist = false;
let nextButtonExist = false;
let prevButtonExist = false;
//---code for: scrolling thumbnail_container---//

function isOverflown(element) {
  return element.scrollWidth > element.clientWidth;
}
let resetScrollPosition = (element) => {
  element.scrollTo(0, 0);
};

//---code for: zooming in and out after clicking on imageBox item.html---//
function zoomIn(x, y) {
  imageBox.style.overflow = "auto"; // support for safari
  imageBox_image.classList.add("zoom-in");
  imageBox.scrollTo(x, y);
}

function zoomOut() {
  imageBox.style.overflow = "hidden"; // support for safari
  imageBox_image.classList.remove("zoom-in");
  imageBox.scrollTo(0, 0);
}
//---------------------------------------------//

window.addEventListener("load", () => {
  //code for: resizing width of thumbnail_slider
  resizeThumbnailContainer();

  //code for: scrolling thumbnail_container (Update thumbnailContainer after resizing)
  thumbnailContainer_width_noBorder = thumbnailContainer.clientWidth;

  //code for: reset thumbnail slider
  resetScrollPosition(thumbnailContainer);
  if (isOverflown(thumbnailContainer)) {
    next_btn.classList.add("button-appear");
  } else {
    return;
  }
});

window.addEventListener("resize", () => {
  let imageSection_width = imageSection.offsetWidth;
  let thumbnailSlider_width = thumbnailSlider.offsetWidth;
  let thumbnailImage_width = thumbnailImage.offsetWidth;
  let thumbnailSliderPlusImage_width =
    thumbnailSlider_width + thumbnailImage_width;

  if (thumbnailSlider_width >= imageSection_width) {
    window.location.reload();
  } else if (
    thumbnailSliderPlusImage_width < imageSection_width &&
    isOverflown(thumbnailContainer)
  ) {
    window.location.reload();
  }
});

//code for: button that control scrolling contents of thumbnail_container
prev_btn.addEventListener("click", () => {
  if (isOverflown(thumbnailContainer)) {
    xCurrentScrollPosition -= thumbnailContainer_width_noBorder;
    rightScrollDistance =
      xCurrentScrollPosition + thumbnailContainer_width_noBorder;
    leftScrollDistance = xCurrentScrollPosition;
    thumbnailContainer.scrollTo(xCurrentScrollPosition, 0);
  }
  //console.log("thumbnailContainer_width_noBorder:", thumbnailContainer_width_noBorder);
  //console.log("xCurrentScrollPosition:", xCurrentScrollPosition);
});
next_btn.addEventListener("click", () => {
  if (isOverflown(thumbnailContainer)) {
    xCurrentScrollPosition += thumbnailContainer_width_noBorder;
    rightScrollDistance =
      xCurrentScrollPosition + thumbnailContainer_width_noBorder;
    leftScrollDistance = xCurrentScrollPosition;
    thumbnailContainer.scrollTo(xCurrentScrollPosition, 0);
  }
});

//code for: showing and removing next and previous btn when humbnailContainer still has overflow content.
thumbnailContainer.addEventListener("scroll", () => {
  //console.log("leftScrollDistance: ", leftScrollDistance);
  //console.log("rightScrollDistance: ", rightScrollDistance);
  //console.log("thumbnailContainer_scrollWidth: ", thumbnailContainer_scrollWidth);
  if (isOverflown(thumbnailContainer)) {
    if (
      rightScrollDistance < thumbnailContainer_scrollWidth &&
      leftScrollDistance > 0
    ) {
      if (nextprevButtonExist) {
        return;
      } else {
        //console.log("add-next and add-prev");
        next_btn.classList.add("button-appear");
        prev_btn.classList.add("button-appear");
        nextprevButtonExist = true;
        nextButtonExist = false;
        prevButtonExist = false;
      }
    }
    //happens after load thumbnailContainer_scrollWidth = maxWidth and leftScrollDistance = 0 (this condition need to come before if(rightScrollDistance >= thumbnailContainer_scrollWidth))
    else if (
      leftScrollDistance <= 0 &&
      rightScrollDistance >= thumbnailContainer_scrollWidth
    ) {
      if (nextButtonExist) {
        return;
      } else {
        //console.log("remove-prev, add-next first condition");
        prev_btn.classList.remove("button-appear");
        next_btn.classList.add("button-appear");
        nextButtonExist = true;
        nextprevButtonExist = false;
        prevButtonExist = false;
      }
    } else if (rightScrollDistance >= thumbnailContainer_scrollWidth) {
      if (prevButtonExist) {
        return;
      } else {
        //console.log("remove-next, add-prev");
        prev_btn.classList.add("button-appear");
        next_btn.classList.remove("button-appear");
        nextButtonExist = false;
        nextprevButtonExist = false;
        prevButtonExist = true;
      }
    } else if (leftScrollDistance <= 0) {
      if (nextButtonExist) {
        return;
      } else {
        //console.log("remove-prev, add-next second condition");
        prev_btn.classList.remove("button-appear");
        next_btn.classList.add("button-appear");
        nextprevButtonExist = false;
        prevButtonExist = false;
        nextButtonExist = true;
      }
    }
  }
});

//--- thumbnail and imageBox codes ---//
//code for: When hover on a thumbnail image display that thumbnail's image on imageBox

imageBox.addEventListener("click", (e) => {
  let x = e.clientX - imageBox_rect.left;
  let y = e.clientY - imageBox_rect.top;

  let isZoomIn = imageBox_image.classList.contains("zoom-in") ? true : false;

  if (isZoomIn) {
    zoomOut();
  } else {
    zoomIn(x, y);
  }
});

thumbnailLinks.forEach((thumbnailLink) => {
  let href = thumbnailLink.getAttribute("href");
  let img = thumbnailLink.querySelector(".thumbnail__img");
  thumbnailLink.addEventListener("click", (e) => {
    thumbnailImages.forEach((image) => {
      if (image.classList.contains("img-focus")) {
        image.classList.remove("img-focus");
      } else {
        return;
      }
    });
    imageBox_image.src = href;
    img.classList.add("img-focus");
    zoomOut();
    e.preventDefault();
  });
});
