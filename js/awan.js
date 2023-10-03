let orderList = [];

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
        items: 4.5, // 在較小的螢幕上顯示一個項目
      },
      414: {
        items: 5.5, // 在較大的螢幕上顯示兩個項目
      },
      575: {
        items: 5.5, // 在較大的螢幕上顯示兩個項目
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
        items: 1.1, // 在較小的螢幕上顯示一個項目
      },
      414: {
        items: 1.2, // 在較大的螢幕上顯示兩個項目
      },
      575: {
        items: 2.2, // 在較大的螢幕上顯示兩個項目
      },
      768: {
        items: 2.2, // 在較大的螢幕上顯示兩個項目
      },
      992: {
        items: 2.8, // 在更大的螢幕上顯示三個項目
      },
      1200: {
        items: 3.5, // 在更大的螢幕上顯示三個項目
      },
    },
  });

  //產品說明內容
  let card_text = $(".card-text").text().substring(0, 30) + " ...";
  $(".card-text").text(card_text);

  let orderarr = [];
  $(".menus").click(function(){
    let i = $(this).siblings(".count").val();
    if(i>1){
      i--;
    }else{
      i=1;
    }
    $(this).siblings(".count").val(i);
  });
  $(".add").click(function(){
    let i = $(this).siblings(".count").val();
    if(i < 10){
      i++;
    }else{
      i=10;
    }
    $(this).siblings(".count").val(i);
  })
  $(".count").bind("input propertychang",function(){
    onlyNum($(".count"));
    let i = $(this).siblings(".count").val();
    if(i < 10){
      i++;
    }else{
      i=10;
    }
    $(this).siblings(".count").val(i);
  })
});


let tf_regCheck = false; //確認遵守會員守則
let tf_UA = false; //帳號
let tf_PW = false; //密碼
let tf_UN = false; //會員姓名
let tf_NN = false; //會員暱稱
let tf_email = false; //會員email
let tf_birthday = false; //會員生日
let tf_phone = false; //會員電話


let uA; //帳號
let info_UA;
let pw; //密碼
let info_pw;
let cpw; //確認密碼
let info_cpw;
let uN; //會員姓名
let info_uN;
let nN; //會員暱稱
let info_nN;
let email; //會員email
let info_email;
let birthday; //會員生日
let info_birthday;
let phone; //會員電話
let info_phone; 



