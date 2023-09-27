$(function(){
  // 判斷是否登入過---------------------------------start
  //確認uid是否存在，若存在傳遞至後端check_uid_api.php確認是否合法
  if (getCookie("uid") != "") {
    //uid存在
    $.ajax({
      type: "POST",
      url: url + "member/check_uid_api.php",
      dataType: "json",
      data: {
        uid: getCookie("uid"),
      },
      success: function(data){
        console.log(data);
        if (data.state) {
          $("#openloginModal").addClass("d-none");
          $("#member").removeClass("d-none");
          //驗證成功，顯示已登入狀態
          console.log(data.message);
          $("#conrirmBtn").attr("data-useracount", data.data[0].UserAcount);
          console.log(data.data[0].UserAcount);
        } else {
          //驗證失敗登入
          console.log(data.message);
          $("#member").addClass("d-none");
          $("#login").removeClass("d-none");
        }
      },
      error: function () {
        alert("錯誤check_uid_api.php ");
      },
    });
  }
  function showdata_check_uid(data) {
    
  }
  // 判斷是否登入過---------------------------------end
})