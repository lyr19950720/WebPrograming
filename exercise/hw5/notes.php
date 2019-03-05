<?php 
 include("include/util.php");
 check($_SESSION);
 $sub_folder = $_SESSION["login"];
 $notes = glob("2doDB/$sub_folder/notes/*");
 $notes_length = count($notes);
 ?>
 <!DOCTYPE html>
 <html>
   <head>
     <title>2DO</title>
     <meta charset="utf-8" />
     <link href="css/main.css" type="text/css" rel="stylesheet" />
   </head>
 <body>
	
 	<a id="logout" href="logout.php">
 		<input class="button" type="button" value="Logout" />
 	</a>
	
 	<div id="top_banner">
 		<form method="post" action="add_note.php">
 			<div>
 				<span class="left"><?=$sub_folder?>'s <span id="logo">2DO</span> notes</span>
 			</div>
			<div class="right">
 				<input class="button right" type="submit"  value="Add note" title="add a new note"/>
 				<input class="right" type="text" name="note_title" />
 				<div>Enter the title of your new note here</div>
 			</div>
 		</form>
 	</div>
	
 	<div id="content">
 	<?php
 		 $i=1;
 		 foreach ($notes as $path ) {?>	
 	     <form class="list left" action="perform_action.php" method="post">	
		
 		 	<?php 
 		 	//$content_path = "2doDB/$sub_folder/notes";
 		 	$content = file($path);?>
 		 	<input type="hidden" name="todo_id" value="<?= basename($path)?>" />
 			<div class="note_title" title="<?= $content[1]?>">
 			<?= $content[0]?>			
 			<input class="button right" type="submit" name="delete_note" value="X" title="delete this note"/>
 		</div>	
		
 		<ul>
 			<?php
 			 $content_size = count($content);
 			 for ($j=2; $j < $content_size  ; $j++) {?>
 				<li> <span class="todo"><?= $content[$j]?></span> </li>
 			 			<?php }?>			
 				</ul>
 		<div>
 			<input class ='left text_input' type="text" name="new_todo" />
 			<input class ='right button' type="submit" name="add_todo" value="+" title="add a todo"/>
 		</div>	 
 	</form> 
 	<?php $i++;}?>
	
 </div>
 </body>
 </html>