<?php
    require_once "../host.php";
    if(isset($_POST["userAcount"])){
        if($_POST["userAcount"] != ""){
            $p_userAcount = $_POST["userAcount"];
            require_once "../dbtools.php";
            $conn = create_connect();
            $sql = "SELECT Username, Phone FROM member WHERE UserAcount = '$p_userAcount'";  //資料排序方式: ASC: 遞增，DESC: 遞減
            $result = execute_sql($conn, $dataname, $sql);
            if(mysqli_num_rows($result) == 1){
                
                $mydata = array();
                while($row = mysqli_fetch_assoc($result)){
                $mydata[] = $row;
                }
                echo '{"state" : true, "message" : "取得會員資料成功", "data" : '.json_encode($mydata).'}';

            }else{
                echo '{"state":false, "message":"查無會員資料"}';
            }

            mysqli_close($conn);


            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }
    
?>