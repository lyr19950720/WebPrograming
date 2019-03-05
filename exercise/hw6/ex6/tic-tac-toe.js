// the grid is 3x3
var size = 3;

// if grid[i][j] == -1, the cell (i,j) is empty, else grid[i][j]
// is the player number who ticked that cell (0 or 1)
var grid = [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]];

// the name of the players
var player_name = ["", ""];

// the image for each player
var player_image = ["O.png", "X.png"];

// the current player
var current_player = 0;

// the total number of clicks
var clicks = 0;

// if play is false, the clicks are disabled
var play = false;

function Trim(str)
 { 
  return str.replace(/^\s+|\s+$/gm,''); 
}
// checks if the player filled the row
function winning_row(player, row) {
	for (var i = 0; i < size; i++)
		if(grid[row][i] != player)
			return false;
	return true;
				
}
// checks if the player filled the column
function winning_column(player, column) {	
	for (var i = 0; i < size; i++)
		if(grid[i][column] != player)
		return false;
	return true;
}

// checks if the player filled the downward diagonal
function winning_diagonal_down(player) {
	for (var i = 0; i < size; i++) 
		if(grid[i][i] != player)
			return false;
	return true;
}

// checks if the player filled the upward diagonal
function winning_diagonal_up(player) {
	for (var i = 0,j = size-1; i < size,j >= 0; i++,j--)
			if(grid[i][j] != player)
				return false;
	return true;

}

// checks if the player filled one of the two diagonals
function winning_diagonal(player) {
	if(winning_diagonal_down(player)||winning_diagonal_up(player))
		return true;
	
}

// checks if the player filled a row, a coloumn or a diagonal
function is_winner(player) {
	for (var i = 0; i < size; i++) {
		if(winning_diagonal(player)||winning_row(player, i)|| winning_column(player, i)){
			var Final = document.getElementById("final");
			Final.style.visibility = "visible";
			return true;
		}	
	}
}

// display the result about the winner
function and_the_winner_is(player) {
	var message = document.getElementById("msg");
	message.innerHTML = "The winner is " + player_name[player]+" clicked "+Math.ceil(clicks/2)+" times !!";

}
function no_winner() {
	var message = document.getElementById("msg");
	message.innerHTML = "No winner ,please play again !!" ;
	var Final = document.getElementById("final");
	Final.style.visibility = "visible";

}
// process the click on the object image
// in the cell (row,column) in the grid, 
function click_at(row, column, image) {
    if(play && grid[row][column]==-1){
    	clicks++;
	    image.src = player_image[current_player];
    	grid[row][column] = current_player;
    	if(is_winner(current_player)){
           and_the_winner_is(current_player);
    	}else if(clicks == 9)
				no_winner();	
 		current_player == 1? current_player = 0: current_player = 1;
    	
 }

}

// set the name of the players
function set_players() {
	
	player_name[0] = document.getElementById("player1").value;
	player_name[1] = document.getElementById("player2").value;

	if(Trim(player_name[0]) != "" && Trim(player_name[1]) != "" ){

	    var Start = document.getElementById("start");
    	Start.style.visibility = "visible";
    	document.getElementById("first_player").innerHTML = player_name[0];
    	document.getElementById("second_player").innerHTML = player_name[1];
    	//var first_player = document.getElementById("first_player").innerHTML = player_name[0];
    	//var second_player = document.getElementById("second_player").innerHTML = player_name[1];    

    	//first_player.innerHTML = player_name[0];
    	//second_player.innerHTML = player_name[1];
	
	}else{
		alert("player name is empty !!");
	}

}
// allow the game to start
function start_game() {
	play = true;
	var who = document.querySelector("input[name='who']:checked");
	   if(who.id == "check_second")
   		current_player = 1;
   	   else
   		current_player = 0;
   	
	
}

// process the play-again action
function play_again() {
	var imgs = document.querySelectorAll("#grid img"); 
	for (var i = 0; i < imgs.length; i++) {
		imgs[i].src = "white.png";
	}

	var Final = document.getElementById("final");
	Final.style.visibility = "hidden";

	for (var j= 0; j < size; j++) {
        for (var i = 0; i < size; i++) {
        	grid[j][i] = "-1"; 
        } 

    }
    var message = document.getElementById("msg");
    message.innerHTML = "";
    clicks = 0;

}

// process the quit action
function quit() {
	window.location.href = "closing.html";

	
}

