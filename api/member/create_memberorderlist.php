<?php
    require_once "../host.php";
if(isset($_POST["orderNumber"]) && isset($_POST["memberAcount"]) && isset($_POST["productID"]) && isset($_POST["productName"]) && isset($_POST["price"]) && isset($_POST["orderAmount"]) && isset($_POST["ordertime"])){
    if($_POST["orderNumber"] != "" && $_POST["memberAcount"] != "" && $_POST["productID"] != "" && $_POST["productName"] != "" && $_POST["price"] != "" && $_POST["orderAmount"] != "" && $_POST["ordertime"] != ""){
        $p_orderNumber = $_POST["orderNumber"]; //訂購單號
        $p_memberAcount = $_POST["memberAcount"]; //訂購人
        $p_productID = $_POST["productID"]; //產品編號
        $p_productName = $_POST["productName"]; //產品名稱
        $p_price = $_POST["price"]; //產品價格
        $p_orderAmount = $_POST["orderAmount"]; //產品數量
        $p_ordertime = $_POST["ordertime"]; //訂單時間

        require_once "../dbtools.php";
        $conn = create_connect();
        $sql = "INSERT INTO memberorderlist(OrderNumber, UserAcount, ProductID, ProductName, Price, OrderAmount, OrderDate) VALUES ('$p_orderNumber','$p_memberAcount','$p_productID','$p_productName','$p_price','$p_orderAmount','$p_ordertime')";

        //$dataname由../dbtools.php而來
        if(execute_sql($conn, $dataname, $sql)){
            echo '{"state": true, "message":"新增訂單清單成功"}';
        }else{
            echo '{"state":false, "message":"新增訂單清單失敗"}';
        }
        mysqli_close($conn);
    }else{
        echo "欄位不允許空白";
    }
}else{
    echo "欄位錯誤";
}
?>