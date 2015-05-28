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
    };
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
                        
                        ///inserer(response.responseText);
                        CKEDITOR.instances.editor1.insertHtml(response.responseText);
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

function ExporterFile(){
    $('#Exporterdocument').modal('show');
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
    var type=$('input[name=type]:checked', '#CitationType').val(); 
    var vars = "aya="+fn+"&soura="+ln+"&function=LireVerset&type="+type;
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    return_data =hr.responseText;
            var jsonObj = $.parseJSON(return_data);
            $('#verify').html("");
            $('#verify').append(getFormattedCitation(jsonObj));
            InsererBaliseCitation(jsonObj);
		    $('#InsererVersetWindows').modal('hide');

        }
    };
    hr.send(vars); 
                          
   }
   
function visualiser(data){
    
    switch (data){
        case '1':
        var hr = new XMLHttpRequest();
        var url = "../Quran_Text_Editor/controllers/readverset.php";
        var fn = document.getElementById("ayaVerset").value;
        var ln = document.getElementById("souraVerset").value;
        var type=$('input[name=type]:checked', '#CitationType').val(); 
        var vars = "aya="+fn+"&soura="+ln+"&function=LireVerset&type="+type;
        var return_data ="";
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.onreadystatechange = function() {
            if(hr.readyState == 4 && hr.status == 200) {
                return_data =hr.responseText;
                var jsonObj = $.parseJSON(return_data);
                $('#verify').html("");
                $('#verify').append(getFormattedCitation(jsonObj));
                switch(type){
                    case 'quran':
                    $('#verify').attr('dir','rtl');
                    case 'sa3dy':
                    $('#verify').attr('dir','rtl');
                    case 'fr_hamidullah':
                    $('#verify').attr('dir','ltr');
                    case 'en_sahih':
                    $('#verify').attr('dir','ltr');
                }
                
            }
        };
        hr.send(vars); 
        break;
        case '2':
        var hr = new XMLHttpRequest();
        var url = "../Quran_Text_Editor/controllers/readverset.php";
        var soura = document.getElementById("soura").value;
        var ayab = document.getElementById("ayaBegin").value;
        var ayae = document.getElementById("ayaEnd").value;
        var type=$('input[name=type]:checked', '#CitationTypeCitation').val(); 
        var vars = "soura="+soura+"&ayaBegin="+ayab+"&ayaEnd="+ayae+"&function=LireCitation&type="+type;
        var return_data ="";
        hr.open("POST", url, true);
        hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        hr.onreadystatechange = function() {
            if(hr.readyState == 4 && hr.status == 200) {
                return_data =hr.responseText;
                var jsonObj = $.parseJSON(return_data);
                $('#verifyCitation').html("");
                $('#verifyCitation').append(getFormattedCitation(jsonObj));
            }
        };
        hr.send(vars); 
        break;
    }
    
}

function ImporterWord(){
     $('#ImportWord').modal('show');    
}                                  
                            

function InsererCitation(){
         $('#verifyCitation').html('');
         $('#InsererCitationWindow').modal('show');
         
}

function postCitation()
{
	var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/readverset.php";
    var soura = document.getElementById("soura").value;
    var ayab = document.getElementById("ayaBegin").value;
    var ayae = document.getElementById("ayaEnd").value;
    var type=$('input[name=type]:checked', '#CitationTypeCitation').val(); 
    var vars = "soura="+soura+"&ayaBegin="+ayab+"&ayaEnd="+ayae+"&function=LireCitation&type="+type;
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    return_data =hr.responseText;
		    var jsonObj = $.parseJSON(return_data);
		    InsererBaliseCitation(jsonObj );
            $('#InsererCitationWindow').modal('hide');
	    }
    };
    hr.send(vars);               
    }


