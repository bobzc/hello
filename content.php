<?
	$version = $_GET['version'];
	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
					'1155002007', 'Iqg54OLM');

	$query = $dbh->prepare("SELECT * FROM LAST");
	$query->execute();
	$row = $query->fetch();
	$time = $row['time'];
	
	if($version < $time){
		$content = "";
		$query = $dbh->prepare("SELECT * FROM Photos ORDER BY time DESC");
		$query->execute();
		while($row = $query->fetch()){
			$src = "./thumbnail/thumb-$row[filename]";
			$content .= "<div><div><img src='$src' title='$row[description]'></div><span>E</span><span>X</span></div>";
		}
		$arr = array('time' => $time, 'content' => $content);
		echo json_encode($arr);

	}else{
		echo "not-modified";
	}

?>
