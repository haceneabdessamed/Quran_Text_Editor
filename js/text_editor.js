$(function() {
    var availableTags = [
          "محمد رسل الله",
          "ما كان محمد أبا أحد من رجالكم",
          "نبيا من بعدي اسمه أحمد",
          "C++",
          "Clojure",
          "COBOL",
          "ColdFusion",
          "Erlang",
          "Fortran",
          "Groovy",
          "Haskell",
          "Java",
          "JavaScript",
          "Lisp",
          "Perl",
          "PHP",
          "Python",
          "Ruby",
          "Scala",
          "Scheme"
    ];
    /*
    $( "#query" ).autocomplete({
        source: availableTags
    });
    */
    $("#query").autocomplete({source: availableTags})
    .data("ui-autocomplete")._renderItem = function (ul, item) {
        var newText = String(item.value).replace(
                new RegExp(this.term, "gi"),
                "&#x200d;<b>$&&#x200d;</b>");

        return $("<li></li>")
            .data("item.autocomplete", item)
            .append("<a>" + newText + "</a>")
            .appendTo(ul);
    };
    
    $('#query').unbind('keyup').bind('keyup', function (e) {
        var hr = new XMLHttpRequest();
        var url = "../Quran_Text_Editor/controllers/SearchController.php";
        var query=document.getElementById('query').value;
        var vars = "query="+query+"&function="+"suggestion";
        var return_data ="";
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            hr.onreadystatechange = function() {
        
        if(hr.readyState == 4 && hr.status == 200) {
            return_data =hr.responseText;
            var jsonObj = $.parseJSON(return_data);
            for (var i=0; i < jsonObj[3].length; i++) {
              availableTags[i]=jsonObj[3][i];
            }
            $( "#query" ).autocomplete({
            source: availableTags
            });
        }
    }
    hr.send(vars); 
    availableTags=[]; 
     
   });
   
});
    

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

function hilight(id){
     var a=document.getElementById(id);
     alert(a.textContent);
     a.innerHTML=a.textContent;

}

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
		    InsererBalise(jsonObj );
            $('#InsererCitationWindow').modal('hide');
	    }
    }
    hr.send(vars);               
    }


function postSearch () {
    var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/SearchController.php";
    var query=document.getElementById('query').value
    var vars = "query="+query+"&function="+"simple";
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        
        if(hr.readyState == 4 && hr.status == 200) {
            return_data =hr.responseText;
            var jsonObj = $.parseJSON(return_data);
            if (jsonObj[3] == "0")
            {   
                $("#result").html('');
                showDiv('danger');
                showDiv('suggestion');
                for (var i=0; i < jsonObj[4].length; i++) {
                    $('#suggestion').append("<span class='label label-primary' style'position:relative; right:5px;'> "+jsonObj[4][i]+" </span><vr>");
                }
            }
            else{
                hideDiv('danger');
                hideDiv('suggestion');
                $('#suggestion').html('');
                $("#result").html('');
           for (var i=0; i < jsonObj[3].length; i++) {
            $(function() { 
                if (jsonObj[3][i].texte[0].length==1) {
                  $("#result").append("<span style='color: #0088cc;'>[</span>");
                  $("#result").append("<span>"+jsonObj[3][i].texte+"</span>");
                  $("#result").append("<span style='color: #0088cc; '>]</span></br></br>");
                  $("#result").append(
                    $('<button/>', {
                    text: 'imprimer', //set text 1 to 10
                    click: function () { InsererBaliseCitation(getJsonBold(citation)); }
                    })
                    
                );
                  
                } else{
                  $("#result").append("<span style='color: #0088cc;'>[</span>");
                  $("#result").append("<span>"+jsonObj[3][i].texte["0"]+"</span>");
                  $("#result").append("<span style='color: #0088cc; '>]</span></br></br>");
                  $("#result").append(
                    $('<button/>', {
                    text: 'imprimer', //set text 1 to 10
                    click: function () { InsererBaliseCitation(getJson(citation)); }
                    })
                    
                );
                };
                $("#result").append("</br></br>");
                var citation=jsonObj[3][i];
            });
           };
                
            }
            var resultData=document.getElementById('searchInfo');
            var info= "Mots-clés : "+Object.keys(jsonObj[2]).length+"; Résultats : "+jsonObj[0]+"; Temps d'exécution : "+jsonObj[1]+" s";
            resultData.innerHTML=info;
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
var str1 = str.replace(/َ|ً|ُ|ٌ|ِ|ٍ|ْ|ْ|ّ| ۗ| ۚ|/g,'')
return(str1);
}

function getMatchPositions(str,query)
{
    /// 1.get words of str   
    var res = str.split(" ");
    for(var i=0,j=res.length; i<j; i++){
      alert(res[i]);
    };
    /// 2.get words of query
    /// 3.get position of str that are part of query
    
}

function getJsonBold (verset) {
   var versetCitation = new Array({"0":getSouraName(verset.souraId)},verset.ayaId,verset.ayaId,{"0":verset.texte});
   return versetCitation; 
}
function getJson (verset) {
   var versetCitation = new Array({"0":getSouraName(verset.souraId)},verset.ayaId,verset.ayaId,verset.texte);
   return versetCitation; 
}

InitSouraArray('souraVerset');
InitSouraArray('soura');
