<?php
	//session_start();
	function dbpath($gid){
		$path = "Data/group-".$gid;
		return $path;
	}

	function get_current($gid){
		$current_player = dbpath($gid)."/current_player";
		return $current_player;

	}
	function get_player($gid,$player_number){
		
		return dbpath($gid)."/player-"."$player_number";
    		

	}
	function get_border($gid){
		return dbpath($gid)."/lrborder";

	}

?>