$(function() { 
	        
            // bind 'myForm' and provide a simple callback function 
            $("#myForm").ajaxForm({ 
            	beforeSend:function(){  
            	    $(".progress").show(); 
            	    $(".progress-bar").width('0%');        		
            	},
            	uploadProgress:function(event,position,total,percentComplete){
            		    $(".progress-bar").width(percentComplete+'%');
            	},
            	success:function(){
            		
            		$(".progress").hide();
            	},
            	complete:function(response){
            	    if(response.responseText ==' Sorry, there was an error uploading your file.') {
                        alert('Sorry, there was an error uploading your file.');
                    } 
                    else {
                        inserer(response.responseText);
                    }
                    $('#ImportWord').modal('hide');  

            	}
            }); 
            $(".progress").hide();


        }); 


function search() {
     $('#recherche').modal('show');
}

function ImporterWord(){
     $('#ImportWord').modal('show');    
}


function inserer(text) {
		  CKEDITOR.instances.editor1.insertText("["+text+"]"); 
          return 0;
}

 function post(){
 	                       
    var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/readverset.php";
    var fn = document.getElementById("ayaVerset").value;
    var ln = document.getElementById("souraVerset").value;
    var vars = "aya="+fn+"&soura="+ln+"&function=LireVerset";
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    return_data =hr.responseText;
            var jsonObj = $.parseJSON(return_data);
            InsererBaliseCitation(jsonObj);
		    $('#InsererVersetWindows').modal('hide');

            }
    }
    hr.send(vars); 
                          
   }
function ImporterWord(){
     $('#ImportWord').modal('show');    
}                                  
                            

function InsererCitation(){

         $('#InsererCitationWindow').modal('show');
         
}

function postCitation()
{
	var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/readverset.php";
    var soura = document.getElementById("soura").value;
    var ayab = document.getElementById("ayaBegin").value;
    var ayae = document.getElementById("ayaEnd").value;
    var vars = "soura="+soura+"&ayaBegin="+ayab+"&ayaEnd="+ayae+"&function=LireCitation";
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    return_data =hr.responseText;
		    var jsonObj = $.parseJSON(return_data);
		    InsererBaliseCitation(jsonObj);
            $('#InsererCitationWindow').modal('hide');
	    }
    }
    hr.send(vars);               
    }


function postSearch () {
    var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/SearchController.php";
    var query=document.getElementById('query').value
    var vars = "query="+query+"&function="+"";
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        
        if(hr.readyState == 4 && hr.status == 200) {
            return_data =hr.responseText;
            var jsonObj = $.parseJSON(return_data);
            if (jsonObj[3] == 0)
            {
                
                showDiv('danger');
                angular.element(document.getElementById('test')).scope().$apply(function(scope){
                scope.names = [];
                });
            }
            else{
                hideDiv('danger');
                
            }
            
            
            
            var resultData=document.getElementById('searchInfo');
            var info= "Mots-clés : "+Object.keys(jsonObj[2]).length+"; Résultats : "+jsonObj[0]+"; Temps d'exécution : "+jsonObj[1]+" s";
            resultData.innerHTML=info;
            
            angular.element(document.getElementById('test')).scope().$apply(function(scope){
            scope.names = jsonObj[3];
            scope.show = function(message) {
            insererBalise(message);
            };
            
            scope.getJson=function(x){
                var versetCitation = new Array({"0":getSouraName(x.souraId)},x.ayaId,x.ayaId,x.texte);
                return versetCitation;                
            };
            
            scope.ajouterVerset=function(x){
                InsererBaliseCitation(x);
            };
            
         });
         
        }
    }
    hr.send(vars);    
    } 

function InsererAya(){
    $('#InsererVersetWindows').modal('show');
    
}
   

function insererBaliseComplet(balise,direction,size,indice,font,text)
{
	    para =document.createElement("div");
	    CKEDITOR.instances.editor1.insertHtml(para.outerHTML); 
	    para =document.createElement(balise);
        para.setAttribute("dir",direction);
        para.setAttribute("style","font-family:"+font+";font-size:"+size+"px;");
        para.innerHTML = text;
        para.setAttribute("contenteditable","false");
        CKEDITOR.instances.editor1.insertHtml(para.outerHTML); 
}

function insererBalise(text) {
                
        para =document.createElement("div");
        CKEDITOR.instances.editor1.insertHtml(para.outerHTML); 
        para =document.createElement("div");
        para.setAttribute("dir","rtl");
        para.setAttribute("style","font-family:KFGQPC Uthmanic Script HAFS;font-size:25px;");
        para.innerHTML = text;
        para.setAttribute("contenteditable","false");
        CKEDITOR.instances.editor1.insertHtml(para.outerHTML); 
        
}


function InsererBaliseCitation(JsonObj){
	 
	 var citation='[ '
	 var ayaBegin=JsonObj[1];
	 var ayaEnd=JsonObj[2];
	 var count=3;
	 var ayaCount=ayaBegin;
     while (ayaCount<=ayaEnd)
     {
     	citation=citation+JsonObj[count]["0"]+'  '+ayaCount+'  ';
     	count=count+1;
     	ayaCount=ayaCount+1;
     }
     citation=citation+'] ';
     var reference =' ('+JsonObj[0]["0"]+' '+ayaBegin+' - '+ayaEnd+' )';
     insererBalise(citation+reference);
}

function showDiv(divId) {
  $("#"+divId).removeClass('hidden');
}

function hideDiv(divId){
  $("#"+divId).addClass('hidden');
}

function loadXMLDoc(filename)
        {
        if (window.XMLHttpRequest)
          {
          xhttp=new XMLHttpRequest();
          }
        else // code for IE5 and IE6
          {
          xhttp=new ActiveXObject("Microsoft.XMLHTTP");
          }
        xhttp.open("GET",filename,false);
        xhttp.send();
        return xhttp.responseXML;
        }

function InitSouraArray(id){
    xmlDoc=loadXMLDoc("quran-data.xml");
    x=xmlDoc.getElementsByTagName("sura");
    var sel = document.getElementById(id);
    for(var i = 0; i < x.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = x[i].getAttribute('name');
        opt.value = i+1;
        sel.appendChild(opt);
    }
}

function getSouraName(souraId)
{
    xmlDoc=loadXMLDoc("quran-data.xml");
    x=xmlDoc.getElementsByTagName("sura");
    return x[souraId-1].getAttribute('name');
}

function normalize (str) {
str = str.replace(/َ|ً|ُ|ٌ|ِ|ٍ|ْ|ْ|ّ| ۗ| ۚ|/g,'')
return(str);
}



InitSouraArray('souraVerset');
InitSouraArray('soura');