$(function () {
  //Get yesterday's date
  let currentDate = new Date();
  currentDate.setDate(currentDate.getDate() - 1);
  currentDate =
    currentDate.getFullYear() +
    "-" +
    (currentDate.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    currentDate.getDate().toString().padStart(2, "0");

  $("#birthday").attr("max", currentDate);
  uA = $("#userAcount"); //帳號
  info_UA = $("#info_userAcount");
  pw = $("#passWord"); //密碼
  info_pw = $("#info_passWord");
  cpw = $("#checkPassWord"); //確認密碼
  info_cpw = $("#info_checkPassWord");
  uN = $("#userName"); //會員姓名
  info_uN = $("#info_userName");
  nN = $("#nickname"); //會員暱稱
  info_nN = $("#info_nickname");
  email = $("#email"); //會員email
  info_email = $("#info_email");
  birthday = $("#birthday"); //會員生日
  info_birthday = $("#info_birthday");
  phone = $("#phone"); //會員電話
  info_phone = $("#info_phone");

  // 同意遵守會員守則---------- start
  $("#addMemberCheck").change(function () {
    if ($(this).is(":checked")) {
      tf_regCheck = true;
      $(this).removeClass("is-invalid");
      $(this).addClass("is-valid");
    } else {
      tf_regCheck = false;
      $(this).removeClass("is-valid");
      $(this).addClass("is-invalid");
    }
  });
  // 同意遵守會員守則---------- end
  // 會員帳號設定---------- start
  uA.bind("input propertychang", function () {
    checkEngNum(uA);
    if (uA.val().length >= 3 && uA.val().length <= 12) {
      $.ajax({
        type: "POST",
        url: url + "member/reg_check_uni_api.php",
        data: {
          userAcount: uA.val(),
        },
        dataType: "json",
        async: false,
        success: showdata_check_uni,
        error: function () {
          alert("API回傳錯誤reg_check_uni_api.php");
        },
      });
    } else {
      tf_UA = false;
      inputisfalse(uA, info_UA);
      info_UA.text("請輸入3~12字英數設定");
    }
  });
  //會員帳號設定---------- end
  //監聽密碼設定 ------------start
  pw.bind("input propertychang", function () {
    checkpassword(pw);
    if (pw.val().length >= 8 && pw.val().length <= 12) {
      tf_PW = false;
      info_pw.text("√,Ok!!");
      inputistrue(pw, info_pw);
    } else {
      tf_PW = false;
      info_pw.text("請輸入英文或數字或符號符號.-@之8-12字密碼");
      inputisfalse(pw, info_pw);
    }
  });
  //監聽密碼設定 ------------end
  // 監聽-確認密碼 ------------start
  cpw.bind("input propertychang", function () {
    if (pw.val() == cpw.val()) {
      tf_PW = true;
      info_cpw.text("√,Ok!!");
      inputistrue(pw, info_pw);
      inputistrue(cpw, info_cpw);
    } else {
      tf_PW = false;
      info_cpw.text("請輸入與上方密碼相同內容");
      inputisfalse(cpw, info_cpw);
    }
  });
  // 監聽-確認密碼 ------------end
  //監聽會員姓名是否符合字數 ------------start
  uN.bind("input propertychang", function () {
    if (uN.val().length >= 2 && uN.val().length <= 8) {
      tf_UN = true;
      info_uN.text("√,Ok!!");
      inputistrue(uN, info_uN);
    } else {
      tf_UN = false;
      info_uN.text("會員姓名請輸入2~8字");
      inputisfalse(uN, info_uN);
    }
  });
  //監聽會員姓名是否符合字數 ------------end
  //監聽會員暱稱是否符合字數 ------------start
  nN.bind("input propertychang", function () {
    if (nN.val().length >= 2 && nN.val().length <= 16) {
      tf_NN = true;
      info_nN.text("√,Ok!!");
      inputistrue(nN, info_nN);
    } else {
      tf_NN = false;
      info_nN.text("會員暱稱請輸入2~16字");
      inputisfalse(nN, info_nN);
    }
  });
  //監聽會員暱稱是否符合字數 ------------end
  // 監聽e-mail驗證 ------------start
  email.bind("input propertychange", function () {
    $emailchecking = isEmail($("#email").val());
    if ($emailchecking == false) {
      tf_email = false;
      info_email.text("!!請輸入email正確格式");
      inputisfalse(email, info_email);
    } else {
      tf_email = true;
      info_email.text("√,Ok!!");
      inputistrue(email, info_email);
    }
  });
  // 監聽e-mail驗證 ------------end
  //出生年月日 確認是否有值 ------------start
  birthday.bind("input propertychang", function () {
    if (birthday.val().length > 0) {
      tf_birthday = true;
      info_birthday.text("√,Ok!!");
      inputistrue(birthday, info_birthday);
    } else {
      tf_birthday = false;
      info_birthday.text("請輸入出生年-月-日");
      inputisfalse(birthday, info_birthday);
    }
  });
  // 出生年月日 確認是否有值 ------------end
  // 監聽會員phone是否符合字數 ------------start
  phone.bind("input propertychang", function () {
    if (phone.val().length >= 8 && phone.val().length <= 10) {
      tf_phone = true;
      phone.text("√,Ok!!");
      inputistrue(phone, info_phone);
    } else {
      tf_phone = false;
      phone.text("請輸入不包含-等符號之家用8碼或手機10碼");
      inputisfalse(phone, info_phone);
    }
  });
  // 監聽會員phone是否符合字數 ------------end
  //申請會員------------start
  $("#addMember").click(function () {
    if (
      tf_regCheck &&
      tf_UA &&
      tf_PW &&
      tf_UN &&
      tf_NN &&
      tf_email &&
      tf_birthday &&
      tf_phone
    ) {
      $.ajax({
        type: "POST",
        url: url + "member/reg_api.php",
        dataType: "json",
        data: {
          userAcount: uA.val(),
          password: pw.val(),
          username: uN.val(),
          nickname: nN.val(),
          email: email.val(),
          birthday: birthday.val(),
          phone: phone.val(),
        },
        success: showdata_reg,
        error: function () {
          alert("錯誤-申請帳號有誤reg_api.php");
        },
      });

      $("#registerModel").modal("hide");
      $("#loginModal").modal("show");
      $("#openloginModal").addClass("d-none");
      $("#member").removeClass("d-none");
      // location.href = "";
    } else if (!tf_regCheck) {
      alert("尚未勾選遵守會員守則");
    } else if (!tf_UA) {
      alert("會員帳號錯誤");
      inputWarn(uA);
    } else if (!tf_PW) {
      alert("會員密碼錯誤");
      inputWarn(pw);
      inputWarn(cpw);
    } else if (!tf_UN) {
      alert("會員姓名錯誤");
      inputWarn(uN);
    } else if (!tf_NN) {
      alert("會員暱稱錯誤");
      inputWarn(nN);
    } else if (!tf_email) {
      alert("會員email錯誤");
      inputWarn(email);
    } else if (!tf_birthday) {
      alert("會員生日錯誤");
      inputWarn(birthday);
    } else if (!tf_phone) {
      alert("會員電話錯誤");
      inputWarn(phone);
    }
  });
  //申請會員------------end
  // 加入購物清單 -------------- start
  $(".productBtn").click(function () {
    $("#shoppingCar").css("transform", "scale(0.85)");
    setTimeout(function () {
      $("#shoppingCar").css("transform", "scale(1.0)");
    }, 300);
    // 產品編號
    let productid = $(this).data("productid");
    // 產品名稱
    let productName = $(this).siblings(".card-title").text();
    // 產品數量
    let productquantity = $(this).siblings(".orderArea").find(".count").val();
    let pq = parseInt(productquantity);
    // 產品價格
    let productprice = $(this).parents(".card").find(".price").text();

    let getData = localStorage.getItem("shopping");
    let getData_toArray = JSON.parse(getData);
    if (getData_toArray != null) {
      orderList = getData_toArray;
    }

    let productAdded = false; // 添加標誌

    if (orderList.length == 0) {
      orderList.push({
        ID: productid,
        Name: productName,
        Quantity: pq,
        Price: productprice,
      });
    } else {
      orderList.forEach((item) => {
        if (item.ID === productid) {
          item.Quantity += parseInt(pq);
          productAdded = true; // 产品已经添加
        }
      });

      if (!productAdded) {
        // 如果产品未添加过
        orderList.push({
          ID: productid,
          Name: productName,
          Quantity: pq,
          Price: productprice,
        });
      }
    }
    console.log(orderList);
    $(this).siblings(".orderArea").find(".count").val("1");
    var shopingorderlist = JSON.stringify(orderList);
    localStorage.setItem("shopping", shopingorderlist);
  });
  // 加入購物清單 -------------- end
});
function inputistrue(tag,info){
  info.removeClass("text-danger");
  info.addClass("text-success");
  tag.removeClass("border-danger");
  tag.removeClass("border-3");
  tag.removeClass("is-invalid");
  tag.addClass("is-valid");
}
function inputisfalse(tag,info) {
  info.removeClass("text-success");
  info.addClass("text-danger");
  inputWarn(tag)
  tag.removeClass("is-valid");
  tag.addClass("is-invalid");
}
function inputWarn(tag){
  tag.addClass("border-danger");
  tag.addClass("border-3");
}

//會員帳號僅能輸入英文大小寫及數字和符號.-@ ------------ start
function checkEngNum(tag) {
  value = tag.val();
  value = value.replace(/[^A-Za-z0-9]/g, "");
  tag.val(value);
}
function checkpassword(tag) {
  value = tag.val();
  value = value.replace(/[^A-Za-z0-9\.\-\@]/g, "");
  tag.val(value);
}
//會員帳號僅能輸入英文大小寫及數字和符號.-@ ------------ end
//僅能輸入數字 ------------ start
function onlyNum(tag) {
  value = tag.val();
  value = value.replace(/[^0-9]/g, "");
  tag.val(value);
}
//僅能輸入數字 ------------ end
//email 格式驗證 ------------ start
function isEmail(email) {
  var regex =
    /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if (!regex.test(email)) {
    return false;
  } else {
    return true;
  }
}
//email 格式驗證 ------------ end


// ajax回傳會員帳號是否有人使用
function showdata_check_uni(data) {
  if (data.state) {
    tf_UA = true;
    info_UA.text(data.message);
    inputistrue(uA, info_UA);
  } else {
    tf_UA = false;
    info_UA.text(data.message);
    inputisfalse(uA, info_UA);
  }
}
//申請會員
function showdata_reg(data){
  setCookie('uid', data.data, 7);
  if (data.state) {
    location.href = "index.html";
    $("#registerModel").modal("hide");
    $("#openloginModal").addClass("d-none");
    $("#member").removeClass("d-none");
    // mobile Navbar login --- start
    mobMenuHide();
    $(".isLogoutHide").removeClass("d-none");
    $("#isLoginHide").addClass("d-none");
    // mobile Navbar login --- end
  }else{
    // alert(data.message);
  }
}




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
      success: showdata_check_uid,
      error: function () {
        alert("錯誤check_uid_api.php ");
      },
    });
  }
  // 判斷是否登入過---------------------------------end
 
  // 會員登入 ----------------------------start
  $("#login").click(function () {
    $.ajax({
      type: "POST",
      url: url + "member/login_api.php",
      dataType: "json",
      data: {
        memberAcount: $("#memberAcount").val(),
        password: $("#memberPassword").val(),
      },
      success: showdata_login,
      error: function () {
        alert(
          "api/登入錯誤, api/member/login_api.php"
        );
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
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message + "! " + data.data[0].Nickname + "歡迎登入",
        showConfirmButton: false,
        timer: 1000,
      });
      //存入cookie
      setCookie("uid", data.data[0].Uid, 7);
      $("#loginModal").modal("hide");
      $("#openloginModal").addClass("d-none");
      $("#member").removeClass("d-none");
      // mobile Navbar login --- start
      mobMenuHide();
      $(".isLogoutHide").removeClass("d-none");
      $("#isLoginHide").addClass("d-none");
      // mobile Navbar login --- end
    }else{
      alert("此帳號被停權請聯絡管理員");
    }

  } else {
    alert(data.message);
  }
}


function showdata_check_uid(data){
  console.log(data);
  if (data.state){
    //驗證成功，顯示已登入狀態
    // alert(data.message);
    $("#openloginModal").addClass("d-none");
    $("#member").removeClass("d-none");
    // mobile Navbar login --- start
    mobMenuHide();
    $(".isLogoutHide").removeClass("d-none");
    $("#isLoginHide").addClass("d-none");
    // mobile Navbar login --- end
  }else{
    //驗證失敗登入
    // alert(data.message);
    $("#member").addClass("d-none");
    $("#login").removeClass("d-none");
  }
}

function mobMenuHide() {
  $("#mobMenuIcon").removeClass("active");
  $("#mobMenuIcon").removeClass("closeMenu");
  $("#mobMenuIcon").addClass("openMenu");
  $("#mobNavMenu").css("top", "0%");
  $("#mobNavMenu").css("transform", "translateY(-100%)");
}
