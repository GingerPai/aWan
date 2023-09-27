<?php
    require_once "../host.php";
    if(isset($_POST["state"]) && isset( $_POST["orderNumber"])){
        if($_POST["state"] != "" && $_POST["orderNumber"] != ""){
            $p_state = $_POST["state"];
            $p_orderNumber = $_POST["orderNumber"];
    
            require_once "../dbtools.php";
            
            $conn = create_connect();
            $sql = "UPDATE memberorder SET State = '$p_state' WHERE OrderNumber = '$p_orderNumber'";
        
            if(execute_sql($conn, $dataname, $sql)){

                require_once "../dbtools.php";
                $conn = create_connect();
                $sql_02 = "SELECT mo.OrderNumber, mo.State, os.ID AS orderstateID, os.CodeName, os.StateTitle, os.StateReason FROM memberorder AS mo JOIN orderstate AS os ON mo.State = os.ID WHERE OrderNumber = '$p_orderNumber'";
                $result_02 = execute_sql($conn, $dataname, $sql_02); //$dataname由dbtools.php而來
                if(mysqli_num_rows($result_02) == 1) {
                    $mydata_02 = array();
                    while($row = mysqli_fetch_assoc($result_02)){
                        $mydata_02[] = $row;
                    }
                }else{
                    echo '{"state":false, "message":"讀取更新訂單狀態失敗"}';
                }

                echo '{"state":true, "message":"更新訂單狀態成功","data":'.json_encode($mydata_02).'}';

            }else{
                echo '{"state":false, "message":"更新訂單狀態失敗"}';
            }
            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }




?>