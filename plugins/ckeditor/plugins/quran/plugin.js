CKEDITOR.plugins.add( 'quran', {
    icons: 'quran',
    init: function( editor ) {
        editor.addCommand( 'insertQuran', {
            exec: function( editor ) {
                var now = new Date();
                ///editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
                InsererAya();
            }
        });
        editor.ui.addButton( 'quran', {
            label: 'Insert Timestamp',
            command: 'insertQuran',
            toolbar: 'insert'
        });
    }
});