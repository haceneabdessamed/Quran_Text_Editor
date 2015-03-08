function getVerset(){
    
var soura = $('#souratNumber').val();
var aya   = $('#ayaNumber').val();

$.post('read_verset.php',{postsoura:soura,postaya:aya},

       function(data){
       alert(data);
}
);
}