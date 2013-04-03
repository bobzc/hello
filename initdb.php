#!/usr/bin/php

<?
	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
					'1155002007', 'Iqg54OLM');
	$sth = $dbh->exec('DROP TABLE Photos');
	$sth = $dbh->exec('CREATE TABLE Photos(filename CHAR(100) PRIMARY KEY,
										   time BIGINT,
										   description CHAR(100), 
										   width INT,
									   	   height INT)');
	$sth = $dbh->exec('CREATE TABLE LAST(time BIGINT)');
	$time = time();
	$sth = $dbh->exec("INSERT INTO LAST VALUES ($time)");
?>	
