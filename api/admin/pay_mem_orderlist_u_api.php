<?php
    require_once "../host.php";
    if( isset($_POST["orderNumber"]) && isset( $_POST["state"])){
        if($_POST["orderNumber"] != "" && $_POST["state"] != ""){
            $p_orderNumber = $_POST["orderNumber"];
            $p_state = $_POST["state"];

            require_once "../dbtools.php";
            
            $conn = create_connect();
            $sql = "UPDATE memberorderlist SET State = '$p_state' WHERE OrderNumber = '$p_orderNumber'";
        
            if(execute_sql($conn, $dataname, $sql)){
                echo '{"state":true, "message":"成功，訂單已出貨!"}';
            }else{
                echo '{"state":false, "message":"失敗，內容狀態未變更"}';
            }
            mysqli_close($conn);
            
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }

?>