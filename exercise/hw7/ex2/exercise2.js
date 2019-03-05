
var timer = null;
function tictac() {
	var myDate = new Date(); //实例一个时间对象；
  var date = [myDate.getHours(),myDate.getMinutes(),myDate.getSeconds()];
  var Span = document.getElementsByTagName("span");
  for (var i = 0; i < Span.length; i++) {
     	var imgs = Span[i].getElementsByTagName("img");
     	imgs[0].src = parseInt(date[i]/10)+".png";
     	imgs[1].src = date[i]%10+".png";
  }  
}
function start() {
    tictac();
    timer = setInterval(tictac, 1000);
}
window.onload = start;
