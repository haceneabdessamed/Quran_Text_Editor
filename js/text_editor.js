$(function() { 
	        
            // bind 'myForm' and provide a simple callback function 
            $("#myForm").ajaxForm({ 
            	beforeSend:function(){           		
            		$(".progress").show();
            	},
            	uploadProgress:function(event,position,total,percentComplete){
            		    $(".progress-bar").width(percentComplete+'%');
            	},
            	success:function(){
            		
            		
            	},
            	complete:function(response){
            		inserer(response.responseText);
            	}
            }); 
    		$(".progress").hide();
        }); 



function inserer(text) {
		  CKEDITOR.instances.editor1.insertText("["+text+"]"); 
          return 0;
}

 function post(){
 	                       
    var hr = new XMLHttpRequest();
    var url = "../Quran_Text_Editor/controllers/readverset.php";
    var fn = document.getElementById("aya").value;
    var ln = document.getElementById("soura").value;
    var vars = "aya="+fn+"&soura="+ln+"&function=LireVerset";
    var return_data ="";
    hr.open("POST", url, true);
    hr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    hr.onreadystatechange = function() {
	    if(hr.readyState == 4 && hr.status == 200) {
		    return_data = hr.responseText;
		    insererBalise(return_data);
	    }
    }
    hr.send(vars); 
                            
    }
                                  
                                  

function InsererCitation(){
    bootbox.confirm("<form>\
    soura:<input type='number' id='soura' placeholder='soura'/>\
    de:<input type='number' id='ayaBegin' placeholder='aya'/>\
    jusqu'à:<input type='number' id='ayaEnd' placeholder='aya'/>\
    </form>", 
    function(result) {
        if(result)
        {
                       postCitation();

        }
});

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
	    }
    }
    hr.send(vars);               
    }

function InsererAya(){
    bootbox.confirm("<form>\
    <br>soura:<input type='number' id='soura' placeholder='soura'/>\
    <br><br>aya:<input type='number' id='aya' placeholder='aya'/>\
    </form>", 
    function(result) {
        if(result)
        {
                       post();

        }
});

}
   
   

function insererBalise(text) {
        
        para =document.createElement("div");
        CKEDITOR.instances.editor1.insertHtml(para.outerHTML); 
        para =document.createElement("div");
        para.setAttribute("dir","rtl");
        para.setAttribute("style","font-family:arabeyesqr;font-size:25px;");
        para.innerHTML = text;
        para.setAttribute("contenteditable","false");
        CKEDITOR.instances.editor1.insertHtml(para.outerHTML); 
}

function InsererBaliseCitation(JsonObj){
	 
	 var citation='['
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
     citation=citation+']';
     var reference =' ('+JsonObj[0]["0"]+' '+ayaBegin+' - '+ayaEnd+' )';
     insererBalise(citation+reference);
}




