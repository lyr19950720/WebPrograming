<?php
	$forders = glob("Data/group-r*");
	//echo $forders[3];
	$count = count($forders);
/*	for($i=0; $i<count($forders); $i++)
		echo "$forders[$i]";*/
	$count -= 1;	
	if(!is_dir("Data/group-r$count"))
		$count +=1;
	if(is_dir("Data/group-r$count/player-1"))
		$count += 1;
	echo "r".$count;
?>