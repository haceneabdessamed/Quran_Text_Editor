<?php


function getVetset($soura,$aya){
	$filename = "quran-simple.xml";
	$xml_file=simplexml_load_file($filename);
	$attr= $xml_file->sura[$soura-1]->aya[$aya-1]->attributes();
    return $attr['text'];
}

function getSoura($id)
{
	
}

function getAya($soura)
{
	
}
?>


