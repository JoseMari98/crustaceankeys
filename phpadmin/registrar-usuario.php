<?php

$conection['server']="localhost";  //host
$conection['user']="crustaceankeys";         //usuario
$conection['pass']="Crus24;04keys";             //password
$conection['base']="crustaceankeys";    //base de datos
$tbl_name = "administracion";
 
 

 // $conexion = new mysqli($host_db, $user_db, $pass_db, $db_name);

 // if ($conexion->connect_error) {
 // die("La conexion falló: " . $conexion->connect_error);
 // }
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


 $form_pass = $_POST['password'];
 
 $hash = password_hash($form_pass, PASSWORD_BCRYPT); 
 $buscarUsuario = "SELECT * FROM $tbl_name
 WHERE user = '$_POST[username]' ";

 $result = $conexion->query($buscarUsuario);

 $count = mysqli_num_rows($result);

 if ($count == 1) {
 echo "<br />". "El Nombre de Usuario ya está en uso." . "<br />";

 echo "<a href='registrousuario.html'>Por favor escoga otro Nombre</a>";
 }
 else{

 $query = "INSERT INTO $tbl_name (user, password)
           VALUES ('$_POST[username]', '$hash')";

 if ($conexion->query($query) === TRUE) {
 
 echo "<br />" . "<h2>" . "¡Usuario Creado Exitosamente!" . "</h2>";
 echo "<h4>" . "Recuerde validar en la base de datos" . "\n\n";
 echo "<h5>" . "Hacer Login: " . "<a href='../administracion.html'>Login</a>" . "</h5>"; 
 }

 else {
 echo "Error al crear el usuario." . $query . "<br>" . $conexion->error; 
   }
 }
 mysqli_close($conexion);
?>