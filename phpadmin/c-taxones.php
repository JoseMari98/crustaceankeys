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
			case 'categoriataxon':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve toda la clasificacion taxonómica
				$taxon = $_POST['taxonseleccionado'];
				$sql = "SELECT classification FROM class WHERE name = $taxon";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				echo json_encode($respuestas);
				
			break;
			case 'taxonesbox':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve toda la clasificacion taxonómica
				$sql = "SELECT * FROM classification WHERE class != 'Subespecie' ORDER BY level DESC";
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
				$sql = "SELECT name, classification FROM class JOIN classification ON class.classification=classification.class WHERE level < $level order by name asc";
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

			case 'agregartaxon':
				//Se recogen los datos del formulario enviado
				$tipotaxon = $_POST['tipotaxon'];
				$name = $_POST['name'];
				$autor = $_POST['autor'];				
				$description = $_POST['description'];
				$fatherclassbox = $_POST['fatherclassbox'];
				$synonyms = $_POST['synonyms'];
				$biology = $_POST['biology'];
				$sql = "SELECT name FROM class WHERE name = $name";
				$result = $conexion->query($sql);			
				if ($result->num_rows == 0) { 
					$sql = "INSERT INTO class(name, classification, description, synonyms, biology, autor) VALUES ($name, $tipotaxon, $description, $synonyms, $biology, $autor)";
					$conexion->query($sql);
					$sql = "INSERT INTO fatherclass(name, name_father) VALUES ($name, $fatherclassbox)";
					$conexion->query($sql);
					echo json_encode("Se ha insertado el taxón.");
				}else{
					echo json_encode("El nombre del taxón ya esta insertado. Por favor pruebe otro nombre.");
				}

			break;
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
			case 'rellenardatostaxon':
				$taxonseleccionado = $_POST['taxonseleccionado'];
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los datos del taxon seleccionado
				$sql = "SELECT class.name, classification, description, name_father, synonyms, biology, autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.name = '$taxonseleccionado' order by classification asc";
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
			case 'editartaxon':
				//Se recogen los datos del formulario enviado
				$taxoncreado = $_POST['taxoncreado'];
				$tipotaxon = $_POST['tipotaxon'];
				$name = $_POST['name'];
				$autor = $_POST['autor'];
				$description = $_POST['description'];
				$fatherclassbox = $_POST['fatherclassbox'];
				$synonyms = $_POST['synonyms'];
				$biology = $_POST['biology'];
				if($taxoncreado == $name){
					$sql = "UPDATE class SET classification=$tipotaxon, description=$description, synonyms=$synonyms, biology=$biology, autor=$autor WHERE name = $taxoncreado";
					$conexion->query($sql);
					$sql = "UPDATE fatherclass SET name_father=$fatherclassbox WHERE name = $taxoncreado";
					$conexion->query($sql);
					echo json_encode("El taxón se ha editado correctamente.");

				}else{
					$sql = "SELECT name FROM class WHERE name = $name";
					$result = $conexion->query($sql);

					
					if ($result->num_rows == 0) { 
						$sql = "UPDATE class SET name=$name, classification=$tipotaxon, description=$description, synonyms=$synonyms, biology=$biology, autor=$autor WHERE name = $taxoncreado";
						$conexion->query($sql);
						$sql = "UPDATE fatherclass SET name_father=$fatherclassbox WHERE name = $name";
						$conexion->query($sql);
						echo json_encode("El taxón se ha editado correctamente.");
						// echo json_encode($sql);
					}else{
						echo json_encode("El nombre del taxón ya esta registrado. Por favor pruebe otro nombre.");
					}
				}
			break;
			case 'eliminartaxon':
					//Se recogen los datos del formulario enviado
					$taxoncreado = $_POST['taxoncreado'];

					//para literaturas
					$sql = "SELECT literature FROM ClassLiterature WHERE class = $taxoncreado";
					$result = $conexion->query($sql);
					$tupla = $result->fetch_assoc();
					$id_literature = $tupla['literature'];

					if ($result->num_rows != 0) {
						$sql = "DELETE FROM ClassLiterature WHERE class = $taxoncreado";
						$conexion->query($sql);
						$sql = "DELETE FROM literature WHERE id = $id_literature";
						$conexion->query($sql);
					}
					
					//para class valor
					$sql = "SELECT * FROM class_valor WHERE name = $taxoncreado";
					$result = $conexion->query($sql);

					if ($result->num_rows != 0) {
						$sql = "DELETE FROM class_valor WHERE name = $taxoncreado";
						$conexion->query($sql);
					}

					//para grupo taxon
					$sql = "SELECT * FROM grupo_taxon WHERE name = $taxoncreado";
					$result = $conexion->query($sql);

					if ($result->num_rows != 0) {
						$sql = "DELETE FROM grupo_taxon WHERE name = $taxoncreado";
						$conexion->query($sql);
					}

					//para grupo taxon
					$sql = "SELECT * FROM mapadistribucion WHERE taxon = $taxoncreado";
					$result = $conexion->query($sql);

					if ($result->num_rows != 0) {
						$sql = "DELETE FROM mapadistribucion WHERE taxon = $taxoncreado";
						$conexion->query($sql);
					}

					$sql = "SELECT * FROM imagephp WHERE name_ref = $taxoncreado";
					$result = $conexion->query($sql);

					if ($result->num_rows != 0) {
						$sql = "DELETE FROM imagephp WHERE name_ref = $taxoncreado";
						$conexion->query($sql);
					}

					$sql = "DELETE FROM class WHERE name = $taxoncreado";
					$conexion->query($sql);
					// $sql = "DELETE FROM fatherclass WHERE name = $taxoncreado";
					// $conexion->query($sql);
					echo json_encode("El taxón se ha eliminado correctamente.");
					
			break;
			case 'asociargrupo':
				$grupo = $_POST['grupo'];
				$taxon = $_POST['taxon'];
				$tipogrupo = $_POST['tipogrupo'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = $tipogrupo"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];
				$sql = "SELECT * FROM grupo_taxon WHERE id_grupo = $id_grupo AND name = $taxon"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows == 0){
					$sql = "INSERT INTO grupo_taxon(id, id_grupo, name) VALUES (NULL, $id_grupo, $taxon)"; //insertar en la tabla valor
					$conexion->query($sql);
					echo json_encode("El taxón se ha asociado correctamente.");
				}else{
					echo json_encode("La asociación entre grupo y taxon ya existe. Por favor pruebe otro.");
				}
			break;
		
			case 'taxonesgrupo':
				//Se recogen los datos del formulario enviado
				$grupo = $_POST['grupo'];
				$tipogrupo = $_POST['tipogrupo'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = $tipogrupo"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];
				$sql = "SELECT name FROM grupo_taxon WHERE id_grupo = $id_grupo ORDER BY name ASC"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows == 0){
					echo json_encode("No hay taxones asociados.");
				}else{
					$respuestas = array();
					$entero = array();
					for ($i = 0; $i <$result->num_rows ; $i++) {
						$result->field_seek($i);
						array_push($respuestas, $result->fetch_array());
						$name = $respuestas[$i]['name'];
						$sql = "SELECT name, classification, level FROM class JOIN classification ON class.classification=classification.class WHERE name = '$name' order by level desc";
						$respuesta = $conexion->query($sql);
						$respuesta->field_seek($i);
						array_push($entero, $respuesta->fetch_array());
					};
					echo json_encode($entero);
				}
			break;
			
			case 'eliminarasociacion':
				//Se recogen los datos del formulario enviado
				$grupo = $_POST['grupo'];
				$taxon = $_POST['taxon'];
				$tipogrupo = $_POST['tipogrupo'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = $tipogrupo"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];
				$sql = "SELECT * FROM grupo_taxon WHERE id_grupo = $id_grupo AND name = $taxon"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$sql = "DELETE FROM grupo_taxon WHERE id_grupo = $id_grupo AND name = $taxon";
					$conexion->query($sql);
					echo json_encode("La asociación se ha eliminado correctamente.");
				}else{
					echo json_encode("No hay asociación.");
				}
			break;
			case 'añadirimagen':
				if ($_FILES["file"]["name"][0] != ""){
				    $reporte= null;
				    $file = $_FILES["file"];
				    $nombre = $_POST['nombre'];
				    $taxon = $_POST['taxon'];
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
				            $sql="INSERT INTO `imagephp` (anchura,altura,tipo,imagen,name_ref,nombre) VALUES ($width,$heigth,'$tipo','$foto',$taxon,'$nombre')";
				            // echo $sql;
				            $conexion->query($sql);
				            echo "<p style='color: blue'>La imagen $name se ha insertado.</p>";
				        };
				    };
				    
				    echo $reporte;
				};
			break;
			case 'mostrarimagenes':
				$taxoncreado = $_POST['taxoncreado'];
				$sql = "SELECT id, anchura, altura, tipo, imagen, nombre FROM imagephp WHERE name_ref = $taxoncreado";
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
				
				$sql = "UPDATE imagephp SET nombre='$nombre' WHERE id = $id";
				$conexion->query($sql);

				echo json_encode("La imagen ha sido editada.");
			break;
			case 'borrarimagen':
				$id = $_POST['id'];
				$sql = "DELETE FROM imagephp WHERE id = $id";
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
				$sql = "SELECT datos FROM literature ORDER BY datos ASC";
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
				$sql = "SELECT datos FROM literature WHERE id NOT IN( SELECT literature FROM ClassLiterature WHERE class like '$taxoncreado') ORDER BY datos ASC";
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

			case 'piefoto':
				//Se recogen los datos del formulario enviado
				$sql = "SELECT name_ref, nombre FROM imagephp ORDER BY nombre ASC";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"taxon" => $row['name_ref'],
					"nombre" => $row['nombre']
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