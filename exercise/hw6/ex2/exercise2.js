

function Trim(str)
 { 
  return str.replace(/^\s+|\s+$/gm,''); 
}
function check() {
	var Last = document.getElementById("last").value;
	var First = document.getElementById("first").value;
	var MaidenName = document.getElementById("maidename").value;
	var gender_radio = document.querySelector("input[name='gender']:checked");
	var mariage_radio = document.querySelector("input[name='mariage']:checked");
	if(Trim(Last)==""){ 
		alert("Error : The last name is empty");
		return false;
	}
	else if(Trim(First) == ""){
		alert("Error : The first name is empty");
		return false;
	}else{
	 	if(gender_radio == null){
		alert("Error : The gender radio isn't selected");
		return false;
		}else if(gender_radio.value == "male"){
			return true;
		}else if(gender_radio.value == "female"){
				if(mariage_radio == null){
					alert("Error : The mariage radio isn't selected");
					return false;
			
				}else if(mariage_radio.value == "no"){
				 	return true;
				}else {

					if(Trim(MaidenName) == ""){
					alert("Error : The maiden name is empty");
					return false;
					}
				}		
		}	   	   
	}
}
function cancel() {
    var Married = document.getElementById("married");
  	var Maiden = document.getElementById("maiden");
  	Married.setAttribute("class","hide input");
    Maiden.setAttribute("class","hide input");
}
  
function showMariage() {
    var gender_radio = document.querySelector("input[name='gender']:checked");
  	var Married = document.getElementById("married");
  	var Maiden = document.getElementById("maiden");
    if(gender_radio.value == "female")
    	Married.setAttribute("class","input");
    else{
    	Married.setAttribute("class","hide input");
    	Maiden.setAttribute("class","hide input");
    }

}

function showMaiden() {
      var  mariage_radio = document.querySelector("input[name='mariage']:checked");
      var Maiden = document.getElementById("maiden");
      if(mariage_radio.value == "yes"){
      		Maiden.setAttribute("class","input");
      else
      		Maiden.setAttribute("class","hide input");   
}
