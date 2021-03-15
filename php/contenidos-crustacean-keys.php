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

// comprueba que la conexion sea exitosa
if ($conexion->connect_error) {
 die("La conexion falló: " . $conexion->connect_error);
}else{
	if (isset($_POST['tipo'])){
		$op=$_POST['tipo'];	
		switch ($op) {
			case 'contenidoinicio':
				$sql = "SELECT contenido FROM `paginas` WHERE name = 'Inicio';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"contenido" => $row['contenido']
					);
				}

				echo json_encode($rows);
			break;
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');
	}

mysqli_close($conexion); 

}
?>