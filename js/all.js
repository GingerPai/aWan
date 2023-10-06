$(function () {
  //會員登入後出現會員icon，點擊後出現memberMenu ------------ start
  $("#member").click(function () {
    $("#memberMenu").toggleClass("d-none");
  });
  //會員登入後出現會員icon，點擊後出現memberMenu ------------end

  // 會員登出 ----------------------------start
  //登出帳號、刪除uid並重整畫面
  $(".logout").click(function () {
    setCookie("uid", "", 7);
    $("#member").addClass("d-none");
    // // mobile Navbar out --- start
    // mobMenuHide();
    // $(".isLogoutHide").addClass("d-none");
    // $("#isLoginHide").removeClass("d-none");
    // // mobile Navbar out --- end
    orderList = []; //清空array
    localStorage.removeItem("shopping"); //刪除localStorage
    location.href = "index.html";
  });
  // 會員登出 ----------------------------end
  $(document).on("click", ".openMenu", function () {
    $("#mobMenuIcon").addClass("active");
    $("#mobMenuIcon").addClass("closeMenu");
    $("#mobMenuIcon").removeClass("openMenu");
    $("#mobNavMenu").css("top", "100%");
    $("#mobNavMenu").css("transform", "translateY(-0%)");
  });
  $(document).on("click", ".closeMenu", function () {
    mobMenuHide();
  });
  $(document).on("click", "#mobMenu .nav-item a.nav-link", function () {
    $("html,body").animate(
      {
        scrollTop: $(this.hash).offset().top - 50,
      },
      800
    );
    mobMenuHide();
  });
});
function mobMenuHide() {
  $("#mobMenuIcon").removeClass("active");
  $("#mobMenuIcon").removeClass("closeMenu");
  $("#mobMenuIcon").addClass("openMenu");
  $("#mobNavMenu").css("top", "0%");
  $("#mobNavMenu").css("transform", "translateY(-100%)");
}
