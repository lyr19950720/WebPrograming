/*
 * Basic JS example code
 */

function finalPrice() {
	var x = document.querySelector( "#pbvat" )
	var pbvatVal = x.value;
	var vatVal = document.querySelector( "#vat" ).value;
	if ( isNaN( pbvatVal ) )
		alert( "price before VAT is incorrect!" );
	else if ( isNaN( vatVal ) )
		alert( "VAT incorrecte!" );
	else {
		pbvatVal = Number( pbvatVal );
		vatVal = Number( vatVal );
		var res = document.getElementById("result");
		// var res = document.querySelector( "#result" );
		var total = document.getElementById("total");
		// var total = document.querySelector( "#total" );
		total.innerHTML = ( pbvatVal + pbvatVal * vatVal / 100 ).toFixed(2);
		res.style.visibility = "visible";
	}
}
