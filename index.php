<!DOCTYPE HTML>
<html>
<head>
<link rel="stylesheet" type="text/css" href="./main.css"></head>
</head>
<body>
<div id=container>
	<header></header>

	<article id=display>
<?
	$dbh = new PDO('mysql:host=pc89074.cse.cuhk.edu.hk;dbname=1155002007', 
					'1155002007', 'Iqg54OLM');
	$query = $dbh->prepare("SELECT * FROM Photos ORDER BY time DESC");
	$query->execute();
	while($row = $query->fetch()){
		$src = "./thumbnail/thumb-$row[filename]";
		echo "<div><div><img src='$src' title='$row[description]'></div><span>E</span><span>X</span></div>";
	}
?>
	</article>
	<div id="dropbox"></div>
	<div id="feedback"></div>
	<progress id="progressbar" min=0 max=100 value=0></progress>
</div>

<script src="./remote_action.js"></script>
</body>
</html>
