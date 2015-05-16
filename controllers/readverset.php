<?php

require '../classes/aya.php';
require '../classes/SqlConnexion.php';
header('Content-Type: text/html; charset=utf-8');

$function =$_POST['function'];
switch ($function) {
	case 'LireVerset':
		$ayaNumber=(int)$_POST['aya'];
		$souraNumber=(int)$_POST['soura'];
		echo getCitation($souraNumber, $ayaNumber, $ayaNumber);
		///echo getVetset($souraNumber, $ayaNumber);
		break;
	case 'LireCitation':
		$souraNumber=(int)$_POST['soura'];
		$ayaBegin=(int)$_POST['ayaBegin'];
		$ayaEnd=(int)$_POST['ayaEnd'];
		echo getCitation($souraNumber, $ayaBegin, $ayaEnd);
		break;
	default:                                                                    
		
		break;
}


function getVetset($soura,$aya){
	$filename = "quran-simple.xml";
	$xml_file=simplexml_load_file($filename);
	$attr= $xml_file->sura[$soura-1]->aya[$aya-1]->attributes();
	if ($aya==1) {
		$res=$attr['text'];
		return $res;
	} else {
		return $attr['text'];
	}
	
}

function getTafssir($soura,$aya){
	
}

function getCitation($soura,$ayaBegin,$ayaEnd)
{

	$count=$ayaBegin;
	$indice=3;
	$citation=array();
	$citation[0]=getSouraName($soura);
	$citation[1]=$ayaBegin;
	$citation[2]=$ayaEnd;
	while ($count <= $ayaEnd) {
		$citation[$indice]=getVetset($soura, $count);
		$indice=$indice+1;
		$count=$count+1;
	}
	return (json_encode($citation,JSON_UNESCAPED_UNICODE));
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

function getSouraIndex($souraName){
	$xml = simplexml_load_file("quran-data.xml");
	$result = $xml->xpath("suras//sura[@name=$souraName]");
	$index=$result[0]->attributes();
	return $index['index'];
}

function getSoura($id)
{
	$connection =new SqlConexion("localhost","root","","quran");
	$connection->connecter();
	$stmt=$connection->SelectQuery("select * from quran where id=".$id);
	$row = $stmt->fetch();
	$aya=new aya(0,0,0);
	$aya->souraId=$row['SuraID'];
    $aya->ayaId=$row['VerseID'];
	$aya->texte=getVetset($aya->souraId,$aya->ayaId);
	return $aya;
	
}

function getTaffsirFromId($id,$source)
{
	$connection =new SqlConexion("localhost","root","","quran");
	$connection->connecter();
	$stmt=$connection->SelectQuery("select * from ".$source." where id=".$id);
	$row = $stmt->fetch();
	$tafssir=new tafssir(0,0,0);
	$tafssir->souraId=$row['sura'];
    $tafssir->ayaId=$row['aya'];
	$tafssir->texte=$row['text'];
	$tafssir->type=$source;
	return $tafssir;
	
}
function getTaffsir($sura,$aya,$source)
{
	$connection =new SqlConexion("localhost","root","","quran");
	$connection->connecter();
	$stmt=$connection->SelectQuery("select * from ".$source." where sura= ".$sura." and aya=".$aya);
	$row = $stmt->fetch();
	$tafssir=new tafssir(0,0,0);
	$tafssir->souraId=$row['sura'];
    $tafssir->ayaId=$row['aya'];
	$tafssir->texte=$row['text'];
	$tafssir->type=$source;
	return $tafssir;
	
}

function getTraductionFromId($id,$source)
{
	$connection =new SqlConexion("localhost","root","","quran");
	$connection->connecter();
	$stmt=$connection->SelectQuery("select * from ".$source." where id=".$id);
	$row = $stmt->fetch();
	$tafssir=new tafssir(0,0,0);
	$tafssir->souraId=$row['sura'];
    $tafssir->ayaId=$row['aya'];
	$tafssir->texte=$row['text'];
	$tafssir->type=$source;
	return $tafssir;
	
}
function getTraduction($sura,$aya,$source)
{
	$connection =new SqlConexion("localhost","root","","quran");
	$connection->connecter();
	$stmt=$connection->SelectQuery("select * from ".$source." where sura= ".$sura." and aya=".$aya);
	$row = $stmt->fetch();
	$tafssir=new tafssir(0,0,0);
	$tafssir->souraId=$row['sura'];
    $tafssir->ayaId=$row['aya'];
	$tafssir->texte=$row['text'];
	$tafssir->type=$source;
	return $tafssir;
	
}


?>


