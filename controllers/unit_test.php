<?php
    require_once('simpletest/autorun.php');
    require_once('SearchController.php');
    class Test extends UnitTestCase {
    function testUpdate() {
        $cl = new SphinxClient();
		$query='محمد';
		$page ='1';
		$result = getResults($query,$page,$cl);
		$result = json_decode($result);
		echo "<pre>";
		print_r($result);
       
        //$this->assertTrue($result['register_id']=='20',"Erreur dans la mise a jour de la table oc_store\n");
    }
}
    
?>