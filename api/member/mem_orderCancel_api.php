<?php
    require_once "../host.php";
if(isset($_POST["state"]) && isset($_POST["ordernumber"])){
    if($_POST["state"] != "" && $_POST["ordernumber"] != ""){
        
        $p_state = $_POST["state"];
        $p_ordernumber = $_POST["ordernumber"];

        require_once "../dbtools.php";
        $conn = create_connect();

        $sql = "UPDATE memberorder SET State = '$p_state' WHERE OrderNumber = '$p_ordernumber'";
    
        //$dataname由dbtools.php而來
        if(execute_sql($conn, $dataname, $sql)){
            echo '{"state":true, "message":"訂單取消成功"}';
        }else{
            echo '{"state":false, "message":"訂單取消失敗"}';
        }
        mysqli_close($conn);
    }else{
        echo '{"state":false, "message":"欄位不允許空白"}';
    }
}else{
    echo '{"state":false, "message":"欄位錯誤"}';
}


?>