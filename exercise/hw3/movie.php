<?php
  $folder = $_GET[ "film" ];
  $dir_movie = "moviedb/$folder";
  $info = file("moviedb/$folder/info.txt");
  $overview = file("$dir_movie/overview.txt");
?>
<!DOCTYPE html>
<html>
	<head>
		<title>TMNT - Rancid Tomatoes</title>
		<meta charset="utf-8" />
		<link href="movie.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<a href="home.html"><img id="goback" src="images/goback.png"> </a>
		<div id="banner">
			<img src="images/rancidbanner.png" alt="Rancid Tomatoes"  />
		</div> 
		<h1><?php echo $info[0]; ?> (2007)</h1>
		<div id = "all">
		    <div id = "right">
    		  <div>
        		<img src="<?=$dir_movie ?>/overview.png" alt="general overview" />
        	</div>
        	<dl >
        		<?php foreach ($overview as $ow){
        			$ow_dt = substr($ow, 0,strpos($ow, ":"));
        			$ow_dd = substr($ow, strpos($ow, ":")+1);
        		?>
        		<dt><strong> <?=$ow_dt?> </strong></dt>
        		<dd> <?=$ow_dd?> </dd>
        		<?php }?> 
        	</dl>
    		</div>
            <div id = "left">
    		    <div id = "top" >
        			<?php if($info[2]<60){?>
        		        <img src="images/rottenlarge.png" alt="Rotten" />
        			<?php }else{?>
        				<img src="images/freshlarge.png" alt="Rotten" />
        			<?php }?>
        			<span><?=$info[2]?>%</span>
       			
        		</div>

    			  <?php $review = glob("$dir_movie/review*.txt");
    			  $length = count($review);?>
            <div id = "commentl">
         	    <?php  for($i = 0; $i < $length; $i++){
                $comment = file("$review[$i]");
                $comment[1] = strtolower($comment[1]);

                if($i==ceil($length/2))  {?>
         	  </div>
         	  <div id = "commentr">
         	   	<?php }?>
         		<p class = "text">
         		<img src="images/<?= $comment[1]?>.gif" alt="Rotten" />
         	    <q><?= $comment[0]?></q></p>
         		<p class = "critic"><img  src="images/critic.gif" alt="Critic" />
         		    <?= $comment[2]?><br><?= $comment[3]?></p>	    
         		    <?php }?>	
        		</div>     				   
    		 </div> 
    		  	<p id="foot">(1-<?= $length?>) of <?= $length?></p>
        </div>
     	 

	</body>
</html>
