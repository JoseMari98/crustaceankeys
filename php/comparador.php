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

// comprueba que la conexion sea exitosa
if ($conexion->connect_error) {
 die("La conexion falló: " . $conexion->connect_error);
}else{

	if (isset($_POST['tipo'])){
		$op=$_POST['tipo'];	
		switch ($op) {
			case 'taxonescreados':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los taxones creados
				$sql = "SELECT name FROM class WHERE classification = 'Especie' order by name asc";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
			break;

			case 'rellenartaxon':
				$taxon = $_POST['taxon'];

				$sql = "SELECT caracteristica.caracteristica, class_valor.valor FROM valor_caracteristica JOIN `class_valor` ON valor_caracteristica.id = class_valor.id_valor JOIN caracteristica ON caracteristica.id = valor_caracteristica.id_caracteristica WHERE name = $taxon;";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"caracteristica" => $row['caracteristica'],
					"valor" => $row['valor']
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