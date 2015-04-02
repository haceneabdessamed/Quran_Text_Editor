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
///$cl->SetMatchMode(SPH_MATCH_PHRASE);
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
   	   return  (json_encode($resultat,JSON_UNESCAPED_UNICODE));
   }
   else 
         return "aucun resultat";
   }
   
} 
   
   

?>	
