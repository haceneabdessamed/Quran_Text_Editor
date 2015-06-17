<?php

	require 'function.php';
	require 'lib/nusoap.php';
	$server=new nusoap_server();
	$server->configureWSDL("demo","urn:demo");
				
	
			
			   
	$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : '';
	$server->service($HTTP_RAW_POST_DATA);
?>
