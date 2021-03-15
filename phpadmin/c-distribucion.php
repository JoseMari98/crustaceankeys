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
				$sql = "SELECT name, classification, level FROM class JOIN classification ON class.classification=classification.class order by name asc";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
			break;
			case 'taxonescondistribucion':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los taxones creados
				$sql = "SELECT taxon FROM mapadistribucion ORDER BY taxon ASC";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
			break;
			case 'insertar_distribucion':
				if ($_FILES["file"]["name"][0] != ""){
				    $reporte= null;
				    $file = $_FILES["file"];
				    $taxon = $_POST['taxon'];
					$sql = "SELECT taxon FROM mapadistribucion WHERE taxon = $taxon";
					$result = $conexion->query($sql);			
				    for ($i=0; $i<count($file['name']); $i++){
				        $name= $file['name'][$i];
				        $tipo= $file["type"][$i];
				        $ruta_provisonal= $file["tmp_name"][$i];
				        $size= $file["size"][$i];
				        $dimensiones= getimagesize($ruta_provisonal);
				        $width= $dimensiones[0];
				        $heigth= $dimensiones[1];
				        $carpeta= "imagenes/";
				        if ($tipo != "image/jpeg" && $tipo != "image/png" && $tipo != "image/jpg" && $tipo != "image/gif"){
				            $reporte .= "<p style='color: red'> El archivo introducido no es formato de imagen permitido.</p>";
				        }else if($size > 1000*1000){
				            $reporte .= " <p style='color: red'> El archivo introducido supera el maximo permitido 1 MB.</p>";
				        }else if ($result->num_rows != 0) {
							$reporte .= " <p style='color: red'>El taxón $taxon ya posee una distribución geográfica asignada.</p><br><br><br>";	
						}else{

				            $foto = addslashes(file_get_contents($ruta_provisonal));
				            $sql="INSERT INTO `mapadistribucion` (anchura,altura,tipo,imagen,taxon) VALUES ($width,$heigth,'$tipo','$foto', $taxon)";
				            // echo $sql;
				            $conexion->query($sql);
				            echo "<p style='color: blue'>La distribución geográfica para $taxon se ha insertado.</p>";
				        };
				    };
				    
				    echo $reporte;
				};
			break;
			case 'mostrardistribucion':
				$taxonseleccionado = $_POST['taxonseleccionado'];
				$sql = "SELECT id, anchura, altura, tipo, imagen, $taxonseleccionado FROM mapadistribucion WHERE taxon = $taxonseleccionado";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"id" => $row['id'],	
					"anchura" => $row['anchura'],
					"altura" => $row['altura'],
					"tipo" => $row['tipo'],
					"imagen" => base64_encode($row['imagen']),
					"nombre" => $row['nombre']);

				}
				echo json_encode($rows);
			break;
			case 'borrardistribucion':
				$id = $_POST['id'];
				$sql = "DELETE FROM mapadistribucion WHERE id = $id";
				$conexion->query($sql);
				echo json_encode("La Distribución Geográfica ha sido eliminada.");
			break;
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');	
	}

mysqli_close($conexion); 

}
 ?>