<?php 
include("include/util.php");
if(empty(get_title()))
{
	header("Location: error.php?type=note");
}else{
    $add_title =  get_title()."\n"."Created ".get_date(); 
    print(note_id());
	file_put_contents(dbpath()."/".(note_id()+1), $add_title,FILE_APPEND);
 	header("Location: notes.php");
}

?>