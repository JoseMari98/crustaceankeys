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
			case 'mostrartermino':
				$termino=$_POST['termino'];
				$sql = "SELECT id, anchura, altura, tipo, imagen, nombre FROM imageterminosphp WHERE name_ref = '$termino'";
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
			case 'mostrarDefinicion':
				$termino=$_POST['termino'];
				$sql = "SELECT definicion, name FROM glosario WHERE name = '$termino'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"definicion" => $row['definicion'],
					"name" => $row['name']
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
				$sql = "SELECT name FROM glosario order by name asc";
				// $sql = "SELECT name, classification FROM class WHERE name like '%$cadena%'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					$row['name'],
					$row['name']

					);

				}
				// array_push($respuestas, $respuesta->fetch_array());
				// for ($i = 1; $i <$respuesta->num_rows ; $i++) {
				// 	$respuesta->field_seek($i);
				// 	array_push($respuestas, $respuesta->fetch_array());
					
				// };
				echo json_encode($rows);
				
			break;
			case 'terminos_a':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'A%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_b':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'B%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_c':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'C%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_d':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'D%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_e':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'E%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_f':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'F%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_g':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'G%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_h':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'H%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_i':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'I%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_j':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'J%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_k':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'K%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_l':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'L%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_m':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'M%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_n':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'N%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_ñ':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'Ñ%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_o':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'O%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_p':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'P%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_q':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'Q%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_r':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'R%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_s':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'S%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_t':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'T%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_u':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'U%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_v':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'V%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_w':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'W%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_x':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'X%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_y':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'Y%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_z':
				$sql = "SELECT name FROM glosario WHERE name LIKE 'Z%' ORDER BY name ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name) as numfather FROM `glosario` WHERE name = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"numfather" => $numfather['numfather']
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