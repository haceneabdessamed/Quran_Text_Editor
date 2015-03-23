<?php
header('Content-Type: text/html; charset=utf-8');
$xml = simplexml_load_file("quran-data.xml");
$result = $xml->xpath("suras//sura[@name='النحل']");
echo '<pre>';
/*print_r($result);*/
$index=$result[0]->attributes();
echo $index['index'];
?>