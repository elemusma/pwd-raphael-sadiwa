jQuery(document).ready(function($) {

    $('.testimonial-carousel').owlCarousel({
    // center: true,
    loop: true,
    margin: 40,
    nav: false,
    dots: true,
    // autoHeight: false,
    // autoHeightClass: 'owl-height',
    // stagePadding:170,
    autoplay: false,
    autoplayTimeout: 3500,
    autoplaySpeed: 2000, // this seems to make it autoscroll
    autoplayHoverPause: false,
    animateIn: 'fadeIn',
    animateOut: 'fadeOut',
    // navText : ["<img src='/wp-content/uploads/2021/07/Arrow-Left-Blair-ITC.png' />","<img src='/wp-content/uploads/2021/07/Arrow-Right-Blair-ITC.png' />"],
    responsive: {
        0: {
            items: 1,
            // slideBy: 2
        },
        600: {
            items: 1,
            // slideBy: 3
        },
        1000: {
            items: 3,
            slideBy: 1
        }
    }
});

  $('.carousel-services').owlCarousel({
    loop: true,
    margin: 20,
    nav: true,
    dots: false,
    autoplay: false,
    navText: [
      "<img src='/wp-content/uploads/2025/11/Arrow-Left.png' alt='previous' />",
      "<img src='/wp-content/uploads/2025/11/Arrow-Right.png' alt='next' />"
    ],
    responsive: {
      0: {
        items: 1
      },
      600: {
        items: 2
      },
      1000: {
        items: 3
      }
    }
  });


  });