<?php
    require_once "../host.php";
    require_once "../dbtools.php";
    $conn = create_connect();
    $sql = "SELECT ID, StateTitle, StateReason FROM orderstate WHERE status = 'open'";  //資料排序方式: ASC: 遞增，DESC: 遞減
    $result = execute_sql($conn, $dataname, $sql);
    if(mysqli_num_rows($result)>0){
        $mydata = array();
        while($row = mysqli_fetch_assoc($result)){
            $mydata[] = $row;
        }
        echo '{"state" : true, "message" : "讀取訂單進度選項成功", "data" : '.json_encode($mydata).'}';
    }else{
        echo '{"state":false, "message":"讀取訂單進度選項失敗"}';
    }

    mysqli_close($conn);
?>