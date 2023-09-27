<?php
    require_once "../host.php";
if(isset($_POST["userAcount"]) && isset($_POST["userName"]) && isset($_POST["nickname"]) && isset( $_POST["email"]) && isset( $_POST["birthday"]) && isset( $_POST["phone"]) ){
    if($_POST["userAcount"] != "" && $_POST["userName"] != "" && $_POST["nickname"] != "" && $_POST["email"] != "" && $_POST["birthday"] != "" && $_POST["phone"] != "" ){
        
    
        $p_userAcount = $_POST["userAcount"];
        $p_userName = $_POST["userName"];
        $p_nickname = $_POST["nickname"];
        $p_email = $_POST["email"];
        $p_birthday = $_POST["birthday"];
        $p_phone = $_POST["phone"];
        // $p_photo = substr(hash('sha256', uniqid(time())), 0, 10).'_'.$_POST["photo"];

        require_once "../dbtools.php";
        $conn = create_connect();

    
        $sql = "UPDATE member SET Username = '$p_userName', Nickname = '$p_nickname', Email = '$p_email', Birthday = '$p_birthday', Phone = '$p_phone' WHERE UserAcount = '$p_userAcount'";
    
        //$dataname由dbtools.php而來
        if(execute_sql($conn, $dataname, $sql)){
            echo '{"state":true, "message":"更新成功"}';
        }else{
            echo '{"state":false, "message":"更新失敗"}';
        }
        mysqli_close($conn);
    }else{
        echo '{"state":false, "message":"欄位不允許空白"}';
    }
}else{
    echo '{"state":false, "message":"欄位錯誤"}';
}


?>