<?php
	include("include/util.php");
	$group_id = $_GET["group_id"];
	$player_id = $_GET["player_id"];
    $judge_id = 1 - $player_id;
	$isClicked = file_get_contents(dbpath($group_id)."/getclickResult"."-$judge_id.txt");
	echo $isClicked;
?>