<?php
    require_once "../host.php";
    if(isset($_POST["uid"])){
        if($_POST["uid"]){
            $p_uid = $_POST["uid"];
            require_once "../dbtools.php";
            $conn = create_connect();
            $sql = "SELECT UserAcount, Username, Nickname, Email, Birthday, Phone, Uid, Photo FROM member WHERE Uid = '$p_uid'";
            $result = execute_sql($conn, $dataname, $sql); //$dataname由dbtools.php而來
            if(mysqli_num_rows($result) == 1){
                //取資料傳到前端
                $mydata = array();
    
                while($row = mysqli_fetch_assoc($result)){
                    $mydata[] = $row;
                }
                echo '{"state":true, "message":"取得資料成功","data" : '.json_encode($mydata).'}';
            
            } else {
                echo '{"state":false, "message":"取得資料失敗"}';
            }
    
            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }
?>