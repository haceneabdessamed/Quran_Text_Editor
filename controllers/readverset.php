<?php

$aya  =(int) $_POST['aya']-1;
$soura=(int) $_POST['soura']-1;

$filename = "quran-simple.xml";
$xml_file=simplexml_load_file($filename);

///echo '<pre>';
///print_r($xml_file);
$attr= $xml_file->sura[$aya]->aya[$soura]->attributes();
echo '['.$attr['text'].']';

?>
