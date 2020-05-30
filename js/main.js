$(document).ready(function () {
  $(".slider_content").slick({
    speed: 1200,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="./img/chevron-left-solid.png"></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="./img/chevron-right-solid.png"></button>',
    responsive: [
      {
        breakpoint: 992,
        settings: {
          arrows: false,
          dots: true,
        },
      },
    ],
  });
  $(".katalog_nav").on(
    "click",
    "button:not(.katalog_button_active)",
    function () {
      $(this)
        .addClass("katalog_button_active")
        .siblings()
        .removeClass("katalog_button_active")
        .closest("div.katalog_main")
        .find("div.katalog_cards")
        .removeClass("katalog_cards_active")
        .eq($(this).index())
        .addClass("katalog_cards_active");
    }
  );
  $(".card_link").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".card_main").eq(i).toggleClass("card_main_active");
      $(".card_list").eq(i).toggleClass("card_list_active");
    });
  });
  $(".card_link_back").each(function (i) {
    $(this).on("click", function (e) {
      e.preventDefault();
      $(".card_main").eq(i).toggleClass("card_main_active");
      $(".card_list").eq(i).toggleClass("card_list_active");
    });
  });

  // modal

  $("[data-modal=consultation]").on("click", function () {
    $(".overlay, #consultation").fadeIn("slow");
  });
  $(".modal_close").on("click", function () {
    $(".overlay, #consultation, #order, #thanks").fadeOut("slow");
  });

  $(".button_order").each(function (i) {
    $(this).on("click", function () {
      $("#order .modal_order_name").text($(".card_main_name").eq(i).text());
      $(".overlay, #order").fadeIn("slow");
    });
  });
  // validate
  function valideForms(form) {
    $(form).validate({
      rules: {
        name: "required",
        phone: "required",
        email: {
          required: true,
          email: true,
        },
      },
      messages: {
        name: "Пожалуйста введите свое имя",
        phone: "Пожалуйста введите свой номер телефона",
        email: {
          required: "Пожалуйста введите  адрес своей почты",
          email: "Ваш почтовый адрес не соответствует формату name@domain.com",
        },
      },
    });
  }
  valideForms("#consultation form");
  valideForms("#order form");
  valideForms(".consultation_main");

  $("form").submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize(),
    }).done(function () {
      $(this).find("input").val("");
      $("#consultation, #order").fadeOut();
      $(".overplay, #thanks").fadeIn("slow");
      $("form").trigget("reset");
    });
    return false;
  });
  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $(".pageup").fadeIn();
    } else {
      $(".pageup").fadeOut();
    }
  });
  $("a[href^='#']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({ scrollTop: $(_href).offset().top + "px" });
    return false;
  });
});
