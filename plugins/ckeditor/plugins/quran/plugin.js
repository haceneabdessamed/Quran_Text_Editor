CKEDITOR.plugins.add( 'quran', {
    icons: 'quran',
    init: function( editor ) {
    	
        editor.addCommand( 'insertQuran', {
            exec: function( editor ) {
                InsererAya();
            }
        });
        
        editor.addCommand( 'InsertTimestamp', {
            
            exec: function( editor ) {
                
               InsererCitation();
            }
        });
        editor.ui.addButton( 'quran', {
            label: 'Insert Timestamp',
            command: 'insertQuran',
            toolbar: 'insert'
        });
        editor.ui.addButton( 'Timestamp', {
        icon: 'quran',
        label: 'Insert Timestamp',
        command: 'InsertTimestamp',
        toolbar: 'insert'
         });
    }
});

