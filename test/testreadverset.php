<?php

    $filename = "quran-simple.xml";
	$xml_file=simplexml_load_file($filename);
	echo "<pre>";
	print_r($xml_file);

function getVetset($soura,$aya){
	$filename = "quran-simple.xml";
	$xml_file=simplexml_load_file($filename);
	$attr= $xml_file->sura[$soura-1]->aya[$aya-1]->attributes();
    return $attr['text'];
}

?>


