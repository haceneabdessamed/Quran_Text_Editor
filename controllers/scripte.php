<?php
	require 'lib/lib/nusoap.php';
	$client=new nusoap_client("http://10.0.7.11/Soap-demo/service.php?wsdl");



	$input = array();
	$input[] = "aaa";
	$input[] = "bbb";

	$rep=$client->call('SolveRequest',array("input"=>$input));
	
	
	?>
<html>
<head>
	<meta charset="UTF-8">
	<title>test</title>
</head>
<body>
	<h2>Le r�sultat est :  </h2>
<?php
	
		//echo $rep;
		
		
		//$proxy = $client->getProxy();
		//echo $proxy;
		
		 
		 $rep = json_decode($rep,true);
		echo '<pre> ';
		print_r($rep);
		print(null);

		
	?>
</body>
</html>