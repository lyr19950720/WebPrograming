<?php
	include("include/util.php");
  	$group_id = $_GET["group_id"];
	$player_id = $_GET["player_id"];
	$judge_id = 1 - $player_id;
	$border = file_get_contents(get_border($group_id)."/player$judge_id.txt");
	echo $border;
?>