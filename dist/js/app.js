$(document).ready(function () {
  function overlay(show) {
    if (show) {
      var top = $(window).scrollTop();
      var left = $(window).scrollLeft();
      $(window).scroll(function () {
        $(this).scrollTop(top).scrollLeft(left);
      });
    } else {
      $(window).unbind("scroll");
    }
  }

  $("#burgerBtn").click(function (evt) {
    evt.preventDefault();
    $("#burgerBtn").toggleClass("burger--active");
    $("#nav").toggleClass("nav--active");
    $("html").toggleClass("noscroll");

    if ($(this).hasClass("active")) {
      overlay(true);

      document.ontouchmove = function (e) {
        e.preventDefault();
      };
    } else {
      overlay(false);

      document.ontouchmove = function (e) {
        return true;
      };
    }
  });

  $("#cabinetPrizesSlider")
    .not(".slick-initialized")
    .slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      infinite: true,
      centerMode: false,
      autoplay: false,
      prevArrow: $("#cabinetPrizesArrowPrev"),
      nextArrow: $("#cabinetPrizesArrowNext"),
    });
});
