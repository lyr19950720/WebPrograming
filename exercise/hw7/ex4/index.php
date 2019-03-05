<?php $image1 = glob("images/*.png");
      $image2 = glob("images/*.png");
      $total_image = array_merge_recursive($image1,$image2);
      //shuffle($total_image);
?>

<!DOCTYPE html>
<html>
  <head>
    <title>Memory</title>

    <meta charset="utf-8" />
    <link type="text/css" rel="stylesheet" href="memory.css" />
    <script type="text/javascript" src="memory.js"></script>
  </head>

<body>
	
<h1>Memory</h1>

<div id="grid">
	<div>
<?php 
      for($i = 0; $i < count($total_image); $i++){
          if( $i > 0 && $i % 4 == 0){
?>
      </div><div>
<?php 
    }
?>
      <img src="question-mark.png" onclick="click_image(<?= $i?>)" name="<?= $total_image[$i]?>" />
<?php 
    }
?>
      </div>
      
</div>

<div id="result"></div>

</body>
</html>