function postSearch (page,type,query) {
    var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/SearchController.php";
    ///var query=document.getElementById('query').value;
    var vars = "query="+query+"&function="+type+"&page="+page;
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
                    $('#suggestion').append("<span class='label label-primary' style'position:relative; right:5px; margin-left: 5px;'> "+jsonObj[4][i]+" </span><vr>");
                }  
            }
            else{
                hideDiv('danger');
                hideDiv('suggestion');
                $('#suggestion').html('');
                $("#result").html('');
                if(page == 1)
                {
                    if (jsonObj[0]%20==0) {
                        NbPages=jsonObj[0]/20;
                    } else{
                        NbPages=Math.floor(jsonObj[0]/20) + 1;
                    };
                }
           for (var i=0; i < jsonObj[3].length; i++) {
            $(function() { 
                if (jsonObj[3][i].texte[0].length==1) {
                  $("#result").append("<span style='color: #0088cc;'>[</span>");
                  $("#result").append("<span>"+jsonObj[3][i].texte+" "+jsonObj[3][i].ayaId+"</span>");
                  $("#result").append("<span style='color: #0088cc;'>] ("+window.sourates[jsonObj[3][i].souraId-1]+"-"+jsonObj[3][i].ayaId+")</span></br></br>");
                  $("#result").append(                     
                    $('<button\>', {
                    text: 'أضف إلى الوثيقة', //set text 1 to 10
                    click: function () { InsererBaliseCitation(getJsonBold(citation));},
                    style: 'margin-right:8%'
                    }).addClass( "btn btn-primary col-md-offset-1 col-xs-offset-1" ) 
                );

                $("#result").append(
                    $('<button\>', {
                    text: 'المزيد', //set text 1 to 10
                    click: function () { 
                        $('#recherche').modal('hide');
                        $('#soura').val(citation.souraId);
                        $('#ayaBegin').val(citation.ayaId);
                        $('#ayaEnd').val(citation.ayaId);
                        InsererCitation();},
                        style: 'margin-right:32%'
                    }).addClass( "btn btn-primary col-md-offset-1" )
                    
                );
                } else{
                  $("#result").append("<span style='color: #0088cc;'>[</span>");
                  $("#result").append("<span>"+jsonObj[3][i].texte["0"]+" "+jsonObj[3][i].ayaId+"</span>");
                  $("#result").append("<span style='color: #0088cc; '>]</span></br></br>");
                  $("#result").append(
                    $('<button/>', {
                    text:'أضف إلى الوثيقة', //set text 1 to 10
                    click: function () { InsererBaliseCitation(getJson(citation));},
                    style: 'margin-right:8%'
                    }).addClass( "btn btn-primary" )
                    
                );
                 $("#result").append(
                    $('<button\>', {
                    text: 'المزيد', //set text 1 to 10
                    click: function () { 
                        $('#recherche').modal('hide');
                        $('#soura').val(citation.souraId);
                        $('#ayaBegin').val(citation.ayaId);
                        $('#ayaEnd').val(citation.ayaId);
                        InsererCitation();},
                        style: 'margin-right:32%'
                    }).addClass( "btn btn-primary col-md-offset-1" )
                    
                );
                }
                $("#result").append("</br></br>");
                var citation=jsonObj[3][i];
            });
           }
           
           
              
            }
            var resultData=document.getElementById('searchInfo');
            var info= "Mots-clés : "+Object.keys(jsonObj[2]).length+"; Résultats : "+jsonObj[0]+"; Temps d'exécution : "+jsonObj[1]+" s";
            resultData.innerHTML=info;
            
            if(page==1){
            
            $('#pager').html('');
            $('#pager').append('<li><a>previous</a></li>');
            for (var i=1; i <= Math.min(5,window.NbPages); i++) {
                $('#pager').append("<li><a>"+i+"</a></li>");
                }  
            $('#pager').append("<li><a>next</a></li>");
            pageClick();
            }
            
        }
    };
    hr.send(vars);    
    $("#result").html("<img src='loading.gif' class='img-responsive'/>");
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


function getFormattedCitation (JsonObj) {
     var citation='[ ';
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
     return citation+reference ;
  
}

