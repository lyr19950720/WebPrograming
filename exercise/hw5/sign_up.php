<?php
    session_start();

    $folder = "2doDB";
    $firstname = trim($_POST["firstname"]);
    $lastname = trim($_POST["lastname"]);
    $Login = trim($_POST["login"]);
    $password = trim($_POST["password"]);
    $username = "$folder/$Login";
    $sub_folder = glob("$folder/*");
    
    if(empty($firstname)){
    	header("Location:error.php?type=firstname");
     }
    elseif(empty($lastname)){
    	header("Location:error.php?type=lastname");
    }
    elseif(empty($Login)){
    	header("Location:error.php?type=logup");
    }
    elseif(empty($password)){
    	header("Location:error.php?type=pswup");
    }
	elseif(in_array($username, $sub_folder)){
		//unlink($username);
		header("Location:error.php?type=logup2");
	}else{ 
        mkdir($username);
        $notes = "$username/notes";
        print "$notes";
        mkdir($notes);
        $info = $password."\n".$firstname."\n".$lastname;
        $info_path = "$username/info".".txt";
        file_put_contents("$info_path", $info);
        header("Location:sign_in_form.php");
    }

?>