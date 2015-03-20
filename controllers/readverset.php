<?php

require '../classes/aya.php';
require '../classes/SqlConnexion.php';
header('Content-Type: text/html; charset=utf-8');

/*
$ayaNumber=(int)$_POST['aya'];
$souraNumber=(int)$_POST['soura'];
echo getVetset($souraNumber, $ayaNumber);
*/
function getVetset($soura,$aya){
	$filename = "quran-simple.xml";
	$xml_file=simplexml_load_file($filename);
	$attr= $xml_file->sura[$soura-1]->aya[$aya-1]->attributes();
    return $attr['text'];
}

function getCitation($soura,$ayaBegin,$ayaEnd)
{
	$count=$ayaBegin;
	$citation=array();
	array_push($citation, "[");
	while ($count <= $ayaEnd) {
		array_push($citation,getVetset($soura, $count));
		array_push($citation,$count);	
		$count=$count+1;
	}
	array_push($citation,"]");
	array_push($citation,"(");
	array_push($citation,getSouraName($soura));
	array_push($citation," ".$ayaBegin);
	array_push($citation,"-");
	array_push($citation,$ayaBegin." ");
	array_push($citation,")");
	return $citation;	
}

function getSouraName($soura)
{
	if ($soura<=114 and $soura>0) {
		$filename = "quran-simple.xml";
		$xml_file=simplexml_load_file($filename);
		$attr= $xml_file->sura[$soura-1]->attributes();
	    return $attr['name'];
	} else {
		return 0;
	}
	
	
}

function getSoura($id)
{
	$connection =new SqlConexion("localhost","root","","quran");
	$connection->connecter();
	echo "<pre>";
	$stmt=$connection->SelectQuery("select * from quran where ID=".$id);
	$row = $stmt->fetch();
	$aya=new aya(0,0);
	$aya->souraId=$row['SuraID'];
    $aya->ayaId=$row['VerseID'];
	echo getVetset($aya->souraId, $aya->ayaId);
	return $aya;
	
}


?>


