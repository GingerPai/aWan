<?php
    require_once "../host.php";
if (isset($_FILES['file']['name']) && $_FILES['file']['name'] != "" && isset($_POST['userAcount']) && $_POST['userAcount'] != "") {
    if ($_FILES['file']['type'] == 'image/jpeg' || $_FILES['file']['type'] == 'image/png') {
        $p_userAcount = $_POST['userAcount'];

        $p_photo = substr(hash('sha256', uniqid(time())), 0, 10) . '_' . $_FILES['file']['name'];
        $location = '../../upload/photo/' . $p_photo; //指定圖片上傳的位置

        if (move_uploaded_file($_FILES['file']['tmp_name'], $location)) {
            $datainfo = array();
            $datainfo["location_name"] = $location;
            $datainfo["origin_name"] = $_FILES['file']['name'];
            $datainfo["type"] = $_FILES['file']['type'];
            $datainfo["size"] = $_FILES['file']['size'];
            $datainfo["tmp_name"] = $_FILES['file']['tmp_name'];

            require_once "../dbtools.php";
            $conn = create_connect();
            $sql = "UPDATE member SET Photo = '$p_photo' WHERE UserAcount = '$p_userAcount'";

            //$dataname由../dbtools.php而來
            if (execute_sql($conn, $dataname, $sql)) {
                echo '{"state":true, "message":"檔案上傳成功並更新圖片名稱成功"}';
            } else {
                echo '{"state":false, "message":"檔案上傳成功但更新圖片名稱失敗"}';
            }

            mysqli_close($conn);
        } else {
            echo '{"state":false, "message": "檔案上傳失敗"}';
        }
    } else {
        echo '{"state":false, "message": "檔案不符合規定(png or jpeg)"}';
    }
} else {
    echo '{"state":false, "message": "檔案不存在"}';
}
?>
