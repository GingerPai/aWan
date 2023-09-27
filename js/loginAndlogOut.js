

$(function(){
  // 判斷是否登入過---------------------------------start
  //確認uid是否存在，若存在傳遞至後端check_uid_api.php確認是否合法
  if (getCookie("uid") != "") {
    //uid存在
    $.ajax({
      type: "POST",
      url: url + "check_uid_api.php",
      dataType: "json",
      data: {
        uid: getCookie("uid"),
      },
      success: showdata_check_uid,
      error: function () {
        alert("錯誤check_uid_api.php ");
      },
    });
  }
  // 判斷是否登入過---------------------------------end
  // 會員登出 ----------------------------start
  $("#logout").click(function () {
    logout();
  });
  // 會員登出 ----------------------------end
  // 會員登入 ----------------------------start
  $("#login").click(function () {
    $.ajax({
      type: "POST",
      url: url + "login_api.php",
      dataType: "json",
      data: {
        memberAcount : $("#memberAcount").val(),
        password: $("#memberPassword").val()
      },
      success: showdata_login,
      error: function (){
        alert("登入錯誤, /web202308/moz/php/login_api.php");
      },
    });
  });
  // 會員登入 ----------------------------end
})




function showdata_login(data) {
  console.log(data);
  // 如果回傳回來的json欄位state為true則重整畫面將欄位清空
  if (data.state) {
    if(data.data[0].UserState == "true"){
      console.log(data.message);
      //存入cookie
      setCookie('uid', data.data[0].Uid, 7);

      alert(data.data[0].Nickname + "歡迎登入");
      $("#loginModal").modal("hide");
      $("#openloginModal").addClass("d-none");
      $("#member").removeClass("d-none");

    }else{
      alert("此帳號被停權請聯絡管理員")
    }

  } else {
    console.log(data.message);
  }
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  let expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

//https://www.w3schools.com/js/js_cookies.asp 中 php 的 getCookie 
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
      c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
  }
  return "";
}
function showdata_check_uid(data){
  console.log(data);
  if (data.state){
    //驗證成功，顯示已登入狀態
    console.log(data.message);
    $("#openloginModal").addClass("d-none");
    $("#member").removeClass("d-none");
    alert("歡迎回來"+ data.data[0].Nickname);
  }else{
    //驗證失敗登入
    console.log(data.message);
    $("#member").addClass("d-none");
    $("#login").removeClass("d-none");
  }
}
//登出帳號
//刪除uid並重整畫面
function logout(){
  setCookie('uid','',7);
  $("#member").addClass("d-none");
  location.href = "index.html";
}
 