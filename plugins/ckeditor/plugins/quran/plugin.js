CKEDITOR.plugins.add( 'quran', {
    icons: 'quran',
    init: function( editor ) {
        editor.addCommand( 'insertQuran2', {
            exec: function( editor ) {
                var now = new Date();
                ///editor.insertHtml( 'The current date and time is: <em>' + now.toString() + '</em>' );
                alert("toto");
            }
        });
        editor.ui.addButton( 'quran', {
            label: 'Insert Timestamp2',
            command: 'insertQuran2',
            toolbar: 'insert'
        });
    }
});