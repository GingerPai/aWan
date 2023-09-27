<?php
    require_once "../host.php";
    if(isset($_POST["memberAcount"]) && isset($_POST["password"])){
        if($_POST["memberAcount"] != "" && $_POST["password"] != ""){
            $p_memberAcount = $_POST["memberAcount"];
            $p_password = substr(md5($_POST["password"]), 0, 5).substr(md5($_POST["password"]), 27, 5);
            require_once "../dbtools.php";

            $conn = create_connect();
            $sql = "SELECT UserAcount, Password, UserState FROM member WHERE UserAcount = '$p_memberAcount' and Password = '$p_password'";
            $result = execute_sql($conn, $dataname, $sql);//$dataname由dbtools.php而來

            if(mysqli_num_rows($result) == 1){
                //登入成功
                //登入成功時 1.產生uid回傳至前端(儲存至cookie)，
                //2.並儲存至資料庫
                $uid = substr(hash('sha256', uniqid(time())), 0 ,10); //登入成功時 1.產生uid回傳至前端(儲存至cookie)，

                $sql = "UPDATE member SET Uid = '$uid' WHERE UserAcount = '$p_memberAcount'";

                if (execute_sql($conn, $dataname, $sql)){
                    //撈取出最新的會員資料
                    $sql = "SELECT ID, UserAcount, Nickname, Email, Birthday, Phone, Uid, UserState FROM member WHERE UserAcount = '$p_memberAcount' AND Password = '$p_password' ";
                    $result = execute_sql($conn, $dataname, $sql);

                    $mydata = array();
                    
                    while($row = mysqli_fetch_assoc($result)){
                        $mydata[] = $row;
                    }

                    echo '{"state" : true, "message" : "登入成功", "data" :'.json_encode($mydata).'}';
                }else{
                    echo '{"state" : false, "message" : "uid更新失敗"}';

                }
                
            }else{
                //登入失敗
                echo '{"state":false, "message":"登入失敗，帳號密碼不存在"}';
            }

            mysqli_close($conn);
        }else{
            echo '{"state":false, "message":"欄位不允許空白"}';
        }
    }else{
        echo '{"state":false, "message":"欄位錯誤"}';
    }
?>