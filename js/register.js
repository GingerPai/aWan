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
        url: url + "reg_check_uni_api.php",
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
  //申請會員
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
      // console.log("userAcount:" + uA.val() +  "，password:" + pw.val() + "，username:" + uN.val() + "，nickname:" + nN.val() + "，email:" + email.val() + "，birthday:" + birthday.val() + "，phone:" + phone.val() );
      $.ajax({
        type: "POST",
        url: url + "reg_api.php",
        datatype: "json",
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

      // alert(nN.val() + "歡迎加入會員");
      // $("#registerModel").modal("hide");
      // $("#openloginModal").addClass("d-none");
      // $("#member").removeClass("d-none");
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

function showdata_reg(data){
  console.log(data);
  // console.log(data["state"]);
  // console.log(data[state]);
  console.log(data.state);
  console.log(data.message);
  // console.log(data.data);
  // setCookie('uid', data.data, 7);
  if (data.state == "true") {
    console.log(data.message);
    location.href = "/aWan/index.html";
    $("#registerModel").modal("hide");
    $("#openloginModal").addClass("d-none");
    $("#member").removeClass("d-none");
  }else{
    console.log(data.message);
  }
}


