<?php


/**
 * 
 */
class SqlConexion {
	public $servername = "localhost";
	public $username = "root";
	public $password = "";
	public $dbname = "quran";
	public $connexion=null;
	
	
	function __construct($servername,$username,$password,$dbname) {
		$this->servername=$servername;
		$this->username=$username;
		$this->password=$password;
		$this->dbname=$dbname;
		$this->connexion=null;
	}

	function connecter()
	{
		try
		{
		$this->connexion=new PDO("mysql:host=$this->servername;dbname=$this->dbname", $this->username, $this->password);
		$this->connexion->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		return ;
	    }
		catch(PDOException $e)
			    {
			    return "Connection failed: " . $e->getMessage();
			    }
	}
	public function SelectQuery($sql)
	{
		$this->connecter();
		$stmt=$this->connexion->prepare($sql);
		$stmt->execute();
		return $stmt;
	}
	
}


    
