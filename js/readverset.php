<?php

$filename = "quran-simple.xml";
$xml_file=simplexml_load_file($filename);
echo '<pre>';
print_r($xml_file);
$attr =$xml_file->sura[1]->aya[2]->attributes();
echo $attr['text'];

?>
