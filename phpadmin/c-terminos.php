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
			case 'taxonesbox':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve toda la clasificacion taxonómica
				$sql = "SELECT * FROM classification order by level desc";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
				
			break;
			case 'fatherclassbox':

				// recoge dato de formulario
				$taxon = $_POST['taxon'];
				// busca el nivel de la casificación taxonómica
				$sql = "SELECT level FROM classification WHERE class = '$taxon'";
				$respuesta = $conexion->query($sql);
				$level= array_pop($respuesta->fetch_array());
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los taxones creados con anterioridad que esten por encima de la clasificación taxonómica elegida
				$sql = "SELECT name, classification FROM class JOIN classification ON class.classification=classification.class WHERE level < $level order by level desc";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				// if ($result->num_rows == 0) { 
					array_push($respuestas, $respuesta->fetch_array());
					for ($i = 1; $i <$respuesta->num_rows ; $i++) {
						$respuesta->field_seek($i);
						array_push($respuestas, $respuesta->fetch_array());
						
					};
				// };
				echo json_encode($respuestas);

				
			break;

			case 'agregartermino':
				//Se recogen los datos del formulario enviado
				$name = $_POST['name'];
				$definicion = $_POST['definicion'];
				$sql = "SELECT name FROM glosario WHERE name = $name";
				$result = $conexion->query($sql);			
				if ($result->num_rows == 0) { 
					$sql = "INSERT INTO glosario(name, definicion) VALUES ($name, $definicion)";
					$conexion->query($sql);
					echo json_encode("Se ha insertado el termino $name en el Glosario.");
				}else{
					echo json_encode("El nombre del termino ya está insertado. Por favor pruebe otro nombre.");
				}

			break;
			case 'terminoscreados':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los taxones creados
				$sql = "SELECT name FROM glosario order by name asc";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
			break;
			case 'rellenardatostermino':
				$terminoseleccionado = $_POST['terminoseleccionado'];
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los datos del taxon seleccionado
				$sql = "SELECT name, definicion FROM glosario WHERE name = '$terminoseleccionado'";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				echo json_encode($respuestas);
			break;
			case 'cambiarclass':

				// recoge dato de formulario
				$taxon = $_POST['taxon'];
				$taxoncreado = $_POST['taxoncreado'];
				// busca el nivel de la casificación taxonómica
				$sql = "SELECT level FROM classification WHERE class = '$taxon'";
				$respuesta = $conexion->query($sql);
				$level= array_pop($respuesta->fetch_array());
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los taxones creados con anterioridad que esten por encima de la clasificación taxonómica elegida
				$sql = "SELECT name, classification, level FROM class JOIN classification ON class.classification=classification.class WHERE level < $level AND classification != '$taxoncreado' order by level desc";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				// if ($result->num_rows == 0) { 
					array_push($respuestas, $respuesta->fetch_array());
					for ($i = 1; $i <$respuesta->num_rows ; $i++) {
						$respuesta->field_seek($i);
						array_push($respuestas, $respuesta->fetch_array());
						
					};
				// };
				echo json_encode($respuestas);

				
			break;
			case 'editartermino':
				//Se recogen los datos del formulario enviado
				$terminocreado = $_POST['terminocreado'];
				$name = $_POST['name'];
				$definicion = $_POST['definicion'];
				if($terminocreado == $name){
					$sql = "UPDATE glosario SET definicion=$definicion WHERE name = $terminocreado";
					$conexion->query($sql);
					echo json_encode("El término $terminocreado se ha editado correctamente.");

				}else{
					$sql = "SELECT name FROM glosario WHERE name = $name";
					$result = $conexion->query($sql);

					
					if ($result->num_rows == 0) { 
						$sql = "UPDATE glosario SET name=$name, definicion=$definicion WHERE name = $terminocreado";
						$conexion->query($sql);
						echo json_encode("El término $terminocreado se ha editado correctamente.");
						// echo json_encode($sql);
					}else{
						echo json_encode("El nombre del término ya se encuentra registrado. Por favor pruebe otro nombre.");
					}
				}
			break;
			case 'eliminartermino':
					//Se recogen los datos del formulario enviado
					$terminocreado = $_POST['terminocreado'];
					
					$sql = "DELETE FROM glosario WHERE name = $terminocreado";
					$conexion->query($sql);
					// $sql = "DELETE FROM fatherclass WHERE name = $taxoncreado";
					// $conexion->query($sql);
					echo json_encode("El término se ha eliminado correctamente del Glosario.");
					
			break;
			case 'añadirimagen':
				if ($_FILES["file"]["name"][0] != ""){
				    $reporte= null;
				    $file = $_FILES["file"];
				    $nombre = $_POST['nombre'];
				    $termino = $_POST['termino'];
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
				            $reporte .= "<p style='color: red'> El archivo $name no es una imagen valida.</p>";
				        }else if($size > 1000*1000){
				            $reporte .= " <p style='color: red'> El archivo $name supera el maximo permitido 1 MB.</p>";
				        }else{

				            $foto = addslashes(file_get_contents($ruta_provisonal));
				            $sql="INSERT INTO `imageterminosphp` (anchura,altura,tipo,imagen,name_ref,nombre) VALUES ($width,$heigth,'$tipo','$foto',$termino,'$nombre')";
				            // echo $sql;
				            $conexion->query($sql);
				            echo "<p style='color: blue'>La imagen $name del término $termino se ha insertado.</p>";
				        };
				    };
				    
				    echo $reporte;
				};
			break;
			case 'mostrarimagenes':
				$terminocreado = $_POST['terminocreado'];
				$sql = "SELECT id, anchura, altura, tipo, imagen, nombre FROM imageterminosphp WHERE name_ref = $terminocreado";
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
			case 'editarimagen':
				$id = $_POST['id'];
				$nombre = $_POST['nombre'];
				
				$sql = "UPDATE imageterminosphp SET nombre='$nombre' WHERE id = $id";
				$conexion->query($sql);

				echo json_encode("La imagen ha sido editada.");
			break;
			case 'borrarimagen':
				$id = $_POST['id'];
				$sql = "DELETE FROM imageterminosphp WHERE id = $id";
				$conexion->query($sql);
				echo json_encode("La imagen ha sido eliminada.");
			break;
			case 'agregarliteratura':
				//Se recogen los datos del formulario enviado
				$literatura = $_POST['literatura'];
				$sql = "SELECT datos FROM literature WHERE datos = '$literatura'";
				$respuesta = $conexion->query($sql);				
				if (!$respuesta->fetch_assoc()) { 
					$sql = "INSERT INTO literature(datos) VALUES ('$literatura')";
					$conexion->query($sql);
					echo json_encode("Se ha insertado la literatura.");
				}else{
					echo json_encode("La literatura ya esta insertada.");
				}

			break;
			case 'literaturascreadas':
				//Busca y devuelve los datos encontrados en forma de Array
				$sql = "SELECT datos FROM literature order by datos desc";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
			break;
			case 'rellenardatosliteratura':
				$literaturaseleccionada = $_POST['literaturaseleccionada'];
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los datos del taxon seleccionado
				$sql = "SELECT datos FROM literature WHERE datos = '$literaturaseleccionada'";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				echo json_encode($respuestas);
			break;
			case 'editarliteratura':
				//Se recogen los datos del formulario enviado
				$literaturaseleccionada = $_POST['literaturaseleccionada'];
				$literatura = $_POST['literatura'];
				$sql = "SELECT datos FROM literature WHERE datos = '$literatura'";
				$result = $conexion->query($sql);
				if ($result->num_rows == 0) { 
					$sql = "UPDATE literature SET datos='$literatura' WHERE datos = '$literaturaseleccionada'";
					$conexion->query($sql);
					echo json_encode("La literatura se ha editado correctamente.");
				}else{
					echo json_encode("No hay ningún cambio en la literatura seleccionada.");
				}
			break;
			case 'eliminarliteratura':
					//Se recogen los datos del formulario enviado
					$literaturaseleccionada = $_POST['literaturaseleccionada'];
					
					$sql = "DELETE FROM literature WHERE datos = '$literaturaseleccionada'";
					$conexion->query($sql);
					echo json_encode("La literatura se ha eliminado correctamente.");
					
			break;
			case 'mostrarliteraturasposibles':
				//Se recogen los datos del formulario enviado
				$taxoncreado = $_POST['taxoncreado'];
				$sql = "SELECT datos FROM literature WHERE id NOT IN( SELECT literature FROM ClassLiterature WHERE class like '$taxoncreado')";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"datos" => $row['datos']
					);

				}
				echo json_encode($rows);
					
			break;
			case 'vincular':
				//Se recogen los datos del formulario enviado
				$literatura = $_POST['literatura'];
				$taxon = $_POST['taxon'];
				$sql = "SELECT id FROM literature WHERE datos = '$literatura'";
				$respuesta = $conexion->query($sql);
				$row = $respuesta->fetch_assoc();
				$id = $row['id'];	
				$sql = "INSERT INTO ClassLiterature(class, literature) VALUES ('$taxon',$id)";
				$conexion->query($sql);
				echo json_encode("La vinculación se ha completado con éxito.");
			break;
			case 'taxonvinculado':
				//Se recogen los datos del formulario enviado
				$sql = "SELECT DISTINCT name, classification FROM class JOIN ClassLiterature ON class.name=ClassLiterature.class order by classification, name asc";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification']
					);
				}
				$conexion->query($sql);
				echo json_encode($rows);
			break;
			case 'mostrarliteraturasvinculadas':
				//Se recogen los datos del formulario enviado
				$taxonvinculado = $_POST['taxonvinculado'];
				$sql = "SELECT datos, id FROM ClassLiterature JOIN literature ON literature.id=ClassLiterature.literature WHERE class = '$taxonvinculado' order by datos asc";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"datos" => $row['datos'],
					"id" => $row['id']
					);
				}
				$conexion->query($sql);
				echo json_encode($rows);
			break;
			case 'desvincular':
				//Se recogen los datos del formulario enviado
				$taxonvinculado = $_POST['taxonvinculado'];
				$id = $_POST['id'];
				$sql = "DELETE FROM ClassLiterature WHERE literature = '$id' and class = '$taxonvinculado'";
				$conexion->query($sql);
				echo json_encode("La literatura ha sido desvinculada con exito.");
			break;
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');	
	}

mysqli_close($conexion); 

}
 ?>