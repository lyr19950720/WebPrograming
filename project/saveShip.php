<?php
		include("include/util.php");
		if(isset($_GET["Rand"])){
		    $start_id = $_GET["Rand"];
    		$ship_size = $_GET["ship_size"];
    		$group_id = $_GET["group_id"];
            // $random_id = 0;
            // if($group_id == ""){
            //     $group_id =  $random_id;

            // }
    		if(!is_dir(dbpath($group_id))){
    			mkdir(dbpath($group_id));
    		}
    		$current_player = dbpath($group_id)."/current_player.txt";
    		if(!file_exists($current_player)){
    			
    			file_put_contents($current_player,0);
    		}
    		$player_number = file_get_contents($current_player);    

    		if($player_number > 1){
    			file_put_contents($current_player,"0");
    			$player_number = file_get_contents($current_player);
    		}
    		$ship_size = explode(",",$ship_size);
    		$start_id = explode(",",$start_id);
    		$player_file = get_player($group_id,$player_number);
    		if(!is_dir($player_file)){
    			mkdir($player_file);
    		}
    	    file_put_contents($player_file."/info.txt","");

    	    for ($i=0; $i < 5; $i++) { 
    	   		file_put_contents($player_file."/info.txt",$ship_size[$i]."\n",FILE_APPEND);
    	   		for ($j=0; $j < $ship_size[$i]; $j++) { 
    	   			file_put_contents($player_file."/info.txt",(int)$start_id[$i]+(int)$j.",",FILE_APPEND);
    	   		}
    	   	file_put_contents($player_file."/info.txt","\n",FILE_APPEND);	   	
    	   }
           fopen(dbpath($group_id)."/getclickResult"."-$player_number.txt","w");
           $player_border = get_border($group_id);
            //echo $player_border;
            if(!is_dir($player_border)){
                mkdir($player_border);
            }
            fopen($player_border."/player$player_number.txt","w");
    	    echo $player_number;

    	    $player_number++;
    	    file_put_contents($current_player,$player_number);
           

	}
			

     	if(isset($_GET["border"])){
     		$border = $_GET["border"];
     		$player_id = $_GET["player_id"];
            $group_id = $_GET["group_id"];
     		file_put_contents(get_border($group_id)."/player$player_id.txt",$border.",",FILE_APPEND);
     	}
?>