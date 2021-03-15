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
				//coge el que tiene el name_father null, o sea reino animalia
				$sql = "SELECT fatherclass.name, class.classification FROM class JOIN classification ON class.classification=classification.class JOIN fatherclass ON class.name=fatherclass.name WHERE fatherclass.name_father IS NULL order by level asc";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//cuenta cuantos hijos tiene por debajo
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
				$sql = "SELECT description, name, classification, autor FROM class WHERE name = '$taxon'";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"description" => $row['description'],
					"name" => $row['name'],
					"classification" => $row['classification'],
					"autor" => $row['autor']
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

			case 'mostrarHijos':
				$taxon=$_POST['taxon'];
				$sql = "SELECT class.name as name, class.classification as classification FROM class JOIN fatherclass ON class.name=fatherclass.name WHERE fatherclass.name_father = '$taxon'";
				$respuesta = $conexion->query($sql);
				$rows = array();

				while ($row = $respuesta->fetch_assoc()) {

						array_push($rows,  $row['classification']." ".$row['name']);
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
				$sql = "SELECT literature.datos as literature FROM literature JOIN ClassLiterature ON ClassLiterature.literature=literature.id WHERE ClassLiterature.class = '$taxon' order by literature ASC";
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

			case 'mostrarDiagnosis':
				$taxon=$_POST['taxon'];
				$sql = "SELECT caracteristica.caracteristica, class_valor.valor FROM valor_caracteristica JOIN `class_valor` ON valor_caracteristica.id = class_valor.id_valor JOIN caracteristica ON caracteristica.id = valor_caracteristica.id_caracteristica WHERE name = $taxon ORDER BY caracteristica.caracteristica ASC;";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"caracteristica" => $row['caracteristica'],
					"valor" => $row['valor']
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
			case 'rescatardistribucion':
				$taxon=$_POST['taxon'];
				$sql = "SELECT id, anchura, altura, tipo, imagen, taxon FROM mapadistribucion WHERE taxon = '$taxon'";
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
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');
	}

mysqli_close($conexion); 

}
?>