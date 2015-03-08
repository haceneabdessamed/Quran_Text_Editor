<?php
require 'C:\sphinx\api\sphinxapi.php';
header('Content-Type: text/html; charset=utf-8');

$cl = new SphinxClient();
$cl->SetServer('127.0.0.1', 9300);
$cl->SetLimits(0,1000000);

$cl->AddQuery($_POST["query"], 'test1');
$result = $cl->RunQueries();
echo '<pre>';

  if ($result == false)
  {
   echo 'Query failed: ' . $cl->GetLastError() . "\n";
  }
   
   if ($cl->GetLastWarning())
   {
    echo 'WARNING: ' . $sphinx->GetLastWarning() . "\n";
   }
   foreach($result[0]['matches'] as $x => $x_value) {
    echo "id=" . $x;
    echo "<br>";
}
   print_r($result);

$vowels = array("َ","ً","ُ","ٌ","ٌ","ِ","ٍ","ْ","ّ","ٰ");
$onlyconsonants = str_replace($vowels, "", "إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ");
echo $onlyconsonants;
?>	
