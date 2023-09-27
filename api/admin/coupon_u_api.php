<?php
    require_once "../host.php";
    if( isset($_POST["couponN"]) && isset( $_POST["orderNumber"]) && isset($_POST["billAmount"]) && isset( $_POST["discount"]) && isset($_POST["useTime"]) && isset( $_POST["active"])
    ){ if($_POST["couponN"] != "" && $_POST["orderNumber"] != "" && $_POST["billAmount"] != "" && $_POST["discount"] != "" && $_POST["useTime"] != "" && $_POST["active"] != ""){
            $p_couponN = $_POST["couponN"];
            $p_orderNumber = $_POST["orderNumber"];
            $p_billAmount = $_POST["billAmount"];
            $p_discount = $_POST["discount"];
            $p_useTime = $_POST["useTime"];
            $p_active = $_POST["active"];
    
            require_once "../dbtools.php";
            
            $conn = create_connect();
            $sql = "UPDATE coupon SET OrderNumber = '$p_orderNumber', BillAmount = '$p_billAmount', Discount = '$p_discount', UseTime = '$p_useTime', Active = '$p_active' WHERE CouponN = '$p_couponN'";
        
            if(execute_sql($conn, $dataname, $sql)){
                echo '{"state":true, "message":"成功，已使用折價券!"}';
            }else{
                echo '{"state":false, "message":"使用折價券失敗"}';
            }
            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }




?>