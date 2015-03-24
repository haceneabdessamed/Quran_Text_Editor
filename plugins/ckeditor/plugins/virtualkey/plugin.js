(function () {
    CKEDITOR.plugins.add('virtualkey', {
        init: function (editor) {
        	editor.addCommand('virtualkey',
        			new CKEDITOR.dialogCommand('virtualkey'));
        			editor.ui.addButton('virtualkey', {
	        			label: "Universal Keyboard",
	        			command: 'virtualkey',
	        			icon: this.path + 'virtualkey.png',
	        			toolbar: 'insert'
        			});
        			CKEDITOR.dialog.add('virtualkey', this.path + 'dialogs/virtualkey.js');
        }
    });
})();


