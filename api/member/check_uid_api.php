<?php
    require_once "../host.php";
//input uid(不得為空白，必須存在)
//output
//{"state":true, "message":"uid驗證成功","data":"會員資料(除密碼外)"}
//{"state":false, "message":"uid驗證失敗"}
//{"state":false, "message":"欄位不允許空白"}
//{"state":false, "message":"欄位錯誤"}
if(isset($_POST["uid"])){
    if($_POST["uid"] != "" ){
        $p_uid = $_POST["uid"];

        require_once "../dbtools.php";
        $conn = create_connect(); //建立連線
        $sql = "SELECT ID, UserAcount, Nickname, Email, Birthday, Phone, Uid, Created_at FROM member WHERE Uid = '$p_uid' ";
        $result = execute_sql($conn, $dataname, $sql); //$dataname由dbtools.php而來
        
        if(mysqli_num_rows($result) == 1){
            //取資料傳到前端
            $mydata = array();

            while($row = mysqli_fetch_assoc($result)){
                $mydata[] = $row;
            }
            echo '{"state":true, "message":"uid驗證成功","data" : '.json_encode($mydata).'}';
        
        }else{
            echo '{"state":false, "message":"uid驗證失敗"}';
        }

        mysqli_close($conn);
    



    }else{
        echo '{"state":false, "message":"欄位不允許空白"}';
    }
}else{
    echo '{"state":false, "message":"欄位錯誤"}';
}



?>