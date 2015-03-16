<?php
require '../classes/sqlConnexion.php';
$connection =new SqlConexion("localhost","root","","quran");
$connection->connecter();
echo "<pre>";
$stmt=$connection->SelectQuery("select * from quran where ID=3465");
for($i=0; $row = $stmt->fetch(); $i++){
        echo " - ".$row['SuraID']."  ".$row['VerseID']."<br/>";
      }

?>