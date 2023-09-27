<?php
    require_once "../host.php";
    require_once "../dbtools.php";
    $conn = create_connect();
    $sql = "SELECT ID, UserAcount, Username, Nickname, Email, Birthday, Phone, Photo, UserState, Created_at FROM member ORDER BY ID";  //資料排序方式: ASC: 遞增，DESC: 遞減
    $result = execute_sql($conn, $dataname, $sql);
    if(mysqli_num_rows($result)>0){
        $mydata = array();
        while($row = mysqli_fetch_assoc($result)){
            $mydata[] = $row;
        }
        // echo '{"state" : true, "message" : "取得會員資料成功", "data" : '.json_encode($mydata).'}';
        echo '{"state" : true, "message" : "取得會員資料成功", "data" : '.json_encode($mydata).'}';
    }else{
        echo '{"state":false, "message":"查無會員資料"}';
    }

    mysqli_close($conn);
?>