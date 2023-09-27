<?php
    require_once "../host.php";
    if(isset($_POST["orderNumber"])){
        if($_POST["orderNumber"]){
            $p_orderNumber = $_POST["orderNumber"];
            require_once "../dbtools.php";
            $conn = create_connect();
            $sql = "SELECT * FROM `memberorderlist` WHERE OrderNumber = '$p_orderNumber'";
            $result = execute_sql($conn, $dataname, $sql); //$dataname由dbtools.php而來

            if(mysqli_num_rows($result)>0){
                //取資料傳到前端
                $mydata = array();
                
                while($row = mysqli_fetch_assoc($result)){
                    $mydata[] = $row;
                }

                require_once "../dbtools.php";
                $conn = create_connect();
                $sql_02 = "SELECT mo.OrderNumber, os.status FROM memberorder AS mo JOIN orderstate AS os ON mo.State = os.ID WHERE OrderNumber = '$p_orderNumber'";
                $result_02 = execute_sql($conn, $dataname, $sql_02); //$dataname由dbtools.php而來
                if(mysqli_num_rows($result_02) == 1) {
                    $mydata_02 = array();
                    while($row = mysqli_fetch_assoc($result_02)){
                        $mydata_02[] = $row;
                    }
                }else{
                    echo '{"state":false, "message":"取得訂單狀態失敗"}';
                }

                echo '{"state":true, "message":"取得訂單內容成功","data":'.json_encode($mydata).' ,"orderstatus":'.json_encode($mydata_02).'}';
            
            } else {
                echo '{"state":false, "message":"取得訂單內容失敗"}';
            }
    
            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }
?>