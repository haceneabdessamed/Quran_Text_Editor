CKEDITOR.plugins.add( 'quran', {
    icons: 'quran,verset,word,search,export,validate',
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
        editor.addCommand( 'ExportFile', {
            
            exec: function( editor ) {
                
               ExporterFile();
            }
        });
        editor.addCommand( 'Recherche', {
            
            exec: function( editor ) {
                
               search();
            }
        });
         editor.addCommand( 'validate', {
            
            exec: function( editor ) {
                
               Valider();
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
        label: 'Inserer une ou plusieurs versets',
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
         
        editor.ui.addButton( 'Timestamp4', {
        icon: 'export',
        label: 'Exporter le document',
        command: 'ExportFile',
        toolbar: 'insert'
         });
        
        editor.ui.addButton( 'Timestamp5', {
            icon:'validate',
            label: 'Valider un verset',
            command: 'validate',
            toolbar: 'insert'
            
        }); 
    }
});