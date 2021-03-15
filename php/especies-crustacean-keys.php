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
				$sql = "SELECT fatherclass.name, class.classification FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie'";
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
			case 'especies_a':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'A%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_b':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'B%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_c':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'C%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_d':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'D%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_e':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'E%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_f':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'F%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_g':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'G%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_h':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'H%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_i':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'I%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_j':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'J%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_k':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'K%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_l':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'L%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_m':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'M%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_n':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'N%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_ñ':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'Ñ%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_o':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'O%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_p':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'P%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_q':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'Q%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_r':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'R%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_s':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'S%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_t':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'T%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_u':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'U%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_v':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'V%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_w':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'W%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_x':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'X%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_y':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'Y%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'especies_z':
				$sql = "SELECT fatherclass.name, class.classification, class.autor FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE class.classification='Especie' AND fatherclass.name LIKE 'Z%';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor'],
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'total_especies':
				$sql = "SELECT COUNT(name) AS total_especies FROM `class` WHERE classification = 'Especie';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"total_especies" => $row['total_especies'],
					"classification" => $row['classification']
					,
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'total_clases':
				$sql = "SELECT COUNT(name) AS total_clases FROM `class` WHERE classification = 'Clase';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"total_clases" => $row['total_clases'],
					"classification" => $row['classification']
					,
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'total_ordenes':
				$sql = "SELECT COUNT(name) AS total_ordenes FROM `class` WHERE classification = 'Orden';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"total_ordenes" => $row['total_ordenes'],
					"classification" => $row['classification']
					,
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'total_familias':
				$sql = "SELECT COUNT(name) AS total_familias FROM `class` WHERE classification = 'Familia';";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					$sqlcount = "SELECT COUNT(name_father) as numfather FROM `fatherclass` WHERE name_father = '".$row['name']."'";
					$contadorfilas = $conexion->query($sqlcount);
					$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"total_familias" => $row['total_familias'],
					"classification" => $row['classification']
					,
					"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'mostrarhijos':
				$padre=$_POST['padre'];
				$sql = "SELECT fatherclass.name, class.classification FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE fatherclass.name_father = '$padre' order by name asc";
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
			case 'mostrartaxon':
				$taxon=$_POST['taxon'];
				$sql = "SELECT id, anchura, altura, tipo, imagen, nombre FROM imagephp WHERE name_ref = '$taxon'";
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
			case 'mostrarDescription':
				$taxon=$_POST['taxon'];
				$sql = "SELECT description, name, classification FROM class WHERE name = '$taxon'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"description" => $row['description'],
					"name" => $row['name'],
					"classification" => $row['classification']
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
			case 'mostrarClaves':
				$taxon=$_POST['taxon'];
				$sql = "SELECT claves FROM class WHERE name = '$taxon'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"claves" => $row['claves']
					);

				}
				echo json_encode($rows);
			break;
			case 'buscador':
				// $cadena=$_POST['cadena'];
				$sql = "SELECT name FROM class order by name asc";
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
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');
	}

mysqli_close($conexion); 

}
?>