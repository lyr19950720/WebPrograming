<?php
	include("include/util.php");
	$group_id = $_GET["group_id"];
	$next_id = file_get_contents(dbpath($group_id)."/next_player.txt");
	echo $next_id;
?>