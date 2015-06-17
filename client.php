<?php
    header('Content-Type: text/html; charset=utf-8');
	require 'lib/nusoap.php';
	$client=new nusoap_client("http://127.0.0.1/Quran_Text_Editor/service2.php?wsdl");



	$requete = array();
	$requete[] = "2";		// numéro de la sourat
	$requete[] = "1";  		// numéro de la aya de début
	$requete[] = "5";		// numéro de la aya de fin
	$a='محمد'; 
	$rep=$client->call('Recherche',array("input"=>$a));
	
	
	?>
<html>
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<h2>Le résultat est :  </h2>
<?php
	
		 
		$rep = json_decode($rep,true);
		echo '<pre> ';
		print_r($rep);
		print(null);

				echo "<h2>Request</h2>";
				echo "<pre>" . htmlspecialchars($client->request, ENT_QUOTES) . "</pre>";
				echo "<h2>Response</h2>";
				echo "<pre>" . htmlspecialchars($client->response, ENT_QUOTES) . "</pre>";

	?>
</body>
</html>
