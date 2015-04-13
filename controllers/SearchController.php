<?php
require 'C:\sphinx\api\sphinxapi.php';
require 'readverset.php';
header('Content-Type: text/html; charset=utf-8');

$query=$_POST["query"];
echo getResults($query);


function getResults($query)
{
$cl = new SphinxClient();
$cl->SetServer('127.0.0.1', 9300);
$cl->SetLimits(0,20);
//$cl->SetRankingMode (SPH_RANK_PROXIMITY_BM25);
$cl->SetMatchMode(SPH_MATCH_ANY);
$cl->SetRankingMode (SPH_RANK_PROXIMITY_BM25);
$cl->AddQuery($query, 'test1');
$result = $cl->RunQueries();
  if ($result == false)
  {
   return 'Query failed: ' . $cl->GetLastError() . "\n";
  }
   
  else {
   if ($cl->GetLastWarning())
   	{
        return 'WARNING: ' . $sphinx->GetLastWarning() . "\n";
   	}
   $metadata=array(); 
   $metadata[0]=$result[0]['total'];
   $metadata[1]=$result[0]['time'];
   $metadata[2]=$result[0]['words'];
   if($result[0]['total']>0)
   {
 
   	  $resultat=array();
   	  $indice=0;
   	  foreach($result[0]['matches'] as $x => $x_value) 
       {
       	    
		    $aya=getSoura($x);
			$resultat[$indice]=$aya;
		    $indice=$indice+1;
	   }
	$metadata[3]=$resultat;
   	   return  (json_encode($metadata,JSON_UNESCAPED_UNICODE));
   }
   else 
   	$metadata[3]="0";
    return  (json_encode($metadata,JSON_UNESCAPED_UNICODE));
   }
   
} 

?>	
