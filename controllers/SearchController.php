<?php
require 'C:\sphinx\api\sphinxapi.php';
require 'readverset.php';
header('Content-Type: text/html; charset=utf-8');


///echo (getNormalizedVerset(2,7));
///print_r(getMotsAlternatifQuery("لبيالسلاسيلاس"));
switch ($function=$_POST["function"]) {
	case 'simple':
		$query=$_POST["query"];
		$page =(int)$_POST["page"];
		echo getResults($query,$page);
		break;
	case 'suggestion':
		$query=$_POST["query"];
		echo getRealTimeSuggestion($query);
		break;
	default:
		break;
}

/*
$query="محمد";
$index="test1";
$resultats=array();
$opts=array();
$opts["before_match"]="<b>";
$cl = new SphinxClient();
$cl->SetServer('127.0.0.1', 9300);
$cl->SetLimits(0,20);
$cl->SetMatchMode(SPH_MATCH_ANY);
$cl->SetRankingMode (SPH_RANK_PROXIMITY_BM25);
$cl->AddQuery($query, 'test1');
$result = $cl->RunQueries();

$cl->SetServer('127.0.0.1', 9300);
$cl->SetLimits(0,20);
$cl->SetMatchMode(SPH_MATCH_ANY);
$cl->SetRankingMode (SPH_RANK_PROXIMITY_BM25);
$cl->AddQuery($query, 'test1');
$result = $cl->RunQueries();

$resultat=array();
   	  $indice=0;
   	  foreach($result[0]['matches'] as $x => $x_value) 
       {
       	    
		    $aya=getSoura($x);
			$resultat[$indice]=$aya;
			$resultats[$indice]=getNormalizedVerset($aya->souraId, $aya->ayaId);
		    $indice=$indice+1;
	   }
echo "<pre>";
$res=array();
$res=$cl->BuildExcerpts($resultats,"test1",$query,$opts);
///print_r(explode(" ",$res[0]));
/// tester dans la liste des mot 

foreach ($res as $key1 => $value1) {
	$cpt=$key1;
	foreach (explode(" ",$res[$key1]) as $key => $value) {
	if ($value[0]=="<"){
		$word=explode(" ", $resultat[$key1]->texte);
		echo ($res[$key1]);
		echo "<br>";
		$resultat[$key1]->texte=str_replace($word[$key],"<b>".$word[$key]."</b>", $resultat[$key1]->texte);
		echo ($resultat[$key1]->texte);
		echo "<br>";
	}

	}
}

foreach (explode(" ",$res[0]) as $key => $value) {
	if ($value[0]=="<"){
		$word=explode(" ", $resultat[0]->texte);
		///remplacer dans le texte du résultat 0 $word[$key] par "<b>".$word[key]."<b>"
		echo ($resultat[0]->texte);
		echo "<br>";
		echo (str_replace($word[$key],"<b>".$word[$key]."</b>", $resultat[0]->texte));
		
	}
}
*/
function getRealTimeSuggestion($query){
	$cl = new SphinxClient();
	$cl->SetServer('127.0.0.1', 9300);
	$cl->SetLimits(0,20);
	//$cl->SetRankingMode (SPH_RANK_PROXIMITY_BM25);
	$cl->SetMatchMode(SPH_MATCH_ANY);
	$cl->SetRankingMode (SPH_RANK_PROXIMITY_BM25);
	$cl->AddQuery($query, 'test1');
	$result = $cl->RunQueries();
	if ($result == false) {
		return 'Query failed: ' . $cl->GetLastError() . "\n";	
	} else {
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
				$resultats[$indice]=getNormalizedVerset($aya->souraId, $aya->ayaId);
			    $indice=$indice+1;
		   }
		$metadata[3]=$resultats;
	   	   return  (json_encode($metadata,JSON_UNESCAPED_UNICODE));
	   }
	   else 
	   	$metadata[3]="0";
	    $metadata[4]=getMotsAlternatifQuery($query);
	    return  (json_encode($metadata,JSON_UNESCAPED_UNICODE));
	   }
		
		
	}
	



