<?php

require '../classes/aya.php';
require '../classes/SqlConnexion.php';
header('Content-Type: text/html; charset=utf-8');

$function =$_POST['function'];
switch ($function) {
	case 'LireVerset':
		$ayaNumber=(int)$_POST['aya'];
		$souraNumber=(int)$_POST['soura'];
		echo getVetset($souraNumber, $ayaNumber);
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
    return $attr['text'];
}

function getCitation($soura,$ayaBegin,$ayaEnd)
{
	/*
	$count=$ayaBegin;
	$citation=array();
	$citation['debut']="]";
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
	array_push($citation,$ayaEnd." ");
	array_push($citation,")");
	return json_encode($citation, JSON_UNESCAPED_UNICODE);
	 */
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


