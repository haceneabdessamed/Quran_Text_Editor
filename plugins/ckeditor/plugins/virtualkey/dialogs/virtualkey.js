CKEDITOR.dialog.add('virtualkey', function (a) {
    var b = CKEDITOR.tools.getNextNumber(),
        c = 'cke_frame_' + b,
        d = 'cke_data_' + b,
        e = 'cke_error_' + b,
        f, g = document.location.protocol || 'http:',
        i = '<iframe' + ' src="' + a.plugins.virtualkey.path + '/dialogs/virtualkey.html?parentEditor='+a.name+'"' + ' style="width:100%;background-color:#f1f1e3;"' + ' frameborder="0"' + ' name="' + c + '"' + ' id="' + c + '"' + ' allowtransparency="1">' + '</iframe>',
        j = '/campustoolshighered/css/keyboard.js';

    
    window._cancelOnError = function (m) {
        if (typeof window.WSC_Error == 'undefined') {
            CKEDITOR.document.getById(c).setStyle('display', 'none');
            var n = CKEDITOR.document.getById(e);
            n.setStyle('display', 'block');
            n.setHtml(m || a.lang.spellCheck.notAvailable);
        }
    };

    function l(m) {
        var n = new window._SP_FCK_LangCompare(),
            o = CKEDITOR.getUrl(a.plugins.wsc.path + 'dialogs/'),
            p = o + 'tmpFrameset.html';
        window.gFCKPluginName = 'wsc';
        n.setDefaulLangCode(a.config.defaultLanguage);
        window.doSpell({
            ctrl: d,
            lang: a.config.wsc_lang || n.getSPLangCode(a.langCode),
            intLang: a.config.wsc_uiLang || n.getSPLangCode(a.langCode),
            winType: c,
            onCancel: function () {
                m.hide();
            },
            onFinish: function (q) {
                a.focus();
                m.getParentEditor().setData(q.value);
                m.hide();
            },
            staticFrame: p,
            framesetPath: p,
            iframePath: o + 'ciframe.html',
            schemaURI: o + 'wsc.css',
            userDictionaryName: a.config.wsc_userDictionaryName,
            customDictionaryName: a.config.wsc_customDictionaryIds && a.config.wsc_customDictionaryIds.split(','),
            domainName: a.config.wsc_domainName
        });
        CKEDITOR.document.getById(e).setStyle('display', 'none');
        CKEDITOR.document.getById(c).setStyle('display', 'block');
    };
    return {
        title: 'Virtual Keyboard',
        minWidth: 420,
        minHeight: 500,
        buttons: [,CKEDITOR.dialog.cancelButton],
        onShow: function () {
            var m = this.getContentElement('general', 'content').getElement();
            m.setHtml(i);
            m.getChild(0).setStyle('height', this._.contentSize.height + 'px');
            
            var n = a.getData();
            //CKEDITOR.document.getById(d).setValue(n);
        },
        onHide: function () {
            window.ooo = undefined;
            window.int_framsetLoaded = undefined;
            window.framesetLoaded = undefined;
            window.is_window_opened = false;
        },
        
        contents: [{
            id: 'general',
            padding: 0,
            elements: [{
                type: 'html',
                id: 'content',
                html: ''
            }]
        }]
    };
});
CKEDITOR.dialog.on('resize', function (a) {
    var b = a.data,
        c = b.dialog;
    if (c._.name == 'virtualkey') {
        var d = c.getContentElement('general', 'content').getElement(),
            e = d && d.getChild(0);
        e && e.setSize('height', b.height);
        e && e.setSize('width', b.width);
    }
});
