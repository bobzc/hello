#!/usr/bin/php
<?
	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
					'1155002007', 'Iqg54OLM');
	$query = $dbh->prepare('SELECT * FROM Photos');
	$query->execute();
	while($row = $query->fetch()){
		print_r($row);
	}
?>
