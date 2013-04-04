#!/usr/bin/php
<?
	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
					'1155002007', 'Iqg54OLM');
	$time = time();
	$query = $dbh->prepare("UPDATE LAST SET time=? WHERE id=1");
	$query->execute(array($time));
?>
