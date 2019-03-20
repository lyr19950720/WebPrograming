<?php
	$username = $_POST['username'];
	$password = $_POST['password'];
    if(!is_dir($username)){
    	$filename = "UserInfo/$username";
    	mkdir($filename);
    	file_put_contents($filename."/info.txt", $username+"\n",FILE_APPEND);
    	file_put_contents($filename."/info.txt", $password);
    	echo 1;
    }else{

    	echo 0;
    }
?>