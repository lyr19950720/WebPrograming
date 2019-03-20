<?php 
    include("include/util.php");
    $group_id = "";
    if(isset($_GET["group_id"])){
        $group_id = $_GET["group_id"];

    }
?>
<!DOCTYPE html>
<html>
<head>
	<title>Battleship</title>
	<meta charset="utf-8" />
    <link type="text/css" rel="stylesheet" href="css/Battleship.css" />
    <script type="text/javascript" src="js/Battleship.js"></script>
    <script type="text/javascript" src="js/simpleajax.js"></script>
</head>
<body>
	<div id = "game_field">
	    <div id = "up"> 
    	    <h1 class="logo">Battleship</h1><h2 id="group_id"><?=$group_id?></h2>
        		<div class = "tip">
        		    <div id = "tip_message">Arrange</div>
                    <div id = "sign-up">Sign-up</div>
                    <div id = "sign-in">Sign-in</div>
                    <div id = "log-out">Log-out</div>
                    <div id = "Quit"><a href="index.php">Quit the game</a></div>
        	   </div>	
    	</div>
	<div id = "field">
	    <div id = "self_battlefield">
    		<table id = "tab1">
<?php 		    
                $letter = "A"; 			
    			for ($i=0; $i < 11; $i++) { 
?>
    			    <tr>
<?php				for ($j=0; $j < 11 ; $j++) {	
    						if($i==0 && $j!=0){			
?>			    
    							<td class = "order"><?= $letter++?></td>
<?php				
    						}else if($j==0&& $i!=0){
?>
    							<td class="order"><?=$i?></td>
<?php					}else if($j==0&& $i==0){
?>
    	                      <td class = "order"></td>    

<?php    					}else{
?>
    								<td class = "free_cell empty" id = "<?= ($i-1)*10+$j-1?>"><div class="busy_ship" ></div></td>
<?php
    				            }
                    }
?>
         			 </tr>
<?php				
    			}
?>
    		</table>
    		<div class="battle_lable self">Your Field </div> 
            <ul class = "placeships">

                <li class="Randomly"><a href="">Random</a></li>
                <li class="Restart">Restart</li>
                <li class="Record"><a href="">Record</a></li>
            </ul>
    		
    	</div>

    	<div id = "rival_battlefield">
    		<table id="tab2">
<?php 		
    			$letter = "A";
    			for ($i=0; $i < 11; $i++) { 
?>
    				<tr>
<?php				for ($j=0; $j < 11 ; $j++) {	
    						if($i==0 && $j!=0){			
?>			    
    							<td class = "order"><?= $letter++?></td>
<?php				
    						}else if($j==0&& $i!=0){
?>
    							<td class="order"><?=$i?></td>
<?php					}else if($j==0&& $i==0){
?>
    	                      <td class = "order"></td>    

<?php    					}else{
?>
    								<td class = "free_cell empty" id = "tab2<?= ($i-1)*10+$j-1?>"><div class="busy_ship" id = "<?= ($i-1)*10+$j-1?>"><div class="ship"></div></div></td>
<?php
    				        }
                     }
?>
         			 </tr>
<?php				
    			}
?>
    		</table>
                        <table id="tab3">
<?php       
                $letter = "A";
                for ($i=0; $i < 11; $i++) { 
?>
                    <tr>
<?php               for ($j=0; $j < 11 ; $j++) {    
                            if($i==0 && $j!=0){         
?>              
                                <td class = "order"><?= $letter++?></td>
<?php               
                            }else if($j==0&& $i!=0){
?>
                                <td class="order"><?=$i?></td>
<?php                   }else if($j==0&& $i==0){
?>
                              <td class = "order"></td>    

<?php                       }else{
?>
                                    <td class = "free_cell empty" id = "tab3<?= ($i-1)*10+$j-1?>"><div class="busy_ship" id = "<?= ($i-1)*10+$j-1?>"></div></td>
<?php
                            }
                     }
?>
                     </tr>
<?php               
                }
?>
            </table>
            <div class="battlefield-start">

                <div class="gap">
                    <div class="choose_rival">
                        <h3 class="choose_rival-lable">Rival</h3>
                        <ul class="choose_rival-variants">
                             
                            <li><a class="variant-link_active" href="">Random</a></li> 
                            <li><a class="variant-link_disactive" href="">Friend</a></li> 
                            <li><a class="variant-link_disactive" href="">Robot</a></li>
                        </ul>
                        
                    </div>
                    <div id ="Start">Start</div>
                </div>
                
        </div>           
                <div class="battle_lable rival">Rival Field </div> 
    	</div>
        <div class="port">
            <div class="port-instruction">根据提示移动船只，点击船只只改变方向</div>
            <div class="port-lines">
<?php
                    for ($i=0; $i < 3; $i++) { 
?>
                         <div class="port-line"></div>                                         
<?php                  }
    
?>

            </div>
        </div>
    	  
	</div>
    <div class = "form">
        <div class = "sign_up-form">
            <div class ="form_tip">Choose a Username and a password!</div>
            <label for = "login">Username :</label><input type="text" id="up_login" value=""></br>
            <label for = "password">Password :</label><input type="password" id="up_password" value=""></br>
            <div class="submit">
                <input class="button" id="sign-up_button" type="submit" value="Sign-up" />
            </div>

        </div>

        <div class = "sign_in-form">
            <div class ="form_tip">Fill a Login and a password!</div>
            <label for = "login">Login :</label><input type="text" id="in_login" value=""></br>
            <label for = "password">Password :</label><input type="password" id="in_password" value=""></br>
            <div class="submit">
                <input class="button" id = "sign-in_button" type="submit" value="Sign-in" />
            </div>
        </div>
    </div>
</div>

</body>
</html>