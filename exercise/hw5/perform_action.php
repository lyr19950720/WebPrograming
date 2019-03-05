<?php
    include("include/util.php");
    $notes = glob(dbpath()."/*");
	$notes_length = count($notes);
    //$file_path = dbpath();
    $filename = $_POST["todo_id"];
	if (isset($_POST["delete_note"])) {
		unlink(dbpath()."/$filename");
		header("Location: notes.php");
	}
	else {
		$new_todo = trim($_POST["new_todo"]);
		if(empty($new_todo))
		{
			header("Location: error.php?type=todo");
		}else{			
            $fp = fopen(dbpath()."/$filename", 'r+');
            if ($fp) {    

                $i = 1;
                while (!feof($fp)) {
                    if ($i == 2) {
                    fseek($fp, 0, SEEK_CUR);
                    fwrite($fp, "Last Time ".get_date());
                    break;
                    }
                    fgets($fp);
                    $i++;
                }
                fclose($fp);
            } 

        	$new = "\n".$new_todo;	
			file_put_contents(dbpath()."/$filename", $new,FILE_APPEND);
			header("Location: notes.php");
		}
        
	}
	
?>