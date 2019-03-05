
// to distinguish between the first
// click and the second click of two
// consecutive clicks
var first_click = true;

// the first image clicked
var first_image;

// if not_finished is true, there
// are still images to swao
var not_finished = true;
var i=0;
// process the click on the image
function click_on(image) {

        i++;
	if(not_finished){
           if(first_click){
        	first_click = false;
        	first_image = image;
       		
       	}else{        
        	first_click = true;
       		var swapsrc = image.src;
       		var swapname = image.name;
       		image.src = first_image.src;
       		image.name = first_image.name;
       		first_image.src = swapsrc;
       		first_image.name = swapname;
       		if(is_finished()){
       		       not_finished = false;
       		       var Result = document.getElementById("result");
       		       Result.style.visibility = "visible";
                       Result.innerHTML = "You solved the puzzle!!"+i+"times";
       		}
	}

}
}

// returns true if the puzzle is solved
function is_finished() {
	var arr = document.querySelectorAll("#puzzle img");
	var s = "";
	for (var i = 0; i < arr.length;i++) {
		s = s + arr[i].name;
		
	}
	return s == "abcdefghijkl";

}
