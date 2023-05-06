const config = {
  type: "carousel",
  focusAt: "0",
  perView: 6,
  gap: 10,
  autoplay: 2000,
  animationDuration: 800,
  hoverpause: true,
  breakpoints: {
    1201: {
      perView: 5,
    },
    810: {
      perView: 4,
    },
    769: {
      perView: 5,
    },
    600: {
      perView: 4,
    },
    481: {
      perView: 4,
      autoplay: 0,
      animationDuration: 300,
      dragThreshold: "0",
    },
    400: {
      perView: 3,
    },
  },
};
let homeHotCategorySlide = new Glide(".home-hotCategory-slide", config).mount();

let homeProductGridSlide = new Glide(".home-product-grid-slide", {
  type: "carousel",
  focusAt: "0",
  perView: 1,
  animationDuration: 400,
  breakpoints: {
    481: {
      animationDuration: 400,
      dragThreshold: "0",
    },
  },
}).mount();
/*glide.update({
    type: 'slider',
    rewind: false,
    disabledArrow: 'glide__arrow--disabled',
    bound: true
})*/
