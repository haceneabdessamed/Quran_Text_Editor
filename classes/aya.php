<?php

/**
 * 
 */
class aya  {
	
	  public $souraId;
	  public $ayaId;
	  public $texte;
	
	function __construct($souraId,$ayaId,$texte) {
		
		$this->ayaId=$ayaId;
		$this->souraId=$souraId;
		$this->texte=$texte;
	}
	
	public function getAyaId()
	{
		return $this->ayaId;
	}
	public function getSouraId()
	{
		return $this->souraId;
	}
	public function getTexte()
	{
		return $this->texte;
	}
	
}

?>