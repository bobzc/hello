<?
	$filename = $_GET['filename'];
	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
				'1155002007', 'Iqg54OLM');
	$query = $dbh->prepare("DELETE FROM Photos WHERE filename=?");

	$query->execute(array($filename));
	shell_exec("cd upload; rm $filename");
	shell_exec("cd thumbnail; rm thumb-$filename");

	$time = time();
	$query = $dbh->prepare("UPDATE LAST SET time=? WHERE id=1");
	$query->execute(array($time));
?>
