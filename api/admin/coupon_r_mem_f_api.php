<?php
    require_once "../host.php";
    require_once "../dbtools.php";
    $conn = create_connect();
    $sql = "SELECT a.CouponN, a.UserAcount, (SELECT Title FROM coupontype WHERE ID = a.Coupon) AS CouponName, a.Active, b.Type, b.Discount, b.Details, c.IsLimit, (SELECT LimitAmount FROM limitation WHERE ID = b.Limitations) AS LimitAmount , c.LimitDetails FROM coupon AS a JOIN coupontype AS b ON a.Coupon = b.ID JOIN limitation AS c ON b.Limitations = c.ID WHERE a.UserAcount = '001' AND a.Active = 'false'";
    $result = execute_sql($conn, $dataname, $sql); //$dataname由dbtools.php而來
    if(mysqli_num_rows($result)>0){
        //取資料傳到前端
        $mydata = array();

        while($row = mysqli_fetch_assoc($result)){
            $mydata[] = $row;
        }
        echo '{"state":true, "message":"取得會員未使用之優惠券資料成功","data":'.json_encode($mydata).'}';
    
    } else {
        echo '{"state":false, "message":"取得會員未使用之優惠券資料失敗"}';
    }

    mysqli_close($conn);
?>