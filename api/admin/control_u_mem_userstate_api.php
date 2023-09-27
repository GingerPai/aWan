<?php
    require_once "../host.php";
    if(isset($_POST["id"]) && isset( $_POST["userstate"])){
        if($_POST["id"] != "" && $_POST["userstate"] != ""){
            $p_id = $_POST["id"];
            $p_userstate = $_POST["userstate"];
    
            require_once "../dbtools.php";
            
            $conn = create_connect();
            $sql = "UPDATE member SET UserState = '$p_userstate' WHERE ID = '$p_id'";
        
            if(execute_sql($conn, $dataname, $sql)){
                echo '{"state":true, "message":"更新會員權利狀態成功"}';
            }else{
                echo '{"state":false, "message":"更新會員權利狀態失敗"}';
            }
            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }




?>