<?
	file_put_contents("a", $_FILES['file']['tmp_name']);
	move_uploaded_file($_FILES['file']['tmp_name'],'upload/'.$_FILES['file']['name']);

?>
