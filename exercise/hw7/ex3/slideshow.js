
window.onload = function() {
	timer = setInterval(change, 1000);
};
var current_index = 0;
function change(){
	var div = document.getElementById("slideshow");
	var imgs = div.getElementsByTagName('img');
    var next_index = (current_index+1)%imgs.length;
	imgs[next_index].style.zIndex = 3;
	imgs[current_index].style.zIndex = 2;
    imgs[next_index].style.opacity = 1; 
    imgs[current_index].style.zIndex = 1;
    imgs[current_index].style.opacity = 0; 
    current_index = next_index;	
}
