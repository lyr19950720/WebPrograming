var x ;
var y ;

var checked = true;

function newMult() {

	x = Math.floor(Math.random() * 10 + 1);
	y = Math.floor(Math.random() * 10 + 1);
    var x1 = document.getElementById("nbr1");
	var y1 = document.getElementById("nbr2");
	x1.innerHTML = x;
	y1.innerHTML = y;
	//checked = false;
}

function check() {
	var answer = document.getElementById("answer");
	var result = document.getElementById("result");
	if(checked){
	var x1 = document.getElementById("nbr1");
	var y1 = document.getElementById("nbr2");
    var x = Number(x1.innerHTML);
    var y = Number(y1.innerHTML);
	var res = x * y;  
    if(answer.value == res){
    	result.style.color = "green"; 
		result.innerHTML = "Correct anser"; 
		     
	}else{
		result.style.color = "red";
	  	result.innerHTML = "Wrong :"+x+" x "+y+" = "+res;

	}
		result.style.visibility = "visible";
		button.value = "More";
        checked = false;	
	}else{
		answer.value = "";
		newMult();
		button.value = "Check";
		checked = true;
	}
	
}
