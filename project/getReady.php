<?php
	include("include/util.php");
	$group_id = $_GET["group_id"];
	
		$player_number = file_get_contents(dbpath($group_id)."/current_player.txt");
 	if($player_number == 2){
 		echo 1;
 	}else{
 		echo 0;
 	}
	
 	
?>