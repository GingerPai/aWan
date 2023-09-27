<?php
    require_once "../host.php";
//input uid(不得為空白，必須存在)
//output
//{"state":true, "message":"uid驗證成功","data":"會員資料(除密碼外)"}
//{"state":false, "message":"uid驗證失敗"}
//{"state":false, "message":"欄位不允許空白"}
//{"state":false, "message":"欄位錯誤"}
if(isset($_POST["uid_a"])){
    if($_POST["uid_a"] != "" ){
        $p_uid_a = $_POST["uid_a"];

        require_once "../dbtools.php";
        $conn = create_connect(); //建立連線
        $sql = "SELECT EmpID, Department, JobLevel, Name, State FROM employees WHERE UidA = '$p_uid_a' ";
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