<?php
    require'readverset.php';
    header('Content-Type: text/html; charset=utf-8');
	echo '<pre>';
	$t=json_encode(getCitation(2,2,5));
	var_dump(json_decode($t, true));

?>


