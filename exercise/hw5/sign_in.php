<?php 
     session_start();
     $login = trim($_POST["login"]);
     $_SESSION["login"] = $login;
     $password = $_POST["password"];
	$username = "2doDB/$login";
     $users = glob("2doDB/*");
     if(!in_array($username,$users)){
     	header("Location: error.php?type=login1");
         // header();
     }else{
     	$info = file("$username/info.txt");
     	$real_passwd = $info[0]-"\n";
     	if($real_passwd==$password){
	 	header("Location: notes.php");
	 	}else{
	 	header("Location: error.php?type=login2");
	 	}
     }

     
     
	 
?>   
    
	


