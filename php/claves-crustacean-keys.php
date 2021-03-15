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
						case 'esquemascreados':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los taxones creados
				$sql = "SELECT nombre FROM esquemasgenerales order by nombre asc";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
			break;
			case 'sinpadre':
				$sql = "SELECT fatherclass.name, class.classification FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE fatherclass.name_father IS NULL order by level asc";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification']
					,
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'mostrarhijos':
				$padre=$_POST['padre'];
				$sql = "SELECT fatherclass.name, class.classification FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE fatherclass.name_father = '$padre' order by level asc";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification']
					,
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'mostrarimagenesquema':
				$esquema=$_POST['esquema'];
				$sql = "SELECT id, anchura, altura, tipo, imagen, descripcion FROM esquemasgenerales WHERE nombre = '$esquema'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"id" => $row['id'],	
					"anchura" => $row['anchura'],
					"altura" => $row['altura'],
					"tipo" => $row['tipo'],
					"imagen" => base64_encode($row['imagen']),
					"descripcion" => $row['descripcion']);

				}
				echo json_encode($rows);
			break;
			case 'mostraresquema':
				$esquema=$_POST['esquema'];
				$sql = "SELECT descripcion, nombre FROM esquemasgenerales WHERE nombre = '$esquema'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"descripcion" => $row['descripcion'],
					"nombre" => $row['nombre']
					);

				}
				echo json_encode($rows);
			break;
			case 'mostrarClassification':
				$taxon=$_POST['taxon'];
				$sql = "SELECT class.name as name, fatherclass.name_father as name_father, class.classification as classification FROM class JOIN fatherclass ON class.name=fatherclass.name WHERE fatherclass.name = '$taxon'";
				$respuesta = $conexion->query($sql);
				$rows = array();

				while ($row = $respuesta->fetch_assoc()) {

						array_push($rows,  $row['classification']." ".$row['name']);
						$taxon = $row['name_father'];
						$sql = "SELECT class.name as name, fatherclass.name_father as name_father, class.classification as classification FROM class JOIN fatherclass ON class.name=fatherclass.name WHERE fatherclass.name = '$taxon'";
						$respuesta = $conexion->query($sql);					
				}
				echo json_encode($rows);
			break;
			case 'mostrarSynonyms':
				$taxon=$_POST['taxon'];
				$sql = "SELECT synonyms FROM class WHERE name = '$taxon'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"synonyms" => $row['synonyms']
					);

				}
				echo json_encode($rows);
			break;
			case 'mostrarLiterature':
				$taxon=$_POST['taxon'];
				$sql = "SELECT literature.datos as literature FROM literature JOIN ClassLiterature ON ClassLiterature.literature=literature.id WHERE ClassLiterature.class = '$taxon' order by literature DESC";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"literature" => $row['literature']
					);

				}
				echo json_encode($rows);
			break;
			case 'mostrarBiology':
				$taxon=$_POST['taxon'];
				$sql = "SELECT biology FROM class WHERE name = '$taxon'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"biology" => $row['biology']
					);

				}
				echo json_encode($rows);
			break;
			case 'buscador':
				// $cadena=$_POST['cadena'];
				$sql = "SELECT nombre FROM esquemasgenerales order by nombre asc";
				// $sql = "SELECT name, classification FROM class WHERE name like '%$cadena%'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					$row['nombre'],
					$row['nombre']

					);

				}
				// array_push($respuestas, $respuesta->fetch_array());
				// for ($i = 1; $i <$respuesta->num_rows ; $i++) {
				// 	$respuesta->field_seek($i);
				// 	array_push($respuestas, $respuesta->fetch_array());
					
				// };
				echo json_encode($rows);
				
			break;
			case 'mostrarimagenes':
				$tipogrupo = $_POST['tipogrupo'];
				$sql = "SELECT menuclaves.id, anchura, altura, menuclaves.tipo, imagen, grupo_caracteristica.grupo, descripcion, grupo_caracteristica.tipo as 'tipogrupo' FROM grupo_caracteristica JOIN menuclaves ON menuclaves.id_grupo = grupo_caracteristica.id WHERE grupo_caracteristica.tipo = $tipogrupo order by descripcion ASC;";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"id" => $row['id'],	
					"anchura" => $row['anchura'],
					"altura" => $row['altura'],
					"tipo" => $row['tipo'],
					"imagen" => base64_encode($row['imagen']),
					"grupo" => $row['grupo'],
					"descripcion" => $row['descripcion'],
					"tipogrupo" => $row['tipogrupo']);

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