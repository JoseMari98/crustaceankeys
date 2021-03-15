<?php
session_start();
?>

<?php


// se definen los datos del servidor de base de datos 

$conection['server']="localhost";  //host
$conection['user']="crustaceankeys";         //usuario
$conection['pass']="Crus24;04keys";             //password
$conection['base']="crustaceankeys";    //base de datos

// crea la conexion pasandole el servidor , usuario y clave
$conect= mysqli_connect($conection['server'],$conection['user'],$conection['pass'],$conection['base']);
if (mysqli_connect_errno()) {
    die("No se puede conectar a la base de datos:" . mysqli_connect_error());
}else{ // si la conexion fue exitosa , selecciona la base		
    if (!mysqli_set_charset($conect, "utf8")) {
        die("Error al cargar el set de caracteres utf8: %s\n" . mysqli_error($conect));
    }
	$conexion=$conect;
}

$tbl_name = "administracion";

// comprueba que la conexion sea exitosa
if ($conexion->connect_error) {
 die("La conexion falló: " . $conexion->connect_error);
}else{
	// comprueba que los valores de login no esten vacios 
	if (empty($_POST['username']) == true || empty($_POST['password']) == true){
	 	die("Rellene los campos para entrar a la administracion. <br><a href='../administracion.html'>Volver a Intentarlo</a>");
	}else{
		// recoge los campos de Login
		$username = $_POST['username'];
		$password = $_POST['password'];
		// se guarda la sentencia SQL y su resultado
		$sql = "SELECT * FROM $tbl_name WHERE user = '$username'";

		$result = $conexion->query($sql);

		// comprueba que haya al menos un resultado
		if ($result->num_rows == 0) {     
			echo "El Username o Password es incorrecto.";

			echo "<br><a href='../administracion.html'>Volver a Intentarlo</a>";
		}else{
			$row = $result->fetch_array(MYSQLI_ASSOC);
			// comprueba si las contraseñas son correctas mediante el hash y haya sido validado dentro de la base de datos(1 = validado, 0 no validado)
			if (password_verify($password, $row['password'])) { 
				if ($row['validado'] == 1) {
				    $_SESSION['loggedin'] = true;
				    $_SESSION['username'] = $username;
				    $_SESSION['start'] = time();
				    $_SESSION['expire'] = $_SESSION['start'] + (420 * 60);

				    // echo "¡Bienvenido! " . $_SESSION['username'];
				    // echo "<br><br><a href=panel-control.php>Panel de Control</a>"; 
				    header('Location: agregar-taxon.php');
				}else{
					echo "El usuario no esta validado, solicite a un administrador para que lo valide";

			  		echo "<br><a href='../administracion.html'>Volver a Intentarlo</a>";
				}
			} else { 
			  echo "El Username o Password es incorrecto.";

			  echo "<br><a href='../administracion.html'>Volver a Intentarlo</a>";
			}
			 
		}
	}
mysqli_close($conexion); 
}

 ?>