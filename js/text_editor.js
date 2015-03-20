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
    var vars = "aya="+fn+"&soura="+ln;
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
                                  
                                  

function InsererAya(){
    bootbox.confirm("<form>\
    First name:<input type='number' id='soura' placeholder='soura'/>\
    Last name:<input type='number' id='aya' placeholder='aya'/>\
    </form>", function(result) {
        if(result)
        {
                        post();
    
        }
});

}
   
   function CherchrAya(){
    bootbox.confirm("<form>\
    First name:<input type='text' id='query' placeholder='query'/>\
    </form>", function(result) {
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





