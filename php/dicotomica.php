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
			case 'primerascaracteristicas':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];

				$sql = "SELECT nivel, opcion, caracteristica FROM caracteristica_dicotomica WHERE clave = $id_grupo AND nivel = 1 ORDER BY nivel ASC";
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

			case 'caracteristicashijas':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['gruposeleccionado'];
				$caracteristica = $_POST['caracteristicaSeleccionada'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];

				$caracteristicaVector = explode("-", $caracteristica);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";
				$descripcion = "'" . $caracteristicaVector[2] . "'";
				$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);	
				$tupla = $result->fetch_assoc();
				$id_caracteristica = $tupla['id'];

				$sql = "SELECT nivel, opcion, caracteristica FROM caracteristica_dicotomica WHERE clave = $id_grupo AND padre = $id_caracteristica ORDER BY nivel ASC";
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

			case 'taxonhijo':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['gruposeleccionado'];
				$caracteristica = $_POST['caracteristicaSeleccionada'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];

				$caracteristicaVector = explode("-", $caracteristica);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";
				$descripcion = "'" . $caracteristicaVector[2] . "'";
				$sql = "SELECT taxon FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);
				$tupla = $result->fetch_assoc();
				$taxon = $tupla['taxon'];
				if($taxon != null)
					echo json_encode($taxon);
				else
					echo json_encode("No hay taxon para este grupo");
			break;

			case 'caracteristicasGrupo':
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];
				$sql = "SELECT caracteristica_dicotomica.id, nivel, opcion, padre, caracteristica, taxon, clave, grupo_caracteristica.grupo AS subgrupo FROM caracteristica_dicotomica LEFT JOIN grupo_caracteristica ON caracteristica_dicotomica.subgrupo = grupo_caracteristica.id WHERE clave = $id_grupo ORDER BY nivel ASC";
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

			case 'subgrupohijo':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['gruposeleccionado'];
				$caracteristica = $_POST['caracteristicaSeleccionada'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];

				$caracteristicaVector = explode("-", $caracteristica);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";
				$descripcion = "'" . $caracteristicaVector[2] . "'";

				$sql = "SELECT * FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$respuesta = $conexion->query($sql);
				$tupla = $respuesta->fetch_assoc();
				$id_caracteristica = $tupla['id'];
				
				if($tupla['subgrupo'] != null){
					$sql = "SELECT caracteristica_dicotomica.nivel, caracteristica_dicotomica.opcion, caracteristica_dicotomica.caracteristica, grupo_caracteristica.grupo AS subgrupo FROM caracteristica_dicotomica JOIN grupo_caracteristica ON caracteristica_dicotomica.subgrupo = grupo_caracteristica.id WHERE caracteristica_dicotomica.id = $id_caracteristica";
					$respuesta = $conexion->query($sql);
					echo json_encode($respuesta->fetch_array());
				} else{
					echo json_encode("No hay subgrupo para este grupo");
				}
			break;

			case 'taxonesindefinidos':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];

				$sql = "SELECT name FROM grupo_taxon WHERE id_grupo = $id_grupo";
				$result = $conexion->query($sql);
				$taxones = array();
				for ($i = 0; $i <$result->num_rows ; $i++) {
					$result->field_seek($i);
					array_push($taxones, $result->fetch_array());
				};

				echo json_encode($taxones);

				/*$sql = "SELECT taxon FROM caracteristica_dicotomica WHERE clave = $id_grupo GROUP BY taxon";
				$result = $conexion->query($sql);
				$taxones2 = array();
				for ($i = 0; $i < $result->num_rows ; $i++) {
					$result->field_seek($i);
					$taxon = $result->fetch_array();
					$j = 0;
					$encontrado = false;
					while($j < count($taxones) && $encontrado == false){
						if(strcmp($taxones['name'], $taxon['taxon']) === 0)
							$encontrado = true;
						$j++;
					}
					if($encontrado === false)
						array_push($taxones2, $taxon);
				};
				echo json_encode($taxones2);*/
				
			break;

			case 'taxonesindefinidos2':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];

				$sql = "SELECT taxon FROM caracteristica_dicotomica WHERE clave = $id_grupo GROUP BY taxon";
				$result = $conexion->query($sql);
				$taxones2 = array();
				for ($i = 0; $i < $result->num_rows ; $i++) {
					$result->field_seek($i);
					array_push($taxones2, $result->fetch_array());
				};
				echo json_encode($taxones2);
				
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
							$taxon = $respuestas[$k][0];
							$m = 0;
							$valido = false;
	
							while($m < count($map) && $valido == false){
								if($map[$m][0] === $taxon){
									$valido = true;
									$map[$m][1]++;
								}
								$m++;
							}
							if($valido == false){
								$map[count($map)][0] = $taxon;
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
								}
								$m++;
							}
							
							if($valido == false){
								$map[count($map)][0] = $taxon;
								$map[count($map) - 1][1] = 0;
							}
						}
					}
					
				}
				echo json_encode($map);
			break;

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
			break;
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');
	}

mysqli_close($conexion); 

}
?>