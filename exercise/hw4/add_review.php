<?php
  $movie_id = $_GET["film"];
  $review = trim($_GET["review"]);
  $rating = $_GET["rating"];
  $name = trim($_GET["name"]);
  $organization = trim($_GET["organization"]);
  if (empty($review) || empty($name) || empty($organization)){
    header("Location:add_review_error.php?film=$movie_id");
  }
  else{
      $reviews = glob("moviedb/movie$movie_id/review*.txt");
    $review_length = count($reviews);
    $review_path = "moviedb/movie$movie_id/review";
    $add_review = $review."\n".$rating."\n".$name."\n".$organization;
 
    file_put_contents("$review_path".($review_length+1) .".txt",$add_review);
  
    header("Location: movie.php?film=$movie_id");
  }


  // $comment = array('review' => $_GET["review"] ,
  //        'rating' => $_GET["rating"] ,
  //        'name' => $_GET["name"] ,
  //        'organization' => $_GET["organization"] ,         
  //      ); 
 //$add_review = implode("\n", $comment);
 //file_put_contents("moviedb/movie$movie_id/review".($review_length+1) .".txt",$add_review);
  
 
?>