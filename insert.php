<?
	$filename = $_FILES['file']['name'];
	$thumbnail_name = "thumb-$filename";


	// save uploaded image
	move_uploaded_file($_FILES['file']['tmp_name'],'upload/'.$filename);

	$ret = shell_exec("cd upload; identify $filename");
	$is_image = preg_match("/ PNG/", "$ret");
	$is_image = preg_match("/ JPEG/", "$ret") || $is_image;
	$is_image = preg_match("/ GIF/", "$ret") || $is_image;
	if(!$is_image){
		echo "error";
		return;
	}
	
	// generate thumbnail
	shell_exec("cd upload;
				convert -size 100x100 $filename -resize 100x100 +profile '*' $thumbnail_name;
				mv $thumbnail_name ../thumbnail/$thumbnail_name");
	shell_exec("cd upload; chmod 644 *");
	shell_exec("cd thumbnail; chmod 644 *");

	// check duplicated file name
	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
					'1155002007', 'Iqg54OLM');
	$query = $dbh->prepare('SELECT COUNT(*) FROM Photos WHERE filename=?');
	$query->execute(array($filename));

	// if duplicated file name
	if($query->fetchColumn() > 0 ){
		$time = time();
		$query = $dbh->prepare("UPDATE Photos SET time=?, description=? WHERE filename=?");	
		$query->execute(array($time, null, $filename));
	// if no duplicated file name
	}else{
		$time = time();
		$query = $dbh->prepare("INSERT INTO Photos (filename, time) VALUES (?, ?)");	
		$query->execute(array($filename, $time));
	}

	echo "<img src=./thumbnail/$thumbnail_name></img>";

	$time = time();
	$query = $dbh->prepare("UPDATE LAST SET time=? WHERE id=1");
	$query->execute(array($time));
?>
