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
			
			case 'mostrarLiterature':
				$sql = "SELECT datos FROM literature order by literature DESC";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"literature" => $row['literature']
					);

				}
				echo json_encode($rows);
			break;
			
			case 'terminos_a':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'A%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_b':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'B%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_c':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'C%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_d':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'D%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_e':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'E%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_f':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'F%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_g':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'G%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_h':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'H%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_i':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'I%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_j':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'J%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_k':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'K%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_l':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'L%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_m':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'M%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_n':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'N%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_ñ':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'Ñ%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_o':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'O%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_p':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'P%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_q':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'Q%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_r':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'R%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_s':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'S%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_t':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'T%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_u':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'U%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_v':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'V%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_w':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'W%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_x':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'X%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_y':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'Y%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
					);
				}

				echo json_encode($rows);
			break;
			case 'terminos_z':
				$sql = "SELECT datos FROM literature WHERE datos LIKE 'Z%' ORDER BY datos ASC;";
				$respuesta = $conexion->query($sql);
				while ($row = $respuesta->fetch_assoc()) {
					//$sqlcount = "SELECT COUNT(datos) as numfather FROM `glosario` WHERE datos = '".$row['datos']."'";
					//$contadorfilas = $conexion->query($sqlcount);
					//$numfather = $contadorfilas->fetch_array();
					$rows[] = array(
					"datos" => $row['datos']
					//"numfather" => $numfather['numfather']
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