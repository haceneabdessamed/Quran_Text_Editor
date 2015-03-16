<?php

/**
 * 
 */
class aya  {
	
	  public $id;
	  public $souraId;
	  public $ayaId;
	
	function __construct($id,$souraId,$ayaId) {
		
		$this->id=$id;
		$this->ayaId=$ayaId;
		$this->souraId=$souraId;
	}
	public function getId()
	{
		return $this->id;
	}
	public function getAyaId()
	{
		return $this->ayaId;
	}
	public function souraId()
	{
		return $this->souraId;
	}
	
}

?>