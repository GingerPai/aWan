$(function () {
  //會員登入後出現會員icon，點擊後出現memberMenu ------------ start
  $("#member").click(function () {
    $("#memberMenu").toggleClass("d-none");
  });
  //會員登入後出現會員icon，點擊後出現memberMenu ------------end

  // 會員登出 ----------------------------start
  //登出帳號、刪除uid並重整畫面
  $("#logout").click(function () {
    setCookie("uid", "", 7);
    $("#member").addClass("d-none");
    orderList = []; //清空array
    localStorage.removeItem("shopping"); //刪除localStorage
    location.href = "index.html";
  });
  // 會員登出 ----------------------------end
  
  
});
