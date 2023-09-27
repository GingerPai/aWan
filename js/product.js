$(function () {
    //產品類型選單-顯示設定
    $("#category").owlCarousel({
      items: 10,
      autoplay: false, // 自動播放
      autoplayTimeout: 3000, // 自動播放間隔（以毫秒為單位）
      autoplaySpeed: 500,
      //pagination: true,
      nav: false,
      loop: false, // 循環輪播
      dots: false,
      responsive: {
        0: {
          items: 5, // 在較小的螢幕上顯示一個項目
        },
        414: {
          items: 6, // 在較大的螢幕上顯示兩個項目
        },
        575: {
          items: 7, // 在較大的螢幕上顯示兩個項目
        },
        768: {
          items: 8, // 在較大的螢幕上顯示兩個項目
        },
        992: {
          items: 9, // 在更大的螢幕上顯示三個項目
        },
        1200: {
          items: 10, // 在更大的螢幕上顯示三個項目
        },
      },
    });
    //食物類型選單-功能設定
    $(".categoryBtn").click(function () {
      let color = $(this).children("img").css("background-color");
      $(".categoryBtn").removeClass("active");
      $(this).addClass("active");
  
      $(".categoryBtn.actve").children(".categoryMark").addClass("d-none");
      $(this).children(".categoryMark").removeClass("d-none");
  
      $(this).children(".categoryMark").css("background-color", color);
  
      let category = $(this).data("category");
      $(".subcategory").addClass("d-none");
      $('.subcategory[data-categoryItem="' + category + '"]').removeClass(
        "d-none"
      );
    });
  
    //產品類型之項目選單-顯示設定
    $(".indexproduct").owlCarousel({
      // items:5, // 設定要顯示的項目數量
      autoplay: false, // 自動播放
      autoplayTimeout: 3000, // 自動播放間隔（以毫秒為單位）
      autoplaySpeed: 500,
      //pagination: true,
      nav: true,
      loop: true, // 循環輪播
      dots: false,
      responsive: {
        0: {
          items: 1, // 在較小的螢幕上顯示一個項目
        },
        414: {
          items: 1, // 在較大的螢幕上顯示兩個項目
        },
        575: {
          items: 2, // 在較大的螢幕上顯示兩個項目
        },
        768: {
          items: 3, // 在較大的螢幕上顯示兩個項目
        },
        992: {
          items: 3.5, // 在更大的螢幕上顯示三個項目
        },
        1200: {
          items: 4.5, // 在更大的螢幕上顯示三個項目
        },
      },
    });
    //產品說明內容
    let card_text = $(".card-text").text().substring(0, 30) + " ...";
    $(".card-text").text(card_text);
  });
  