function InsererBaliseCitation(JsonObj){
	 
     insererBalise(getFormattedCitation(JsonObj));
     
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
    sourates =new Array();
    x=xmlDoc.getElementsByTagName("sura");
    var sel = document.getElementById(id);
    for(var i = 0; i < x.length; i++) {
        var opt = document.createElement('option');
        opt.innerHTML = x[i].getAttribute('name');
        sourates.push(x[i].getAttribute('name'));
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
var str1 = str.replace(/َ|ً|ُ|ٌ|ِ|ٍ|ْ|ْ|ّ| ۗ| ۚ|/g,'');
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

function suivant () {
    var last=parseInt($("#pager li").eq(-2).text());
    if(last==window.NbPages)
    last=0;
    $("#pager li").html('');
    $('#pager').append('<li><a>previous</a></li>');
    for(var i=1,j=6; i<j; i++){
      var p=last+i;
      if (p<=window.NbPages) {
      $('#pager').append('<li><a>'+p+'</a></li>');
      $(".pager li").removeClass('active');  
      }
    }
    $('#pager').append('<li><a>next</a></li>');
    pageClick();

}
function previous () {
    var last=parseInt($(".pager li").eq(-6).text())-6;
    if(last==window.NbPages)
    last=0;
    if ($(".pager li").eq(-2).text()<5) {return 0;}
    $(".pager li").html('');
    $('#pager').append('<li><a>previous</a></li>');
    for(var i=1,j=6; i<j; i++){
      var p=last+i;
      if (p<=window.NbPages) {
      $('#pager').append('<li><a>'+p+'</a></li>');
      $(".pager li").removeClass('active');  
      }
    }
    $('#pager').append('<li><a>next</a></li>');
    pageClick();

}

function pageClick()
{
    $("#pager li").click(function(){
        switch(this.textContent){
            case 'next' :
            suivant();
            break;
            
            case 'previous' :
            
            previous();
            break;
            
            default:
            $("#pager li").removeClass('active');
            $(this).addClass('active');
            $("#result").html("<img src='loading.gif' class='img-responsive'/>");
            postSearch(parseInt(this.textContent),'simple',document.getElementById('query').value);
            break;
        }
        
        /*
        if (this.textContent =='next') 
        {            
            suivant();
        }
        if (this.textContent =='previous') 
        {            
            previous();
        }
        else{
            $("#pager li").removeClass('active');
            $(this).addClass('active');
            alert('salam');
            $("#result").html("<img src='loading.gif' class='img-responsive'/>");
            postSearch(parseInt(this.textContent));
        }
        */
        
});
}


$("#ajouterBtn").click(function(){
    var choice=$('input[name=sex]:checked', '#AdvancedOptions').val();   
    switch(choice){
        case 'and':
        $('#queryadvanced').val($('#queryadvanced').val()+' '+$('#term1').val()+' + '+$('#term2').val());
        break;
        case 'or':
        $('#queryadvanced').val($('#queryadvanced').val()+' '+$('#term1').val()+' | '+$('#term2').val());
        break;
        case 'not':
        $('#queryadvanced').val($('#queryadvanced').val()+' '+$('#term1').val()+' ! '+$('#term2').val());
        break;
        case 'phrase':
        $('#queryadvanced').val($('#queryadvanced').val()+' \"'+$('#term1').val()+'\"');
        break;
        case 'near':
        $('#queryadvanced').val($('#queryadvanced').val()+' '+$('#term1').val()+' NEAR\/'+ $('#distance').val()+' '+$('#term2').val());
        break;
        case 'before':
        $('#queryadvanced').val($('#queryadvanced').val()+' '+$('#term1').val()+'   >> '+$('#term2').val());
        break;
        case 'after':
        $('#queryadvanced').val($('#queryadvanced').val()+' '+$('#term1').val()+'   << '+$('#term2').val());
        break;
        case 'begin':
        $('#queryadvanced').val($('#queryadvanced').val()+' ^'+$('#term1').val());
        break;
        case 'end':
        $('#queryadvanced').val($('#queryadvanced').val()+' '+$('#term1').val()+'$');
        break;
        case 'part':
        $('#queryadvanced').val($('#queryadvanced').val()+' *'+$('#term1').val()+' * ');
        break;
    }
});

$('input[class=need]:radio').click(function(){
    ///hider text2
    $('#term2').hide();
    $('#labelTerme2').hide();
});
 
$('input[class!=need]:radio').click(function(){
    ///hider text2
    $('#term2').show();
    $('#labelTerme2').show();
});
$('input[value=near]:radio').click(function(){
    ///hider text2
    $('#distance').show();
    $('#labelDistance').show();
});
$('input[value!=near]:radio').click(function(){
    ///hider text2
    $('#distance').hide();
    $('#labelDistance').hide();
});



function autocompleteEditor(selection){
    
    var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/SearchController.php";
    var vars = "query="+selection+"&function="+"simple&page=1";
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        
        if(hr.readyState == 4 && hr.status == 200) {
            return_data =hr.responseText;
            var jsonObj = $.parseJSON(return_data);
 
              addSuggestionMenu(CKEDITOR.instances.editor1,jsonObj[3],0);
              ///CKEDITOR.instances.editor1.contextMenu.show(CKEDITOR.instances.editor1.document.getBody(), null, 100, 0);
              ///CKEDITOR.instances.editor1.contextMenu.hide();
              ///CKEDITOR.instances.editor1.contextMenu.items[i+3].label=jsonObj[3][i].texte;
        }
    };
    hr.send(vars);   
}

function Exporter(format){
    switch (format){
        case EDQ:
        var source=CKEDITOR.instances.editor1.getData();
        
        break;
    }
}
function Valider(){
    var query=CKEDITOR.instances.editor1.getSelection().getSelectedText();
    var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/SearchController.php";
    var vars = "query="+query+"&function=simple&page=1";
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
        
        if(hr.readyState == 4 && hr.status == 200) {
            return_data =hr.responseText;
            var jsonObj = $.parseJSON(return_data);
            CKEDITOR.instances.editor1.contextMenu.removeAll();
            addSuggestionMenu(CKEDITOR.instances.editor1,jsonObj[3]);
            CKEDITOR.instances.editor1.contextMenu.show(CKEDITOR.instances.editor1.document.getBody(), null, 0, 0);
        }
    };
    hr.send(vars);  
}

