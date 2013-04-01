#!/usr/bin/php
<?
	$filename="hello";	

	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
					'1155002007', 'Iqg54OLM');
	$sql = "SELECT COUNT(*) FROM Photos WHERE filename=".$filename;
	$result = $dbh->query($sql);
	if($result->fetchColumn() > 0)
		echo "true\n";
	else
		echo "false\n";
/*
//	$count =  $result->fetchColumn();
	if($count <= 0 ){
		$time = time();
		$query = $dbh->prepare("UPDATE Photos SET time=?, description=? WHERE filename=?");	
		$query->execute(array($time, null, $filename));
	}else{
		$time = time();
		$query = $dbh->prepare("INSERT INTO Photos (filename, time) VALUES (?, ?)");	
		$query->execute(array($filename, $time));
	}
*/
?>
