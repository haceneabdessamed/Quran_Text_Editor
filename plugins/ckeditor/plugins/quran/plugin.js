CKEDITOR.plugins.add( 'quran', {
    icons: 'quran,verset,word,search',
    init: function( editor ) {
    	
        editor.addCommand( 'insertQuran', {
            exec: function( editor ) {
                InsererAya();
            }
        });
        
        editor.addCommand( 'InsertCitation', {
            
            exec: function( editor ) {
                
               InsererCitation();
            }
        });
        editor.addCommand( 'ImportFile', {
            
            exec: function( editor ) {
                
               ImporterWord();
            }
        });
        editor.addCommand( 'Recherche', {
            
            exec: function( editor ) {
                
               search();
            }
        });
        editor.ui.addButton( 'quran', {
            icon:'verset',
            label: 'Inserer un verset',
            command: 'insertQuran',
            toolbar: 'insert'
            
        });
        
        editor.ui.addButton( 'Timestamp', {
        icon: 'quran',
        label: 'Insert une plusieurs versets',
        command: 'InsertCitation',
        toolbar: 'insert'
         });
         
        editor.ui.addButton( 'Timestamp2', {
        icon: 'word',
        label: 'Insert une plusieurs versets',
        command: 'ImportFile',
        toolbar: 'insert'
         });
         
        editor.ui.addButton( 'Timestamp3', {
        icon: 'search',
        label: 'chercher des versets',
        command: 'Recherche',
        toolbar: 'insert'
         });
    }
});