function addSuggestionMenu(editor,text){
             
                editor.contextMenu.addListener( function( element, selection ) {
                   return { 
                      1 : CKEDITOR.TRISTATE_OFF 
                   };
                });
                editor.addMenuItems({
                    1: {
                    id:1,
                    label : text[0].texte,
                    group : "image",
                    order : 1,
                    toto:'zeb',
                    onClick : function() {
                                          InsererBaliseCitation(getJsonBold(text[0])); 
                                         }
                    }});
                    
                    
                    editor.contextMenu.addListener( function( element, selection ) {
                   return { 
                      2 : CKEDITOR.TRISTATE_OFF 
                   };
                });
                editor.addMenuItems({
                    2: {
                    id:2,
                    label : text[1].texte,
                    group : "image",
                    order : 1,
                    toto:'zeb',
                    onClick : function() {
                                            InsererBaliseCitation(getJsonBold(text[1])); 
                                         }
                    }});
                    
                    
                    
                    editor.contextMenu.addListener( function( element, selection ) {
                   return { 
                      3 : CKEDITOR.TRISTATE_OFF 
                   };
                });
                editor.addMenuItems({
                    3: {
                    id:3,
                    label : text[2].texte,
                    group : "image",
                    order : 1,
                    toto:'zeb',
                    onClick : function() {
                                            InsererBaliseCitation(getJsonBold(text[2])); 
                                         }
                    }});
                    
                    
                    editor.contextMenu.addListener( function( element, selection ) {
                   return { 
                      4 : CKEDITOR.TRISTATE_OFF 
                   };
                });
                editor.addMenuItems({
                    4: {
                    id:4,
                    label : text[3].texte,
                    group : "image",
                    order : 1,
                    toto:'zeb',
                    onClick : function() {
                                            InsererBaliseCitation(getJsonBold(text[3])); 
                                         }
                    }});
                    
       
                
}

$("#simpleBtn").click(function(){postSearch('1','simple',$("#query").val())});
$("#advancedBtn").click(function(){postSearch('1','simple',$("#queryadvanced").val())});

InitSouraArray('souraVerset');
InitSouraArray('soura');



(function () {
var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }
    textFile = window.URL.createObjectURL(data);
    return textFile;
  };
  var create = document.getElementById('create'),
  textbox = document.getElementById('textbox');
  create.addEventListener('click', function () {
    var link = document.getElementById('downloadlink');
    link.href = makeTextFile(CKEDITOR.instances.editor1.getData());
    link.style.display = 'block';
  }, false);
})();
