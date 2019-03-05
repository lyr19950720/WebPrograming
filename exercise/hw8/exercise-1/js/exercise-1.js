window.onload = function() {
	// to save time :)
	function gebi(identifier) {
		return document.getElementById(identifier);
	}

	// add an error message as the new content of
	// the element 'tooltip'and make that element visible
	function on_failure(request) {
		return document.getElementById(request);
	}

	// add the result of the AJAX request as the new content
	// of the element 'tooltip' and make that element visible
	function on_success(request) {
		Div.innerHTML = request.responseText;
	}

	// empty the content of the element
	// of ID 'tooltip' and hide that element
	function tooltip_hide() {
         Div.style.visibility = "hidden";
	}
	
	// do the AJAX request with the current selection and
	// * call 'on_success' after the request succeeded
	// * call 'on_failure' after the request failed
	
	var Div = document.createElement('div');
   	Div.id = 'tooltip';
    document.body.appendChild(Div);

	function tooltip_show() {

    	Div.style.visibility = "visible";
    	var str = window.getSelection().getRangeAt(0);
    	new SimpleAjax('dico.php', 'GET', "word="+str, on_success, on_failure);
    	
	}
	document.querySelector("body").ondblclick = tooltip_show;
	Div.onclick = tooltip_hide;
	// creates a new 'div' element with ID attribute
	// equal to 'tooltip', set the 'onclick' event on that
	// element to 'tooltip_hide' and add it as the new last
	// child of the body
	// finally set the 'ondblclick' event on the body to
	// 'tooltip_show'

};
