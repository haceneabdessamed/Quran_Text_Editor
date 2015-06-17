<?php

require 'aya.php';
require 'SqlConnexion.php';


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

function getCitation($soura,$ayaBegin,$ayaEnd,$reference)
{
    
	$count=$ayaBegin;
	$indice=3;
	$citation=array();
	$citation[1]=$ayaBegin;
	$citation[2]=$ayaEnd;
	switch ($reference) {
		case 'quran':
		$citation[0]=getSouraName($soura,'ar');
		while ($count <= $ayaEnd) {
		$citation[$indice]=getVetset($soura, $count);
		$indice=$indice+1;
		$count=$count+1;
		}
		break;
		case 'sa3dy':
		$citation[0][0]=" تفسير السعدي - ".getSouraName($soura,'ar');
		while ($count <= $ayaEnd) {
		$citation[$indice][0]=getTaffsir($soura, $count, 'sa3dy')->texte;
		$indice=$indice+1;
		$count=$count+1;
		}
		break;
		case 'fr_hamidullah':
		$citation[0]=getSouraName($soura,'fr');
		while ($count <= $ayaEnd) {
		$citation[$indice][0]=getTaffsir($soura, $count, 'fr_hamidullah')->texte;
		$indice=$indice+1;
		$count=$count+1;
		}
		break;
		case 'en_sahih':
		$citation[0]=getSouraName($soura,'en');
		while ($count <= $ayaEnd) {
		$citation[$indice][0]=getTaffsir($soura, $count, 'en_sahih')->texte;
		$indice=$indice+1;
		$count=$count+1;
		}
		break;
	}
	
	return (json_encode($citation,JSON_UNESCAPED_UNICODE));
}

function getSouraName($soura,$lang)
{
	if ($soura<=114 and $soura>0) {
		$filename = "quran-data.xml";
		$xml_file=simplexml_load_file($filename);
		$attr= $xml_file->suras[0]->sura[$soura-1]->attributes();
		switch ($lang) {
			case 'ar':
			return $attr['name'];
			break;
			case 'fr':
			return $attr['tname'];
			break;
			case 'en':
			return $attr['tname'];
			break;
		}
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


