<?php
	include("include/util.php");
	$existShip = 0;
    $finish = 1;
	$Ships = $_GET["ship_id"];
    $ship = substr($Ships,4);
 	$group_id = $_GET["group_id"];
    $player_id = $_GET["player_id"];
    $judge_id = 1 - $player_id;
    file_put_contents(dbpath($group_id)."/getclickResult"."-$player_id.txt",$ship.",",FILE_APPEND);
	$array = file(dbpath($group_id)."/player-$judge_id/info.txt");
	for ($i=1; $i < count($array); $i+=2) { 
		$ships = explode(",", $array[$i]);
		if(in_array($ship, $ships)){
			$existShip = 1;
			$array[$i-1] = (substr($array[$i-1],0,1)-1)."\n";
			file_put_contents(dbpath($group_id)."/player-$judge_id/info.txt",$array);
			if($array[$i-1] == 0){
				echo $i-1;		
			}
			else{
			    echo $i;
			}
			file_put_contents(dbpath($group_id)."/next_player.txt",$player_id);
		}
		if($array[$i-1] != 0)
			$finish = 0;		
	}
 		if(!$existShip)	{
    		echo "n";
    		file_put_contents(dbpath($group_id)."/next_player.txt",$judge_id);
    	}
    	echo $finish;

?>