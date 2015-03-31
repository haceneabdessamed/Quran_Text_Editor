<?php
    
function file2text($file){
    
$myfile = fopen($file, "r") or die("Unable to open file!");
$text= fread($myfile,filesize($file));
fclose($myfile);
return $text;

}


?>