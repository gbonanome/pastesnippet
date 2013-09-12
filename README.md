Paste snippet plugin for TinyMCE (3.x)
=============

Provide a button and a dialog to paste snippet of code|everything inside TinyMCE editor, without open HTML source code dialog.
Its main purpose is to add *iframe* tags, so there's a wrapper around the iframe, the iframe is set to mceNonEditable (so you need to activate the noneditable plugin if you want this feature).
You can also give to the wrapper a custom class (I use it to align the iframe before adding it - manage iframe inside a TinyMCE editor is a little madness).



Silverstripe instructions
-------------
To activate the plugin, place it wherever you want, then edit your **_config.php** adding the code

    // Add Paste Snippet Plugin
    HtmlEditorConfig::get('cms')->enablePlugins('noneditable');
    HtmlEditorConfig::get('cms')->enablePlugins(array('pastesnippet' => '../../../pastesnippet/editor_plugin.js'));
    HtmlEditorConfig::get('cms')->insertButtonsAfter('anchor', 'pastesnippet');

where *../../../pastesnippet/editor_plugin.js* is the URL placed in the site root


Remember the bugz
-------------
See the page http://www.silverstripe.org/general-questions/show/16438 to learn how to fix iframe usage on Silverstripe.
Then add to **Page.php** the following lines of code

    public function onBeforeWrite() { 
        $this->Content = preg_replace('|<iframe(.*)/>|Uims', '<iframe\\1> </iframe>', $this->Content); 
        parent::onBeforeWrite(); 
    }