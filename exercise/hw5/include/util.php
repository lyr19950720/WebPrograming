<?php
 session_start();    
# returns the relative path of the database folder
function dbpath() {       
        $add_path = "2doDB/".get_name()."/notes";
        return $add_path;
        
}
# returns the username of the user of login $login
function get_name() {       
   return  $_SESSION["login"];       
}
# extract the note id (a number) from the file path
# of the file. For example, note_id("2doDB/marc/notes/3") returns "3"
function note_id() {
 $notes = glob("2doDB/".get_name()."/notes/*");
 $note_id = 0;
 foreach ($notes  as $value ) {
 	$i = basename($value);
 	
 	if($note_id < $i){
 		$note_id = $i;

 	}	
 }return $note_id;
}
# returns the title of the $note array
function get_title() {
 $note_title =trim($_POST["note_title"]) ;
 return $note_title;
}
# returns the date of the $note array
function get_date() {
 $date = date("y-m-n h:ia"); 
 return $date;
}
function check($value){
	if (!array_key_exists("login", $value)) {
		$type="";
		header("Location:error.php?type=$type");
	}
}
?>
