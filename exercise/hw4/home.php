<?php
$dir_movie = "moviedb";
$movie_name = glob("$dir_movie/movie*");
$movie_length = count($movie_name);
?>

<!DOCTYPE html>
<html>
	<head>
		<title>Rancid Tomatoes</title>

		<meta charset="utf-8" />
		<link href="css/home.css" type="text/css" rel="stylesheet" />
	</head>

	<body>
		<div id="banner">
			<img src="images/rancidbanner.png" alt="Rancid Tomatoes" />
		</div>

		<h1>Movie reviews</h1>
			
<div id="content">
	<ul>
		<?php for($i = 1;$i <= $movie_length; $i++){
		$info = file("$dir_movie/movie$i/info.txt");
		?>
		<li>
			<?php if($info[2]<60){?>
			<img src="images/rotten.gif" alt="Rotten" />
			<?php }else {?>
			<img src="images/fresh.gif" alt="Fresh" />
			<?php } ?>
			<a class="link" href="movie.php?film=<?=$i?>"><?= $info[0]?></a>
		</li><?php }?>
		
	</ul>
	

</div>
<div id="addlink"><a href="add_movie_form.php">add new movie	</a></div>
<div id="footer">
	 2018 &copy; Rancid Tomatoes <img src="images/fresh.gif" alt="Fresh" />
</div>
	
	</body>
</html>
