
// the array of the path of the images
var array = [];

// if clicked[i] is true, array[i] if visible
var clicked = [];

// to distinguish between the first
// click and the second click of two
// consecutive clicks
var first_click = true;

// the index in the array of the first image clicked
var first_index = 0;

// the total number of pairs of clicks
var clicks_number = 0;

// the number of good pairs of clicks
// (i.e. clicks which reveal
// ed two identical images)
var good_clicks_number = 0;
//  Whether the entire game interface is perminted to be clicked
var permitClick = true;
// change the content of the attribute src of the two
// images at index i and j to the question mark image
function hide(i, j) {
	var Img = document.getElementsByTagName("img");
	Img[i].src ="question-mark.png";
	clicked[i] = false;
	//var Img = document.getElementsByTagName("img");
	Img[j].src ="question-mark.png";
	clicked[j] =false;
	permitClick = true;
}

// process the click on image at index n
function click_image(n) {
	if(clicked[n] != true && permitClick){
	clicks_number++;
	var Img = document.getElementsByTagName("img");
	Img[n].src = array[n];
	clicked[n] = true;
	if(first_click){
		first_click = false;
		first_index = n;
	}else{
		permitClick = false;
		first_click = true;
		if(array[first_index] != array[n]){
			setTimeout(hide, 2000,first_index,n);
			
		}else{
			permitClick = true;
			good_clicks_number++;
			if(good_clicks_number == 8){
				var Result =document.getElementById("result");
			    Result.innerHTML = "Success in " + Math.ceil(clicks_number/2)+" times ";
			    Result.style.visibility = "visible";
			}

		}
	}
	}
}
// fill the array with the content of the name
// attribute of the images
function fill_array() {
	var images = document.querySelectorAll("#grid img");
	for (var i = 0; i < images.length; i++) 	
		array[i] = images[i].name;
}

// to fill the array before the game starts
window.onload = fill_array;

