window.onload = function() {

	var array = [4,6,6,8,10];
	var Rand = new Array();
	var totalship = 5;
	var per = 32;
	var ship_position = new Array();
	var restart_ship = 0;
    var robot = 0;
    var robot_group_id;
    var robot_click;
    var tds = document.querySelectorAll("#tab1 .empty");
    var tds2 = document.querySelectorAll("#tab2 .empty");
    var tds3 = document.querySelectorAll("#tab3 .empty");
    var group_id = document.querySelector("#group_id").innerHTML;
    if(group_id == "robot"){
    	robot = 1;
    }
    //var random_id = 100001;
    function getRandomidSuccess(request){
        console.log(request.responseText);
        group_id = request.responseText;
    }
    if(group_id == "" || group_id == "random"){
    	new SimpleAjax('getRandomid.php','GET','',getRandomidSuccess);
    }

	function allowDrop(ev){
		ev.preventDefault();
	}

	function drag(ev){

		ev.dataTransfer.setData("Text",ev.target.id);
		ev.dataTransfer.setData("offsetX",ev.offsetX);
		ev.target.style.zIndex = "0";
		ev.target.style.border = "3px solid #36e868";
		//console.log(ev.target.id);
		var order = ev.target.id.substring(4,5);
		var size = array[order]/2;
		var newrand = parseInt(ev.target.parentNode.parentNode.id);
		//console.log(ev.target.parentNode);
		if(ev.target.parentNode.className != "port-ship")
			movesetShip(newrand,size);
		resetDrop();
		//initsetShip(newrand,size);
		
	}
	function drop(ev){
		ev.preventDefault();
		var data = ev.dataTransfer.getData("Text");
		var offX = ev.dataTransfer.getData("offsetX");
		var countX = parseInt(offX/per);
		var pretd = this;
		//console.log(11);
		for(var i=0; i<countX; i++){
			pretd = pretd.previousElementSibling;
		}
		var ship = document.getElementById(data);
		if(ship.parentNode.className == "port-ship")
			restart_ship++;
		if(restart_ship == 5)
			restart();
		ship.style.zIndex = "1";

		var order = ship.id.substring(4,5);
		var size = array[order]/2;
		//console.log(brothers);
		if(parseInt(pretd.id)%10 + size <= 10 && isFree(tds,parseInt(pretd.id),size)){
		    pretd.childNodes[0].appendChild(ship);
 			initsetShip(tds,parseInt(pretd.id),size);
 			resetDrop();
		}
	}
	function resetDrop(){
		var busy_td = document.querySelectorAll("#tab1 .busy_cell");
		for (var i = 0; i < busy_td.length; i++) {
			busy_td[i].ondrop = null;
			busy_td[i].ondragover = null;
		}
		var free_td = document.querySelectorAll("#tab1 .free_cell");
		for (var i = 0; i < free_td.length; i++) {
			free_td[i].ondrop = drop;
			free_td[i].ondragover = allowDrop;
		}

	}

	function dragend(ev){
		ev.target.style.zIndex = "1";
		ev.target.style.border = "3px solid #00f";
		var order = ev.target.id.substring(4,5);
		var size = array[order]/2;
		var newrand = parseInt(ev.target.parentNode.parentNode.id);
		if(ev.target.parentNode.className != "port-ship")
			initsetShip(tds,newrand,size);


	}

	function isFree(tds,start,width){
		for (var i = 0; i < width; i++) {
			//console.log(start+i);
			if(tds[start+i].className == "busy_cell notEmpty" || tds[start+i].className == "busy_cell empty")
				return false;
		}
		return true;
	}
	function createShip(table,tds){
	    for (var i = 0; i < 5; i++) {
    		do{
    			var rand = Math.floor(Math.random()*100);
    			var contains = rand%10;
    			var size = contains + array[i]/2 > 10? 10-array[i]/2 : contains;
    			rand = rand + size - contains;
    			
    		}while(!isFree(tds,rand,array[i]/2));
    		console.log(rand);
    		//port_shipRand[i] = rand;
    		var div = document.createElement("div");
    		div.className = "ship";
    		div.style.width = array[i] +"em";
    		div.setAttribute("id",table+"ship"+i);
    		tds[rand].childNodes[0].appendChild(div);
    		initsetShip(tds,rand,array[i]/2);
    	}
    	if(table == "")
    		initnotShip();
    }
    createShip("",tds); 
    bandDrag();

    function bandDrag(){

        var Ships = document.querySelectorAll("#tab1 .ship");
        for (var i = 0; i < Ships.length; i++) {
        	Ships[i].setAttribute("draggable","true");
        	Ships[i].ondragstart = drag;
        	Ships[i].ondragend = dragend;
        }
        
     	var Div_td = document.querySelectorAll("#tab1 .free_cell");
     	//alert(Div.length);
     	for (var i = 0; i < Div_td.length; i++) {
     		Div_td[i].ondrop = drop;
    		Div_td[i].ondragover = allowDrop;
     	}
    }

	function initsetShip(tds,rand,size){
		//console.log(rand);
		var left = rand-1,right = rand +size,top = rand-11,bottom = rand+9;
		for (var j = 0; j < size; j++){
			//console.log(rand+j);
			tds[rand+j].className = "busy_cell notEmpty";
			var before_span = document.createElement("span");
			var after_span = document.createElement("span");
			before_span.className = "before";
			after_span.className = "after";
			tds[rand+j].childNodes[0].appendChild(before_span);
			tds[rand+j].childNodes[0].appendChild(after_span);
			var len = tds[rand+j].childNodes[0].childNodes.length;
			tds[rand+j].childNodes[0].childNodes[len-1].style.visibility = "hidden";
			tds[rand+j].childNodes[0].childNodes[len-2].style.visibility = "hidden";
			//creat_fork(tds[rand+j]);
		}
		 if(rand%10 != 0){
		 	tds[left].className = "busy_cell empty";
		}	 
		 if(rand%10+size < 10){
		 	 tds[right].className = "busy_cell empty";
		 }
		 if(top >= -1) {
		    for (var k = top; k <= top+size+1; k ++) {
		    	if(parseInt(k/10) == parseInt(rand/10)-1 && k>=0)
		 	    tds[k].className = "busy_cell empty";
		    }
		}
		if(bottom < 99){
		    for (var m = bottom; m <= bottom+size+1 ; m++) {
				// console.log(m);
				if(parseInt(m/10) == parseInt(rand/10)+1)
				tds[m].className = "busy_cell empty";
		    }
		}
	}

	 function initnotShip(){
	 	//var tds = document.querySelectorAll("#tab1 .empty");
	 	for (var i = 0; i < tds.length; i++) {	 		
	 		var dot_span = document.createElement("span");
			dot_span.className = "dot";
			dot_span.style.visibility = "hidden";
			tds[i].childNodes[0].appendChild(dot_span); 		
	 	}
    	
    }
    
    	for (var i = 0; i < tds2.length; i++) {
	 		var dot_span = document.createElement("span");
			dot_span.className = "dot";
			dot_span.style.visibility = "hidden";
			tds2[i].childNodes[0].childNodes[0].appendChild(dot_span);
			
   		 }

	function judgeCellRemove(rand) {
		var left = rand-1,right = rand + 1,top = rand-11,bottom = rand +9;
		if(rand % 10 != 0){
			if(tds[left].className == "busy_cell notEmpty")
				return ;
			
		}
		if(rand%10 != 9){
			if(tds[right].className == "busy_cell notEmpty")
				return ;		
		}
		if(top >= -1){
			for (var k = top; k < top +3; k++) 
				if(parseInt(k/10) == parseInt(rand/10)-1 && k>=0 && tds[k].className == "busy_cell notEmpty")
				      return ;	
		}
		if(bottom < 99){
			for (var m= bottom; m < bottom+3; m++) 
				if(parseInt(m/10) == parseInt(rand/10)+1 && tds[m].className == "busy_cell notEmpty")
				      return ;	
			
		}
		 tds[rand].className = "free_cell empty";
		 //console.log(rand);

	}
	function movesetShip(rand,size){
		//console.log(order);
		//console.log(size);
		var left = rand-1,right = rand +size,top = rand-11,bottom = rand+9;
		for (var j = 0; j < size; j++){
			tds[rand+j].className = "free_cell empty";
		}
		 if(rand % 10 != 0 ){		    
		    judgeCellRemove(left);     	 	
		}	 
		 if(rand%10+size < 10 ){
		 	judgeCellRemove(right);   
		 }
		 if(top >= -1) {
		   for (var k = top; k <= top+size+1; k ++) {
		    	if(parseInt(k/10) == parseInt(rand/10)-1 && k>=0)
		 	       judgeCellRemove(k);   
		    }
		}
		if(bottom < 99){
		  for (var m = bottom; m <= bottom+size+1 ; m++) {
				// console.log(m);
				if(parseInt(m/10) == parseInt(rand/10)+1)
				   judgeCellRemove(m);   
		    }
		}


	}

	
    var player_id;
    var judge_id;
    var timeMatch = null;
    var timeNextClick = null;
    var getClicked = null;
    var getBorderIntval = null;
    var before_span ;
	var after_span ;
	var ship_size = new Array();
	//var td = document.getElementById(judge_id);
	var Rival_td = document.querySelectorAll("#tab2 .free_cell");
   // console.log(Rand);
	function success(request){
		player_id = request.responseText;
		//console.log(request.responseText);
		if(robot){
			for (var i = 0; i < totalship; i++) {
	    	    ship_size[i] = array[i]/2;
	    		Rand[i] = parseInt(document.getElementById("tab3ship"+i).parentNode.parentNode.id.substring(4));
	        }			
			new SimpleAjax('saveShip.php', 'GET', 'group_id='+robot_group_id+'&Rand='+Rand+'&ship_size='+ship_size);
			getClicked = setInterval(Get_is_clicked,500);
    		getBorderIntval = setInterval(getBorder,500);
			PK();
		}
	}
    
    	var button = document.getElementById("Start");
    	button.onclick = function(){
        document.getElementById("Quit").style.visibility = "visible";
        document.getElementById("sign-up").style.display = "none";
        document.getElementById("sign-in").style.display = "none";
    	var message = document.getElementById("tip_message");
    	message.innerHTML = "Waiting for Rival";    	
    	for (var i = 0; i < totalship; i++) {
    	    ship_size[i] = array[i]/2;
    		Rand[i] = parseInt(document.getElementById("ship"+i).parentNode.parentNode.id);
        }
        robot_group_id = Math.round(Math.random()*100000);
        if(robot)	
    		new SimpleAjax('saveShip.php', 'GET', 'group_id='+robot_group_id+'&Rand='+Rand+'&ship_size='+ship_size, success);
    	else
    		new SimpleAjax('saveShip.php', 'GET', 'group_id='+group_id+'&Rand='+Rand+'&ship_size='+ship_size, success);

    	//new SimpleAjax('saveShip.php', 'GET', "ship_id="+ship_position+"$ship_size="+ship_size, success);
    	

    	this.className +="field-Start_disabled";
    	if(robot){
    		getClicked = setInterval(Get_is_clicked,500);
    		getBorderIntval = setInterval(getBorder,500);
    		message.innerHTML = "Match success,game start,pick a field";
    		document.getElementById("tab2").style.opacity = "1"; 
    		document.getElementById("tab1").style.opacity = "0.5"; 
    		document.querySelector(".battlefield-start").style.visibility = "hidden";
    		createShip("tab3",tds3);
    	}else
    		timeMatch = setInterval(WaitingRival,300);
    }
    function Trim(str){ 
  		return str.replace(/^\s+|\s+$/gm,''); 
    }
    //sign-up
    document.getElementById("sign-up").onclick = function(){
    	document.getElementById("tip_message").style.visibility = "hidden";
    	document.getElementById("field").style.display = "none";
    	document.querySelector(".form").style.display = "block";
    	document.querySelector(".form .sign_in-form").style.display = "none";
        document.querySelector(".form .sign_up-form").style.display = "block";
        document.getElementById("sign-up").style.background =  "#0ed145";
        document.getElementById("sign-in").style.background =  "#d5efd6";



    }
    document.getElementById("sign-up_button").onclick = function(){
    	var username = document.getElementById("up_login").value;
    	var password = document.getElementById("up_password").value;
    	if(Trim(username) == ""){
    		alert("ERROR : You username is empty !");

    	}else if(Trim(password) == "") {
    		alert("ERROR : You password is empty !");

    	}else{
    		new SimpleAjax('signUp.php','POST','username='+username+'&password='+password,signUpsuccess);
    	}

    	
    }

    document.getElementById("sign-in").onclick = function(){
    	document.getElementById("tip_message").style.visibility = "hidden";
    	document.getElementById("field").style.display = "none";
    	document.querySelector(".form").style.display = "block";
    	document.querySelector(".form .sign_up-form").style.display = "none";
    	document.querySelector(".form .sign_in-form").style.display = "block";
    	document.getElementById("sign-in").style.background =  "#0ed145";
    	document.getElementById("sign-up").style.background =  "#d5efd6";

    }
     document.getElementById("sign-in_button").onclick = function(){
    	var login = document.getElementById("in_login").value;
    	var password = document.getElementById("in_password").value;
    	if(Trim(login) == ""){
    		alert("ERROR : You username is empty !");

    	}else if(Trim(password) == "") {
    		alert("ERROR : You password is empty !");

    	}else{
    		new SimpleAjax('signIn.php','POST','login='+login+'&password='+password,signInsuccess);
    	}

    	
    }
    document.getElementById("log-out").onclick = function(){
    	document.getElementById("log-out").style.display = "none";
    	document.getElementById("sign-up").style.display = "inline";

    }

    function signInsuccess(request){
    	console.log(request.responseText);
    	if(request.responseText == 0){
    		alert("ERROR : The username is not exsited !");

    	}else if(request.responseText == 1) {
    		alert("ERROR : You password is wrong !");
    	}else {
    		document.getElementById("tip_message").style.visibility = "visible";
    		document.getElementById("field").style.display = "block";
    		document.getElementById("log-out").style.display = "inline-block";
    		document.getElementById("sign-up").style.display = "none";
    		document.getElementById("Quit").style.visibility = "visible";
    		document.querySelector(".form").style.display = "none";


    	}

    }

    
    function signUpsuccess(request){
    	console.log(request.responseText);
    	if(request.responseText == "1"){
    		document.querySelector(".form .sign_up-form").style.display = "none";
    		document.querySelector(".form .sign_in-form").style.display = "block";
    		document.getElementById("sign-in").style.background =  "#0ed145";
    		document.getElementById("sign-up").style.background =  "#d5efd6";

    	}else{
    		alert("The username has exsited !");
    		document.getElementById("up_login").value = "";
    	}
    }


    //Reatart
       document.querySelector(".Restart").onclick = function(){
       document.getElementById("sign-in").style.visibility = "hidden";
       document.getElementById("sign-up").style.visibility = "hidden";
       document.getElementById("Quit").style.visibility = "visible";
       document.querySelector(".port").style.display = "block";
       document.getElementById("rival_battlefield").style.display = "none";
       document.getElementById("self_battlefield").style.marginLeft = "30%";
       var port_line = document.querySelectorAll(".port-line");

       var port_ship = new Array();
       var ship = new Array();
       for (var i = 0; i < 5; i++) {
       	  port_ship[i] = document.createElement("div");
       	  port_ship[i].className = "port-ship";
       	  port_ship[i].style.width = document.getElementById("ship"+i).style.width;
       	  port_ship[i].appendChild(document.getElementById("ship"+i));

       }

       	port_line[0].appendChild(port_ship[0]);
       	port_line[0].appendChild(port_ship[3]);
       	port_line[1].appendChild(port_ship[1]);
       	port_line[1].appendChild(port_ship[2]);
       	port_line[2].appendChild(port_ship[4]);
       	var ships = document.querySelectorAll(".busy_cell");
       	//console.log(ships.length);
       	for (var i = 0; i < ships.length; i++) {
       		ships[i].className = "free_cell empty";
       	}
       	resetDrop();
       }

       function restart(){
       		document.querySelector(".port").style.display = "none";
       		document.getElementById("rival_battlefield").style.display = "inline";
       		document.getElementById("self_battlefield").style.marginLeft = "0";
       }
      var shot = 0;
      var left_click = 0,right_click = 0;
      var first_click = 0;
    function Is_Ship_robot(request){
    	if(request.responseText[0] == "n"){
    		document.getElementById("tab1").style.opacity = "0.5"; 
    		document.getElementById("tab2").style.opacity = "1";
			PK();


    	}
    	else{
    		document.getElementById("tab2").style.opacity = "0.5"; 
    		document.getElementById("tab1").style.opacity = "1";
    		//if(robot_click%10 != 9)
    		if(shot == 0){
    			first_click = robot_click;
    			right_click = 1;
    			shot = 1;
    		}
    		if(right_click)
    			robot_click += 1;
    		if(left_click)
    			robot_click -= 1;
    		console.log("haha",shot,right_click,left_click);
			new SimpleAjax('judge.php', 'GET', 'group_id='+robot_group_id+'&ship_id=ship'+robot_click+'&player_id=1', Is_Ship_robot);

    	}
    }
    var last_click;
    function Is_Ship(request){
        console.log(last_click);
        if(typeof(last_click) != "undefined"){
    	   last_click.childNodes[0].style.background = "#f2f4f8";
           console.log(1111);
        }
		var td = document.getElementById(judge_id);
        last_click = td;
		console.log(request.responseText);
		td.childNodes[0].style.background = "#fafa3b";
        removePK(td);
		if(request.responseText[0] == "n"){
            removePKAll();
            td.className = "busy_cell empty";
			var dot_span = document.createElement("span");
			dot_span.className = "dot";
			dot_span.style.visibility = "visible";
			td.childNodes[0].childNodes[0].appendChild(dot_span);
		    td.childNodes[0].childNodes[0].style.background = "transparent";
		    td.childNodes[0].childNodes[0].style.border = "none";
		    document.getElementById("tab2").style.opacity = "0.5"; 
    		document.getElementById("tab1").style.opacity = "1";
			
			if(robot){
				robot_click = Math.floor(Math.random()*100);
				if(shot == 2){
					shot = 0;
					left_click = 0;
				}
				if(shot == 1){
					right_click = 0;
					left_click = 1;
					robot_click = first_click-1;
					console.log(robot_click);
					shot += 1;
					}
				new SimpleAjax('judge.php', 'GET', 'group_id='+robot_group_id+'&ship_id=ship'+robot_click+'&player_id=1', Is_Ship_robot);
			}

		}else{
			td.className = "busy_cell notEmpty";
			before_span = document.createElement("span");
			after_span = document.createElement("span");
			before_span.className = "before";
			after_span.className = "after"; 
			td.childNodes[0].childNodes[0].appendChild(before_span);
			td.childNodes[0].childNodes[0].appendChild(after_span);
			showShipAround(judge_id.substring(4),tds2);
			td.childNodes[0].childNodes[0].style.border = "none";
			if(parseInt(request.responseText[0])%2  != 0)
				td.childNodes[0].childNodes[0].className += " sameShip"+request.responseText[0]; 
			if(parseInt(request.responseText[0])%2  == 0 ){
				console.log("done");
				//judge_ship_size = ship_size[request.responseText];
				var shipClass = parseInt(request.responseText[0])+1;
				td.childNodes[0].childNodes[0].className += " sameShip"+shipClass; 
				var sameShip = document.querySelectorAll(".sameShip"+shipClass);
				for (var i = 0; i < sameShip.length; i++) {
					sameShip[i].style.border = "2px solid red";
					sameShip[i].style.visibility = "visible";
				}
				var border = new Array();
				var leftTd = sameShip[0].parentNode.parentNode;

				if(parseInt(leftTd.id.substring(4))%10 != 0){
					leftTd = leftTd.previousElementSibling;
					leftTd.getElementsByTagName("span")[0].style.visibility = "visible";
					border[0] = leftTd.id.substring(4);
					//console.log(leftTd);
					//td.getElementsByTagName("span")[0].style.visibility = "visible";

				}
				var rightTd = sameShip[sameShip.length-1].parentNode.parentNode;
				if(parseInt(rightTd.id.substring(4))%10 != 9){
					rightTd = rightTd.nextElementSibling;
					rightTd.getElementsByTagName("span")[0].style.visibility = "visible";
					if(parseInt(leftTd.id.substring(4))%10 != 0)
						border[1] = rightTd.id.substring(4);
					else
						border[0] = rightTd.id.substring(4);
					//td.getElementsByTagName("span")[0].style.visibility = "visible";
				}
                if(robot)
                    new SimpleAjax('saveShip.php','GET','group_id='+robot_group_id+'&border='+border+'&player_id='+player_id,okmsg);
                else
				    new SimpleAjax('saveShip.php','GET','group_id='+group_id+'&border='+border+'&player_id='+player_id,okmsg);

			}
			td.onmouseover = null;
			td.onmouseout = null;
			td.onclick = null;
			if(request.responseText[1] == "1"){
				alert("You Win!");
			}

		}
	}
	function okmsg(request){
		console.log(request.responseText);
	}
    function getBordersuccess(request){
    	//console.log(request.responseText);
    	if(request.responseText != ""){
    	var border = request.responseText.split(',');
    	for (var i = 0; i < border.length-1; i++) {
    	document.getElementById(border[i]).getElementsByTagName("span")[0].style.visibility = "visible";
    	}
    }

    }
    function getBorder(request){
    	if(robot)
    		new SimpleAjax('getBorder.php','GET','player_id='+player_id+'&group_id='+robot_group_id,getBordersuccess);
    	else
    		new SimpleAjax('getBorder.php','GET','player_id='+player_id+'&group_id='+group_id,getBordersuccess);


    }

	function showShipAround(ship_id,td){
		var id = parseInt(ship_id);
        td.className = "busy_cell "
		var l_top = id-11,r_top = id-9,l_bottom = id+9,r_bottom = id+11;
		//console.log(tds[l_top].childNodes[0].childNodes[0]);
		 if(l_top>=0){
		 	if(parseInt(l_top/10) + 1 == parseInt(id/10))
		 	{
		 		td[l_top].getElementsByTagName("span")[0].style.visibility = "visible";
                td[l_top].className = "busy_cell empty";
                removePK(td[l_top]);

		 	}
		 }
		 if(r_top >= 0){
		 	if(parseInt(r_top/10) + 1 == parseInt(id/10)){
		 		td[r_top].getElementsByTagName("span")[0].style.visibility = "visible";
                td[r_top].className = "busy_cell empty";
                removePK(td[r_top]);
		 	}
		 }
         if(l_bottom<=99){
         	if(parseInt(l_bottom/10) - 1 == parseInt(id/10)){
         		td[l_bottom].getElementsByTagName("span")[0].style.visibility = "visible";
                td[l_bottom].className = "busy_cell empty";
                removePK(td[l_bottom]);
         	}
         }
		 if(r_bottom<=99){
		 	if(parseInt(r_bottom/10) - 1 == parseInt(id/10)){
		 		td[r_bottom].getElementsByTagName("span")[0].style.visibility = "visible";
                td[r_bottom].className = "busy_cell empty";
                removePK(td[r_bottom]);
		 	}
		 }
		 		
    }
 
    function PK(){
    	Rival_td = document.querySelectorAll("#tab2 .free_cell");
        for (var i = 0; i < Rival_td.length; i++) {
        	Rival_td[i].onmouseover = function(){
        		this.childNodes[0].childNodes[0].style.visibility = "visible";
        	}
        	Rival_td[i].onmouseout = function(){
        		this.childNodes[0].childNodes[0].style.visibility = "hidden";
        	}
        	Rival_td[i].onclick = function() {
        		//console.log(this.id);
        	    judge_id = this.id;
        	    if(robot)
        			new SimpleAjax('judge.php', 'GET', 'group_id='+robot_group_id+'&ship_id='+this.id+'&player_id='+player_id, Is_Ship);
        		else
        			new SimpleAjax('judge.php', 'GET', 'group_id='+group_id+'&ship_id='+this.id+'&player_id='+player_id, Is_Ship);
        	}
        }

    }
    function removePKAll(){
        for (var i = 0; i < Rival_td.length; i++) {
            Rival_td[i].onmouseover = null;
            Rival_td[i].onmouseout = null;
            Rival_td[i].onclick = null;
        }
    }
    function removePK(td){
            td.onmouseover = null;
            td.onmouseout = null;
            td.onclick = null;
    }
    function Waiting_success(request){
    	//console.log(request.responseText);
    	var message = document.getElementById("tip_message");
    	if(request.responseText == 1){
    		timeNextClick = setInterval(WaitingRivalClick,300);
    		getClicked = setInterval(Get_is_clicked,500);
    		getBorderIntval = setInterval(getBorder,500);
    		clearInterval(timeMatch);
    		document.querySelector(".battlefield-start").style.visibility = "hidden";
    		//console.log(player_id);
    		//console.log(request.responseText);
    		if(player_id == 0){
    			message.innerHTML = "Match success,game start,pick a field";
    			document.getElementById("tab2").style.opacity = "1"; 
    			document.getElementById("tab1").style.opacity = "0.5"; 

    			PK();
    		}else{
    			message.innerHTML = "Match success,game start, Waiting your Rival chose first";
    		}
    		
    	}

    }
    function WaitingRival(request){
    	new SimpleAjax("getReady.php",'GET','group_id='+group_id,Waiting_success);
    }
   
    function WaitingRivalClickSuccess(request){
    	if(request.responseText == player_id){
    	    	document.getElementById("tab2").style.opacity = "1"; 
    			document.getElementById("tab1").style.opacity = "0.5";	
    		PK();
    	}

    }

   	function WaitingRivalClick(){
   		new SimpleAjax('WaitingRivalClick.php','GET','group_id='+group_id,WaitingRivalClickSuccess);
   	}
	function Get_is_clicked_success(request){
		var clicked = request.responseText;
		//console.log(clicked);
		var clickedArr = clicked.split(',');
		for (var i = 0; i < clickedArr.length-1; i++) {
			var td = document.getElementById(clickedArr[i]);
			td.childNodes[0].style.background = "#f2f4f8";
			if(td.className == "busy_cell notEmpty"){
			    td.getElementsByTagName("span")[0].style.visibility = "visible";
			    td.getElementsByTagName("span")[1].style.visibility = "visible";
                td.getElementsByTagName("span")[0].style.zIndex = "3";
                td.getElementsByTagName("span")[1].style.zIndex = "3";
			 	showShipAround(clickedArr[i],tds);
			 	
			}else{
				td.getElementsByTagName("span")[0].style.visibility = "visible";

			}
            if(i == clickedArr.length-2)
                td.childNodes[0].style.background = "#fafa3b";
		}


	}
	function Get_is_clicked(){
		if(robot)
			new SimpleAjax('isClicked.php','GET','group_id='+robot_group_id+"&player_id="+player_id,Get_is_clicked_success);
		else
			new SimpleAjax('isClicked.php','GET','group_id='+group_id+"&player_id="+player_id,Get_is_clicked_success);

	}   


	var li = document.querySelectorAll("ul.choose_rival-variants li");
	console.log(li);
	li[1].onclick = function(){
		var randGid = Math.round(Math.random()*100000);
		this.childNodes[0].href = "/edsa-IWP/project/?group_id="+randGid;	
		
	}
	li[0].onclick = function(){
		this.childNodes[0].href = "/edsa-IWP/project/?group_id=random";
	}
	li[2].onclick = function(){
        this.childNodes[0].href = "/edsa-IWP/project/?group_id=robot";
		
	}
    if(group_id == "robot"){
        li[2].childNodes[0].className = "variant-link_active";
        li[0].childNodes[0].className = "variant-link_disactive";
        li[1].childNodes[0].className = "variant-link_disactive";   
    }
	else if(group_id < 100000){
		var div = document.createElement("div");
		var divchild = document.createElement("div");
		var input = document.createElement("input");
		input.value = "http://127.0.0.1:8080/edsa-IWP/project/?group_id="+group_id;
		divchild.innerHTML = "Copy the link and send to your fridend";
		li[2].appendChild(div);
		div.appendChild(divchild);
		div.appendChild(input);
		li[1].childNodes[0].className = "variant-link_active";
		li[0].childNodes[0].className = "variant-link_disactive";
		li[2].childNodes[0].className = "variant-link_disactive";		
	}          
}