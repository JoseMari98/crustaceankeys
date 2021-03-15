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
			case 'gruposcreados':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$tipogrupo = $_POST['tipogrupo'];
				$sql = "SELECT grupo FROM grupo_caracteristica WHERE tipo = $tipogrupo ORDER BY grupo ASC";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
				};
				echo json_encode($respuestas);
            break;
            case 'caracteristicascreadasgrupo':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'matricial'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];
				$sql = "SELECT caracteristica FROM caracteristica WHERE id_grupo = $id_grupo ORDER BY caracteristica ASC";
				$respuesta = $conexion->query($sql);
				if($respuesta->num_rows == 0){
					echo json_encode("No hay características para este grupo");
				}else{
					$respuestas = array();
					array_push($respuestas, $respuesta->fetch_array());
					for ($i = 1; $i <$respuesta->num_rows ; $i++) {
						$respuesta->field_seek($i);
						array_push($respuestas, $respuesta->fetch_array());
					};
					echo json_encode($respuestas);
				}
            break;
            case 'rellenardatoscaracteristica':
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada";
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id = $caracteristica['id'];
				//Busca y devuelve los datos encontrados en forma de Array
                //Devuelve todos los datos de la caracteristica seleccionado
				//$sql = "SELECT caracteristica.caracteristica, tipo_valor.tipo, valor_caracteristica.valor FROM caracteristica JOIN valor_caracteristica ON caracteristica.id=valor_caracteristica.id_caracteristica JOIN tipo_valor ON valor_caracteristica.tipo=tipo_valor.tipo WHERE caracteristica.id = '$id'";
				$sql = "SELECT caracteristica.caracteristica, tipo_valor.tipo, valor_caracteristica.valor, grupo_caracteristica.grupo, caracteristica.class FROM grupo_caracteristica JOIN caracteristica ON grupo_caracteristica.id=caracteristica.id_grupo JOIN valor_caracteristica ON caracteristica.id=valor_caracteristica.id_caracteristica JOIN tipo_valor ON valor_caracteristica.tipo=tipo_valor.tipo WHERE caracteristica.id = '$id' AND grupo_caracteristica.tipo = 'matricial'";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				echo json_encode($respuestas);
            break;
            case 'mostrarimagenes':
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id, anchura, altura, tipo, imagen FROM imagen_caracteristica WHERE id_caracteristica = $id_caracteristica";
				$respuesta = $conexion->query($sql);

				while ($row = $respuesta->fetch_assoc()) {
					$rows[] = array(
					"id" => $row['id'],	
					"anchura" => $row['anchura'],
					"altura" => $row['altura'],
					"tipo" => $row['tipo'],
					"imagen" => base64_encode($row['imagen']));
				}
				echo json_encode($rows);
			break;
			case 'taxonesgrupo':
				//Se recogen los datos del formulario enviado
				$grupo = $_POST['grupo'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'matricial'"; //busco por nombre de caracteristica
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

			case 'rellenarfecha':
				$gruposeleccionado = $_POST['gruposeleccionado'];

				$sql = "SELECT fecha FROM grupo_caracteristica WHERE grupo = $gruposeleccionado AND tipo = 'matricial'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$fecha = $grupo['fecha'];

				if($fecha == null)
					echo json_encode("No hay fecha");
				else
					echo json_encode($fecha);
			break;

			case 'grupos':
				//Se recogen los datos del formulario enviado
				$grupo = $_POST['grupo'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'matricial'"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];
				$sql = "SELECT grupo FROM grupo_caracteristica WHERE grupo_padre = $id_grupo AND tipo = 'matricial'"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows == 0){
					echo json_encode("No hay grupos asociados.");
				}else{
					$respuestas = array();
					for ($i = 0; $i <$result->num_rows ; $i++) {
						$result->field_seek($i);
						array_push($respuestas, $result->fetch_array());
					};
					echo json_encode($respuestas);
				}
			break;

			case 'taxonesacertados':
				$vector_taxonesDef = json_decode($_POST['taxonesdefinidos']);
				$vector_taxonesIndef = json_decode($_POST['taxonesindefinidos']);
				$vector_caracteristicas = json_decode($_POST['caracteristicasbuscar']);
				$map = array();
				for($i = 0 ; $i < count($vector_caracteristicas) ; $i++){
					$caracteristicaseleccionada = $vector_caracteristicas[$i][0];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = '$caracteristicaseleccionada'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$valor = $vector_caracteristicas[$i][1];
					$sql = "SELECT name FROM class_valor WHERE id_valor = $id_valor AND valor = '$valor'"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$respuestas = array();
						for ($j = 0; $j <$result->num_rows ; $j++) { //aqui tengo que usar el map para no repetir valores con mas de una caracteristica
							$result->field_seek($j);
							array_push($respuestas, $result->fetch_array());
						}
						for($k = 0 ; $k < count($respuestas) ; $k++){ //for para meter en el map las nuevas respuestas
							$taxon = $respuestas[$k][0]; //recojo el nombre

							$m = 0;
							$valido = false;
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $taxon){
									$valido = true;
									$map[$m][1]++;
									$map[$k][2]++;
								}
								$m++;
							}
							if($valido == false){
								$map[count($map)][0] = $taxon;
								$map[count($map) - 1][1] = 1;
								//$map[count($map) - 1][2]++;
								$map[$k][2]++;
							}
							//$map[$k][2]++;
							$iterador = $k + 1;
						}
					}
					
					$caracteristicaseleccionada = $vector_caracteristicas[$i][0];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = '$caracteristicaseleccionada'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$valor = $vector_caracteristicas[$i][1];
					$sql = "SELECT name FROM class_valor WHERE id_valor = $id_valor AND valor != '$valor'"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$respuestas = array();
						for ($j = 0; $j <$result->num_rows ; $j++) { //aqui tengo que usar el map para no repetir valores con mas de una caracteristica
							$result->field_seek($j);
							array_push($respuestas, $result->fetch_array());
						}
						for($k = 0 ; $k < count($respuestas) ; $k++){ //for para meter en el map las nuevas respuestas
							$taxon = $respuestas[$k][0];
							$m = 0;
							$valido = false;
	
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $taxon){
									$valido = true;
									//$map[$k][2]++;
									$map[$k + $iterador][2]++;
								}
								$m++;
							}
							
							if($valido == false){
								$map[count($map)][0] = $taxon;
								$map[count($map) - 1][1] = 0;
								//$map[count($map) - 1][2]++;
								//$map[$k][2]++;
								$map[$k + $iterador][2]++;
							}
						}
					}
				}

				
				echo json_encode($map);
			break;

			/*case 'taxonesacertados':
				$vector_taxonesDef = json_decode($_POST['taxonesdefinidos']);
				$vector_taxonesIndef = json_decode($_POST['taxonesindefinidos']);
				$vector_caracteristicas = json_decode($_POST['caracteristicasbuscar']);
				$map = array();
				for($i = 0 ; $i < count($vector_caracteristicas) ; $i++){
					$caracteristicaseleccionada = $vector_caracteristicas[$i][0];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = '$caracteristicaseleccionada'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$valor = $vector_caracteristicas[$i][1];
					$sql = "SELECT name FROM class_valor WHERE id_valor = $id_valor AND valor = '$valor'"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$respuestas = array();
						for ($j = 0; $j <$result->num_rows ; $j++) { //aqui tengo que usar el map para no repetir valores con mas de una caracteristica
							$result->field_seek($j);
							array_push($respuestas, $result->fetch_array());
						}
						for($k = 0 ; $k < count($respuestas) ; $k++){ //for para meter en el map las nuevas respuestas
							$taxon = $respuestas[$k][0]; //recojo el nombre

							$m = 0;
							$valido = false;
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $taxon){
									$valido = true;
									$map[$m][1]++;
									$map[$k][2]++;
								}
								$m++;
							}
							if($valido == false){
								$map[count($map)][0] = $taxon;
								$map[count($map) - 1][1] = 1;
								//$map[count($map) - 1][2]++;
								$map[$k][2]++;
							}
							//$map[$k][2]++;
							$iterador = $k + 1;
						}
					}
				}

				for($i = 0 ; $i < count($vector_caracteristicas) ; $i++){
					$caracteristicaseleccionada = $vector_caracteristicas[$i][0];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = '$caracteristicaseleccionada'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$valor = $vector_caracteristicas[$i][1];
					$sql = "SELECT name FROM class_valor WHERE id_valor = $id_valor AND valor != '$valor'"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$respuestas = array();
						for ($j = 0; $j <$result->num_rows ; $j++) { //aqui tengo que usar el map para no repetir valores con mas de una caracteristica
							$result->field_seek($j);
							array_push($respuestas, $result->fetch_array());
						}
						for($k = 0 ; $k < count($respuestas) ; $k++){ //for para meter en el map las nuevas respuestas
							$taxon = $respuestas[$k][0];
							$m = 0;
							$valido = false;
	
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $taxon){
									$valido = true;
									//$map[$k][2]++;
									$map[$k + $iterador][2]++;
								}
								$m++;
							}
							
							if($valido == false){
								$map[count($map)][0] = $taxon;
								$map[count($map) - 1][1] = 0;
								//$map[count($map) - 1][2]++;
								//$map[$k][2]++;
								$map[$k + $iterador][2]++;
							}

						}
					}
					
				}
				echo json_encode($map);
			break;*/

			case 'gruposacertados':
				$vector_gruposDef = json_decode($_POST['gruposdefinidos']);
				$vector_gruposIndef = json_decode($_POST['gruposindefinidos']);
				$vector_caracteristicas = json_decode($_POST['caracteristicasbuscar']);
				$map = array();
				for($i = 0 ; $i < count($vector_caracteristicas) ; $i++){
					$caracteristicaseleccionada = $vector_caracteristicas[$i][0];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = '$caracteristicaseleccionada'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$valor = $vector_caracteristicas[$i][1];
					$sql = "SELECT id_grupo FROM grupo_valor WHERE id_valor = $id_valor AND valor = '$valor'"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$respuestas = array();
						for ($j = 0; $j < $result->num_rows ; $j++) { //aqui tengo que usar el map para no repetir valores con mas de una caracteristica
							$result->field_seek($j);
							$id_grupo = $result->fetch_array()[0];
							$sql = "SELECT grupo FROM grupo_caracteristica WHERE id = $id_grupo AND tipo = 'matricial'"; //busco si hay asociacion
							$resultt = $conexion->query($sql);
							array_push($respuestas, $resultt->fetch_array());
						}
						for($k = 0 ; $k < count($respuestas) ; $k++){ //for para meter en el map las nuevas respuestas
							$grupo = $respuestas[$k][0];
							$m = 0;
							$valido = false;
	
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $grupo){
									$valido = true;
									$map[$m][1]++;
									$map[$k][2]++;
								}
								$m++;
							}
							if($valido == false){
								$map[count($map)][0] = $grupo;
								$map[count($map) - 1][1] = 1;
								$map[$k][2]++;
							}
							$iterador = $k + 1;
						}
					}

					$caracteristicaseleccionada = $vector_caracteristicas[$i][0];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = '$caracteristicaseleccionada'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$valor = $vector_caracteristicas[$i][1];
					$sql = "SELECT id_grupo FROM grupo_valor WHERE id_valor = $id_valor AND valor != '$valor'"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$respuestas = array();
						for ($j = 0; $j <$result->num_rows ; $j++) { //aqui tengo que usar el map para no repetir valores con mas de una caracteristica
							$result->field_seek($j);
							$id_grupo = $result->fetch_array()[0];
							$sql = "SELECT grupo FROM grupo_caracteristica WHERE id = $id_grupo AND tipo = 'matricial'"; //busco si hay asociacion
							$resultt = $conexion->query($sql);
							array_push($respuestas, $resultt->fetch_array());
						}
						for($k = 0 ; $k < count($respuestas) ; $k++){ //for para meter en el map las nuevas respuestas
							$grupo = $respuestas[$k][0];
							$m = 0;
							$valido = false;
	
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $grupo){
									$valido = true;
									$map[$k + $iterador][2]++;
								}
								$m++;
							}
							
							if($valido == false){
								$map[count($map)][0] = $grupo;
								$map[count($map) - 1][1] = 0;
								$map[$k + $iterador][2]++;
							}
						}
					}
				}
				echo json_encode($map);
			break;

			/*case 'gruposacertados':
				$vector_gruposDef = json_decode($_POST['gruposdefinidos']);
				$vector_gruposIndef = json_decode($_POST['gruposindefinidos']);
				$vector_caracteristicas = json_decode($_POST['caracteristicasbuscar']);
				$map = array();
				for($i = 0 ; $i < count($vector_caracteristicas) ; $i++){
					$caracteristicaseleccionada = $vector_caracteristicas[$i][0];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = '$caracteristicaseleccionada'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$valor = $vector_caracteristicas[$i][1];
					$sql = "SELECT id_grupo FROM grupo_valor WHERE id_valor = $id_valor AND valor = '$valor'"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$respuestas = array();
						for ($j = 0; $j < $result->num_rows ; $j++) { //aqui tengo que usar el map para no repetir valores con mas de una caracteristica
							$result->field_seek($j);
							$id_grupo = $result->fetch_array()[0];
							$sql = "SELECT grupo FROM grupo_caracteristica WHERE id = $id_grupo AND tipo = 'matricial'"; //busco si hay asociacion
							$resultt = $conexion->query($sql);
							array_push($respuestas, $resultt->fetch_array());
						}
						for($k = 0 ; $k < count($respuestas) ; $k++){ //for para meter en el map las nuevas respuestas
							$grupo = $respuestas[$k][0];
							$m = 0;
							$valido = false;
	
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $grupo){
									$valido = true;
									$map[$m][1]++;
								}
								$m++;
							}
							if($valido == false){
								$map[count($map)][0] = $grupo;
								$map[count($map) - 1][1] = 1;
							}
						}
					}
				}

				for($i = 0 ; $i < count($vector_caracteristicas) ; $i++){
					$caracteristicaseleccionada = $vector_caracteristicas[$i][0];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = '$caracteristicaseleccionada'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$valor = $vector_caracteristicas[$i][1];
					$sql = "SELECT id_grupo FROM grupo_valor WHERE id_valor = $id_valor AND valor != '$valor'"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$respuestas = array();
						for ($j = 0; $j <$result->num_rows ; $j++) { //aqui tengo que usar el map para no repetir valores con mas de una caracteristica
							$result->field_seek($j);
							$id_grupo = $result->fetch_array()[0];
							$sql = "SELECT grupo FROM grupo_caracteristica WHERE id = $id_grupo AND tipo = 'matricial'"; //busco si hay asociacion
							$resultt = $conexion->query($sql);
							array_push($respuestas, $resultt->fetch_array());
						}
						for($k = 0 ; $k < count($respuestas) ; $k++){ //for para meter en el map las nuevas respuestas
							$grupo = $respuestas[$k][0];
							$m = 0;
							$valido = false;
	
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $grupo){
									$valido = true;
								}
								$m++;
							}
							
							if($valido == false){
								$map[count($map)][0] = $grupo;
								$map[count($map) - 1][1] = 0;
							}
						}
					}
					
				}
				echo json_encode($map);
			break;*/
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');
	}

mysqli_close($conexion); 

}
?>