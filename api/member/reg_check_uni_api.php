<?php
    require_once "../host.php";
    if(isset($_POST["userAcount"])){
        if($_POST["userAcount"] != "" ){
            $p_userAcount = $_POST["userAcount"];
            
            require_once "../dbtools.php";

            $conn = create_connect();
            $sql = "SELECT UserAcount FROM member WHERE UserAcount = '$p_userAcount'";
            $result = execute_sql($conn, $dataname, $sql); //$dataname由../dbtools.php而來

            if(mysqli_num_rows($result) == 0){
                //此帳號不存在，可以使用
                echo '{"state":true, "message":"此帳號不存在，可以使用"}';
            }else{
                //此帳號存在，不可以使用
                echo '{"state":false, "message":"此帳號存在，不可以使用"}';
            }

            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }
?>