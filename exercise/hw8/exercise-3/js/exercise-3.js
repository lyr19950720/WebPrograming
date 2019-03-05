
window.onload = function() {
	 
	function Trim(str){ 
  		return str.replace(/^\s+|\s+$/gm,''); 
	}
	// to save time :)
	function gebi(id) {
		return document.getElementById(id);
	}
	
	// trim, convert in lower-case all letters but the first
	// of the string name and return the new string
	function normalize(name) {
		name = Trim(name);
		name = name.toLowerCase();
		name = name.substr(0,1).toUpperCase()+name.substr(1);
		return name;
	}

	// save the current list of participants on the server
	// using an Ajax request
	function ok(){
		alert(request.responseText);
	}
	function save() {
		var current = document.querySelectorAll("section#list li");
		var json = [];

		for (var i = 0; i < current.length; i++) {
			var row = {};
			row.gender = current[i].className;
			row.name = current[i].innerHTML;
			json.push(row);
		}
		//console.log(json);
		
		var date = new Date();
		var jsonstr = JSON.stringify(json);
		var span = gebi("date");
		span.innerHTML = date.toString();
		//console.log(date);
		new SimpleAjax('save.php','POST','list='+jsonstr+'&date='+date.toString());
	}
	
	// remove a participant from the list
	function remove() {
		var msg = confirm("Make sure you want to delete "+this.innerHTML);
		if(msg){
			var ol = document.querySelector("section#list ol");
			ol.removeChild(this);
			save();
		}
	}
	
	// add a new participant to the list
	function add() {
		var first = normalize(gebi("firstname").value);
		var last = normalize(gebi("lastname").value);
		var gender = document.querySelector("input[name='gender']:checked").value;
		var Li = document.createElement("li");
		Li.className = gender;
		Li.innerHTML = first + " " + last;
		Li.onclick = remove;
		var ol = document.querySelector("section#list ol");
		ol.appendChild(Li);
		save();
	}
	
	// unobstrusive JavaScript!
	document.querySelector("section#new > input").onclick = add;
	var lis = document.querySelectorAll("#list li");
	for ( var i = 0; i < lis.length; i++ ) {
		lis[i].onclick = remove;
	}
};
