<?
	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
					'1155002007', 'Iqg54OLM');
	$query = $dbh->prepare("SELECT * FROM LAST");
	$query->execute();
	$row = $query->fetch();
	echo $row['time'];
?>
