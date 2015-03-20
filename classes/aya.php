<?php

/**
 * 
 */
class aya  {
	
	  public $souraId;
	  public $ayaId;
	
	function __construct($souraId,$ayaId) {
		
		$this->ayaId=$ayaId;
		$this->souraId=$souraId;
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