function getResults($query,$page)
{
$inf=$page-1;
$resultats=array();
$opts=array();
$opts["before_match"]="<b>";
$opts["limit"]="100000000000000";
$cl = new SphinxClient();
$cl->SetServer('127.0.0.1', 9300);
$cl->SetLimits(20*($page-1),20);
//$cl->SetRankingMode (SPH_RANK_PROXIMITY_BM25);
$cl->SetMatchMode(SPH_MATCH_EXTENDED);
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
			$resultats[$indice]=getNormalizedVerset($aya->souraId, $aya->ayaId);
		    $indice=$indice+1;
	   }
	        $result_copy=array();
			$result_copy=$resultat;
			$res=array();
			/// $res contient les versets notmalisés et hilighted
		    $res=$cl->BuildExcerpts($resultats,"test1",$query,$opts);
			/// pour chaque resultat hilighted key1=indice de resultat 
			foreach ($res as $key1 => $value1) {
			/// pour chaqu terme de $res
			/// key =position de mot highlighted
			foreach (explode(" ",$res[$key1]) as $key => $value) {
			if (substr($value, 0, 1)=="<"){
				/// $word les mots de resultats
				$word=explode(" ", $result_copy[$key1]->texte);
				$resultat[$key1]->texte=str_replace($word[$key],"&#x200d;<b>".$word[$key]."</b>", $resultat[$key1]->texte);
			}
		
			}
		 }
	$metadata[3]=$resultat;
   	   return  (json_encode($metadata,JSON_UNESCAPED_UNICODE));
   }
   else 
   	$metadata[3]="0";
    $metadata[4]=getMotsAlternatifQuery($query);
    return  (json_encode($metadata,JSON_UNESCAPED_UNICODE));
   }
   
} 

function getNormalizedVerset($soura,$aya)
{
	$connection =new SqlConexion("localhost","root","","quran");
	$connection->connecter();
	$stmt=$connection->SelectQuery("select * from quran where SuraID=".$soura." and VerseID=".$aya);
	$row = $stmt->fetch();
	return $row['AyahTextNoTashkil'];
}

function getNormalisedResults($cl,$query)
{
		$cl->SetServer('127.0.0.1', 9300);
		$cl->SetLimits(0,2);
		$cl->SetMatchMode(SPH_MATCH_ANY);
		$cl->SetRankingMode (SPH_RANK_PROXIMITY_BM25);
		$cl->AddQuery($query, 'test1');
		$result = $cl->RunQueries();
		if ($result == false)
		{
			return "0";
		}
		else 
		{
			if ($cl->GetLastWarning())
			{
				return "0";
			}
			else 
			{
				if($result[0]['total']>0)
				{
				$resultats=array();
				$resultat=array();
				$indice=0;
				foreach($result[0]['matches'] as $x => $x_value) 
					{      	    
					$aya=getSoura($x);
					$resultats[$indice]=getNormalizedVerset($aya->souraId, $aya->ayaId);
					$indice=$indice+1;
					}
	                return $resultats;
				}
					
			}
		}
}

function getMotsAlternatif($ngramme)
{
	$alternatifs=array();
	$cl = new SphinxClient();
	$resultats =getNormalisedResults($cl,$ngramme);
	if ($resultats=="") {
		return 0;
	} 
	else 
	{
		foreach ($resultats as $key1 => $value1) {
			foreach (explode(" ", $value1) as $key => $value) {
				if (strpos($value,$ngramme) !== false) {
					if (!in_array($value, $alternatifs)) {
						array_push($alternatifs,$value);
					}  
				}
			}		
		}
	  return $alternatifs;
	}
}

function getNgramms($query)
{
	$ngramms=array();
	foreach (explode(" ", $query) as $key => $value) {
		for ($i=0; $i < (mb_strlen($value,"utf-8"))-2; $i++) {
			array_push($ngramms,mb_substr($value, $i,3,"utf-8"));	
		}
	}
	return $ngramms;
}
function getMotsAlternatifQuery($query){
	$suggestion=array();
	$ngrams=getNgramms($query);
	foreach ($ngrams as $key => $value) {
		if (getMotsAlternatif($value)!=0) {
			foreach (getMotsAlternatif($value) as $key1 => $value1) {
		     array_push($suggestion,$value1);
		}
		} 
		
	}
	return $suggestion;
}

?>	
