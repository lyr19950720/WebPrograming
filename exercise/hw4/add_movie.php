<?php
$movie_name = glob("moviedb/movie*");
$movie_length = count($movie_name); 
$new_movie = "moviedb/movie".($movie_length+1);
mkdir($new_movie);
move_uploaded_file($_FILES["info"]["tmp_name"], "$new_movie/info.txt");
move_uploaded_file($_FILES["overview"]["tmp_name"], "$new_movie/overview.txt");
move_uploaded_file($_FILES["image"]["tmp_name"], "$new_movie/overview.png");
for($i=1;$i<=10;$i++)
{
    $name = "review$i";
	if(is_uploaded_file($_FILES["$name"]["tmp_name"]))
	{
		move_uploaded_file($_FILES["$name"]["tmp_name"],"$new_movie/$name.txt");
	}
}
header("Location: home.php?film=$movie_id");
?>a