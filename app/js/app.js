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

  if ($(".select").length > 1) {
    $("select").each(function () {
      let $this = $(this).not(".select-search");
      let parent = $(this).not(".select-search").parents(".select");
      $this.select2({
        minimumResultsForSearch: Infinity,
        dropdownParent: parent,
      });
    });
    $(".select-search").each(function () {
      let $this = $(this);
      let parent = $(this).parents(".select");
      $this.select2({
        dropdownParent: parent,
      });
    });
  } else {
    $("select").select2({
      minimumResultsForSearch: Infinity,
      dropdownParent: $(".select"),
    });
  }

  function checkValidate() {
    var form = $("form");

    $.each(form, function () {
      $(this).validate({
        ignore: [],
        errorClass: "error",
        validClass: "success",
        rules: {
          name: {
            required: true,
          },
          email: {
            required: true,
            email: true,
          },
          phone: {
            required: true,
            phone: true,
          },
          message: {
            required: true,
          },
          password: {
            required: true,
            normalizer: function normalizer(value) {
              return $.trim(value);
            },
          },
        },
        errorElement: "span",
        errorPlacement: function (error, element) {
          var placement = $(element).data("error");
          if (placement) {
            $(placement).append(error);
          } else {
            error.insertBefore(element);
          }
        },
        messages: {
          phone: "Некорректный номер",
          email: "Некорректный e-mail",
        },
      });
    });
    jQuery.validator.addMethod("email", function (value, element) {
      return (
        this.optional(element) ||
        /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(value)
      );
    });
    jQuery.validator.addMethod("phone", function (value, element) {
      return (
        this.optional(element) || /\+7\(\d+\)\d{3}-\d{2}-\d{2}/.test(value)
      );
    });
  }
  checkValidate();

  $(".faq__header").click(function () {
    const faqItem = $(this).parents(".faq__item");
    faqItem.toggleClass("faq__item--active");
  });
});
