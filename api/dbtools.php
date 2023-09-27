<?php
    $dataname = "awandb";
    // $dataname = "id21182534_awan";
    // 建立連線的函式
    function create_connect(){
        $link = mysqli_connect("localhost", "owner", "123456") or die("連線失敗".mysqli_connect_error());
        // $link = mysqli_connect("localhost", "id21182534_owner", "@Ginger123456") or die("連線失敗".mysqli_connect_error());
        return $link;
    }
    // 建立執行sql指令的函式
    function execute_sql($link, $dbname, $sql) {
        mysqli_select_db($link, $dbname) or die("連線資料失敗".mysqli_error($link));
        $result = mysqli_query($link, $sql);
        return $result;
    }
?>