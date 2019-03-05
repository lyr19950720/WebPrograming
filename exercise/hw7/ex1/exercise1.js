
var sources = [ "image-1.jpg", "image-2.jpg", "image-3.jpg",
                "image-4.jpg", "image-5.jpg", "image-6.jpg",
                "image-7.jpg", "image-8.jpg", "image-9.jpg" ];

var indice = 0;

var handler = null;

function next() {
	var Show = document.getElementById("show");
	if(indice == 8)
		indice=-1;
	Show.src= "../images/"+sources[++indice];
}

function startstop() {
	if (handler === null) {
    handler = setInterval(next, 1000);
  } else {
    clearInterval(handler);
    handler = null;
  }

}

window.onload = startstop;
