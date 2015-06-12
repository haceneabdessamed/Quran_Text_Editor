<?php

require 'C:\sphinx\api\sphinxapi.php';
require 'controllers\SqlConnexion.php';
header('Content-Type: text/html; charset=utf-8');





$query='الكعبين';
$cl = new SphinxClient();
$cl->SetServer('127.0.0.1', 9300);
$cl->SetLimits(0,20);
$cl->SetMatchMode(SPH_MATCH_ANY);
$cl->AddQuery($query, 'test2');
$result = $cl->RunQueries();
echo "<pre>";
print_r($result);

$resultats=array();


	
foreach ($result[0]['matches'] as $key => $value) {
	$connection =new SqlConexion("localhost","root","","hadith_normalised");
	$connection->connecter();
	$stmt=$connection->SelectQuery("select * from boukhari where id=".$key);
	$row = $stmt->fetch();
	$resultats[$key]=$row['text'];
}

print_r($resultats);

?>