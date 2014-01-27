tinyMCEPopup.requireLangPack();

var PasteSnippetDialog = {
	init : function() {
		var f = document.forms[0];

		// Get the selected contents as text and place it in the input
		f.code_snippet.value = tinyMCEPopup.editor.selection.getContent({format : 'text'});
	},

	insert : function() {
		// Insert the contents from the input into the document
		var code = document.forms[0].code_snippet.value;
		var custom_class = document.forms[0].custom_class.value;

		// Close popup if empty content
		if (code === null) { tinyMCEPopup.close(); return; }

		// Add mceNonEditable to the snippet of code
		if (code.indexOf("class") != -1) {
			code = code.replace(/class=[\"|\'](.+?)[\"|\']/, 'class="$1 mceNonEditable"');
		} else {
		    code = code.replace(/^(.+?)\s/, '$1 class="mceNonEditable" ');    
		}

		// Create a wrapper to the object and give it the custom class
		var wrapper = document.createElement('div');
		wrapper.setAttribute('class', 'pastesnippet-wrapper ' + custom_class);
		
		// If the snippet (e.g. iframe) has a size, give to the wrapper the same size
		if (code.indexOf("width") != -1) {
			var width =  code.split(/width=[\"|\']/)[1].match(/\d{2,3}/)[0];
			wrapper.style.width = width + 'px';
		};
		if (code.indexOf("height") != -1) {
			var height = code.split(/height=[\"|\']/)[1].match(/\d{2,3}/)[0];
			wrapper.style.height = height +'px';	
		};
		
		// Wrap the snippet inside the wrapper
		wrapper.innerHTML = code;

		// Print the code in the editor
        tinyMCEPopup.editor.execCommand('mceInsertContent', false, wrapper.outerHTML);
        tinyMCEPopup.close();
	}
};

tinyMCEPopup.onInit.add(PasteSnippetDialog.init, PasteSnippetDialog);
