<!DOCTYPE HTML>
<html>
    <body>
        <form method="post" action="welcome.php">
            Username:<br/>

            <input type="text" name="username"><br/>

            <input type="submit" value="Welcome!">
        </form>
      	<?php
            $php_user_variable = $_GET["username"];
      
      		if(isset($php_user_variable)){ ?>
      
      		  <p>Welcome <?php echo $php_user_variable; ?></p>
      
              <?php
            }
        ?>
    </body>
</html>