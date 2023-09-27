<?php
    require_once "../host.php";
    require_once "../dbtools.php";
    $conn = create_connect();
    $sql = "SELECT mo.ID AS MemberOrderID, mo.OrderNumber, mo.UserAcount, mo.OrderSum, mo.CouponNum, mo.CouponAmount, mo.Payment, mo.PayTime, mo.BookingDate, mo.BookingTime, mo.Cashier, mo.OrderDate, mo.OrderDate, os.CodeName, os.StateTitle, os.StateReason, os.status, os.MemCanCancel, os.PaymentStatus, os.color FROM memberorder AS mo JOIN orderstate AS os ON mo.State = os.ID ORDER BY Bookingdate ASC, Bookingtime ASC";
    $result = execute_sql($conn, $dataname, $sql); //$dataname由dbtools.php而來
    if(mysqli_num_rows($result)>0){
        //取資料傳到前端
        $mydata = array();

        while($row = mysqli_fetch_assoc($result)){
            $mydata[] = $row;
        }
        echo '{"state":true, "message":"取得會員訂單資料成功","data":'.json_encode($mydata).'}';
    
    } else {
        echo '{"state":false, "message":"取得會員訂單資料失敗"}';
    }

    mysqli_close($conn);
?>