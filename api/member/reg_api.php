<?php
    require_once "../host.php";
if(
    isset($_POST["userAcount"]) && 
    isset($_POST["password"]) && 
    isset($_POST["username"]) && 
    isset($_POST["nickname"]) && 
    isset($_POST["email"]) && 
    isset($_POST["birthday"]) && 
    isset($_POST["phone"])){
    if(
        $_POST["userAcount"] != "" && 
        $_POST["password"] != "" && 
        $_POST["username"] != "" &&  
        $_POST["nickname"] != "" && 
        $_POST["email"] != "" && 
        $_POST["birthday"] != "" && 
        $_POST["phone"] )
        {
            $p_userAcount = $_POST["userAcount"];
            $p_password = substr(md5($_POST["password"]), 0, 5).substr(md5($_POST["password"]), 27, 5); //加密
            $p_username = $_POST["username"];
            $p_nickname = $_POST["nickname"];
            $p_email = $_POST["email"];
            $p_birthday = $_POST["birthday"];
            $p_phone = $_POST["phone"];
            $uid = substr(hash('sha256', uniqid(time())), 0 ,10); //產生uid儲存至資料庫，

            require_once "../dbtools.php";

            $conn = create_connect();
            $sql = "INSERT INTO member(UserAcount, Password, Username, Nickname, Email, Birthday, Phone, Uid) VALUES ('$p_userAcount','$p_password','$p_username','$p_nickname','$p_email','$p_birthday','$p_phone','$uid')";

            //$dataname由../dbtools.php而來
            if(execute_sql($conn, $dataname, $sql)){
                echo '{"state": true, "message":"註冊成功", "data": '.json_encode($uid).'}';
            }else{
                echo '{"state": false, "message":"註冊失敗"}';
            }
            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
}else{
    echo '{"state":false, "message":"欄位錯誤"}';
}


?>