<?php
	$login = $_POST['login'];
	$password = $_POST['password'];
	if(!is_dir("UserInfo/$login")){
		echo 0;
	}else{
		$pas = file_get_contents("UserInfo/$login/info.txt");
	    if($pas != $password)    
	    	echo 1;
    	else 
    		echo 2;
	}
?>