<?php
    require_once "../host.php";
    if( isset($_POST["orderNumber"]) && isset( $_POST["userAcount"]) && isset($_POST["billSum"]) && isset( $_POST["useTime"]) && isset($_POST["orderstate"]) && isset( $_POST["cashier"]) ){
        if($_POST["orderNumber"] != "" && $_POST["userAcount"] != "" && $_POST["billSum"] != "" && $_POST["useTime"] != "" && $_POST["orderstate"] != "" && $_POST["cashier"] != ""){
            $p_orderNumber = $_POST["orderNumber"];
            $p_userAcount = $_POST["userAcount"];

            $p_couponN = $_POST["couponN"];
            $p_discount = $_POST["discount"];
            $p_billSum = $_POST["billSum"];
            $p_useTime = $_POST["useTime"];
            $p_orderstate = $_POST["orderstate"];
            $p_cashier = $_POST["cashier"];

            require_once "../dbtools.php";
            
            $conn = create_connect();
            $sql = "UPDATE memberorder SET CouponNum = '$p_couponN', CouponAmount = '$p_discount', Payment = '$p_billSum', PayTime = '$p_useTime', State = '$p_orderstate', Cashier = '$p_cashier' WHERE OrderNumber = '$p_orderNumber' AND UserAcount = $p_userAcount";
        
            if(execute_sql($conn, $dataname, $sql)){
                echo '{"state":true, "message":"成功，已結帳!"}';
            }else{
                echo '{"state":false, "message":"結帳失敗"}';
            }
            mysqli_close($conn);
            
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }




?>