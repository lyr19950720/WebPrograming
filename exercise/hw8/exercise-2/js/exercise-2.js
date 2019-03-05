window.onload = function() {

	// to store the element to edit
	var editable;

	// to build the "editor"
	var editor = document.createElement("div");
	var textarea = document.createElement("textarea");
	var paragraph = document.createElement("p");

	var saveButton = document.createElement("input");
	saveButton.type = "button";
	saveButton.value = "save";

	var cancelButton = document.createElement("input");
	cancelButton.type = "button";
	cancelButton.value = "cancel";

	paragraph.appendChild(textarea);
	editor.appendChild(paragraph);
	editor.appendChild(saveButton);
	editor.appendChild(cancelButton);

	editor.setAttribute("id", "editor");
	document.querySelector("body").appendChild(editor);
	editor.style.visibility = "hidden";

	saveButton.onclick = function() {
		var id = editable.getAttribute("data-id");
		editable.innerHTML= textarea.value;
		new SimpleAjax('edit.php', 'POST', "id="+id+"&content=" + textarea.value);
		editor.style.visibility = "hidden";
	};

	cancelButton.onclick = function() {
		editor.style.visibility = "hidden";
	};

	function openEditor(obj) {
		editor.style.visibility = "visible";
		editable = this;
     	textarea.value = editable.innerHTML;
	}
	var edit = document.querySelectorAll(".editable");
	for (var i = 0; i < edit.length; i++) {
		edit[i].onclick = openEditor;
	}
	// set the onclick event and title attribute to all editable elements

};
