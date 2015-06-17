<?php

	require 'function.php';
	require 'lib/nusoap.php';
	$namespace = "http://127.0.0.1/services";
	$server=new nusoap_server();
	$server->configureWSDL("demo");
				
	$server->register
		('Insertion',
         array('input' => 'tns:ArrayOfString'), 
         array('output' => 'xsd:string'),
         $namespace,
         false,
        'rpc',
        'encoded',
        'A simple Hello World web method'
        );
		
			   
	$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : '';
	$server->service($HTTP_RAW_POST_DATA);
?>
