<?php

require '../classes/aya.php';
require '../classes/SqlConnexion.php';
function getVetset($soura,$aya){
	$filename = "quran-simple.xml";
	$xml_file=simplexml_load_file($filename);
	$attr= $xml_file->sura[$soura-1]->aya[$aya-1]->attributes();
    return $attr['text'];
}

function getSoura($id)
{
	$connection =new SqlConexion("localhost","root","","quran");
	$connection->connecter();
	echo "<pre>";
	$stmt=$connection->SelectQuery("select * from quran where ID=".$id);
	$row = $stmt->fetch();
	$aya=new aya(0,0,0);
    $aya->id=$id;
	$aya->souraId=$row['SuraID'];
    $aya->ayaId=$row['VerseID'];
	echo getVetset($aya->souraId, $aya->ayaId);
	return $aya;
	
}


?>


