<?php
    require_once "../host.php";
if(isset($_POST["memberAcount"]) && isset($_POST["orderNumber"]) && isset($_POST["total"]) && isset($_POST["ordertime"]) && isset($_POST["bookingdate"]) && isset($_POST["bookingtime"]) ){
    if($_POST["memberAcount"] != "" && $_POST["orderNumber"] != "" && $_POST["total"] != "" && $_POST["ordertime"] != "" && $_POST["bookingdate"] && $_POST["bookingtime"] ){
        $p_memberAcount = $_POST["memberAcount"]; //訂購人
        $p_orderNumber = $_POST["orderNumber"];   //訂購單號
        $p_total = $_POST["total"];               //訂單金額
        $p_ordertime = $_POST["ordertime"];       //訂單時間
        $p_bookingdate = $_POST["bookingdate"];   //預定取餐日期
        $p_bookingtime = $_POST["bookingtime"];   //預定取餐時段

        require_once "../dbtools.php";
        $conn = create_connect();
        $sql = "INSERT INTO memberorder(OrderNumber, UserAcount, OrderSum, OrderDate, Bookingdate, Bookingtime) VALUES ('$p_orderNumber','$p_memberAcount','$p_total','$p_ordertime', '$p_bookingdate', '$p_bookingtime')";

        //$dataname由../dbtools.php而來
        if(execute_sql($conn, $dataname, $sql)){
            echo '{"state": true, "message":"新增訂單成功"}';
        }else{
            echo '{"state":false, "message":"新增訂單失敗"}';
        }
        mysqli_close($conn);
    }else{
        echo "欄位不允許空白";
    }
}else{
    echo "欄位錯誤";
}
?>