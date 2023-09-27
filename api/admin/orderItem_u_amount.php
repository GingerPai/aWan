<?php
    require_once "../host.php";
    if(isset($_POST["id"]) && isset( $_POST["orderNum"]) && isset( $_POST["orderAmount"])){
        if($_POST["id"] != "" && $_POST["orderNum"] != "" && $_POST["orderAmount"] != ""){
            $p_id = $_POST["id"];
            $p_orderNum = $_POST["orderNum"];
            $p_orderAmount = $_POST["orderAmount"];
    
            require_once "../dbtools.php";
            
            $conn = create_connect();
            $sql = "UPDATE memberorderlist SET OrderAmount = '$p_orderAmount' WHERE ID = '$p_id' AND OrderNumber = '$p_orderNum '";
        
            if(execute_sql($conn, $dataname, $sql)){
                echo '{"state":true, "message":"更新訂單數量成功"}';
            }else{
                echo '{"state":false, "message":"更新訂單數量失敗"}';
            }
            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }




?>