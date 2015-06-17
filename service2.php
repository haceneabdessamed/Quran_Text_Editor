<?php
	require 'function.php';
	require 'lib/nusoap.php';
	$server=new nusoap_server();
	///$server->soap_defencoding = 'UTF-8';
    ///$server->decode_utf8 = false;
    ///$server->encode_utf8 = true;
	$server->configureWSDL("demo","urn:demo");
		
		$server->register
		('Recherche',
         array('input' => 'xsd:string'), 
         array('output' => 'xsd:string')
        );
					   
	$HTTP_RAW_POST_DATA = isset($HTTP_RAW_POST_DATA) ? $HTTP_RAW_POST_DATA : '';
	$server->service($HTTP_RAW_POST_DATA);
?>
