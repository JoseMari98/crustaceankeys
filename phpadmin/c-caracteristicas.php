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
			case 'typesbox':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos los tipos de valores
				$sql = "SELECT * FROM tipo_valor";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
				
			break;
			case 'agregargrupo':
				//Se recogen los datos del formulario enviado
				$grupo = $_POST['name'];		
				$padre = $_POST['grupopadre'];
				$fecha = $_POST['fecha'];
				$tipogrupo = $_POST['tipogrupo'];
				if($padre == "'Ninguno'")
					$padre = null;
				else{
					$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $padre AND tipo = $tipogrupo";
					$result = $conexion->query($sql);	
					$resultado = $result->fetch_assoc();
					$id_padre = $resultado['id'];
				}

				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = $tipogrupo";
				$result = $conexion->query($sql);			
				if ($result->num_rows == 0) { 
					if($padre == null)
						$sql = "INSERT INTO `grupo_caracteristica` (`id`, `grupo`, `grupo_padre`, `tipo`, `fecha`) VALUES (NULL, $grupo, NULL, $tipogrupo, $fecha)";
					else
						$sql = "INSERT INTO `grupo_caracteristica` (`id`, `grupo`, `grupo_padre`, `tipo`, `fecha`) VALUES (NULL, $grupo, $id_padre, $tipogrupo, $fecha)";
					$conexion->query($sql);
					echo json_encode("Se ha insertado el grupo.");
				}else{
					echo json_encode("El nombre del grupo ya está insertado. Por favor pruebe otro nombre.");
				}

			break;

			case 'grupopadre':
				$tipogrupo = $_POST['tipogrupo'];
				$gruposeleccionado = $_POST['gruposeleccionado'];
				$sql = "SELECT grupo_padre FROM grupo_caracteristica WHERE grupo = $gruposeleccionado AND tipo = $tipogrupo";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$padre = $grupo['grupo_padre'];
				
				if($padre == null)
					echo json_encode("Ninguno");
				else{
					$sql = "SELECT grupo FROM grupo_caracteristica WHERE id = $padre AND tipo = $tipogrupo ORDER BY grupo ASC";
					$result = $conexion->query($sql);	
					$padre = $result->fetch_assoc();
					$padre = $padre['grupo'];
					echo json_encode($padre);
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
				$sql = "SELECT caracteristica.caracteristica, tipo_valor.tipo, valor_caracteristica.valor, grupo_caracteristica.grupo, caracteristica.class FROM grupo_caracteristica JOIN caracteristica ON grupo_caracteristica.id=caracteristica.id_grupo JOIN valor_caracteristica ON caracteristica.id=valor_caracteristica.id_caracteristica JOIN tipo_valor ON valor_caracteristica.tipo=tipo_valor.tipo WHERE caracteristica.id = '$id'";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				echo json_encode($respuestas);
			break;

			case 'agregarcaracteristica':
				//Se recogen los datos del formulario enviado
				$tipocaracteristica = $_POST['tipocaracteristica'];
				$name = $_POST['name'];
				$valor = $_POST['valor'];	
				$grupo = $_POST['grupo'];
				$categoria = $_POST['categoria'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'matricial'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];			
				$sql = "SELECT caracteristica FROM caracteristica WHERE caracteristica = $name";
				$result = $conexion->query($sql);			
				if ($result->num_rows == 0) { 
					$sql = "INSERT INTO caracteristica(id, caracteristica, id_grupo, class) VALUES (NULL, $name, $id_grupo, $categoria)"; //insertar en la tabla caracteristica
					$conexion->query($sql);
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = $name";
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id = $caracteristica['id'];
					$sql = "INSERT INTO valor_caracteristica(id, id_caracteristica, tipo, valor) VALUES (NULL, $id, $tipocaracteristica, $valor)"; //insertar en la tabla valor
					$conexion->query($sql);
					echo json_encode("Se ha insertado la caracteristica.");
				}else{
					echo json_encode("El nombre de la característica ya está insertada. Por favor pruebe otro nombre.");
				}

			break;
			case 'caracteristicascreadas':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$sql = "SELECT caracteristica FROM caracteristica";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
			break;

			case 'categoriasasignadas':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['categoria'];
				$sql = "SELECT class FROM caracteristica";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
					
				};
				echo json_encode($respuestas);
			break;

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

			case 'buscarhijos':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$taxon = $_POST['taxon']; //decapoda
				$sql = "SELECT name FROM fatherclass WHERE name_father = $taxon"; //dendrobranchiata, pleocyemata
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$nombres_taxones = array();
					array_push($nombres_taxones, $result->fetch_array());
					for ($i = 1; $i <$result->num_rows ; $i++) {
						$result->field_seek($i);
						array_push($nombres_taxones, $result->fetch_array());
					}
					$taxones_completos = array();
					for($i = 0 ; $i < count($nombres_taxones) ; $i++){
						$nombre_taxon = $nombres_taxones[$i][0];
						$sql = "SELECT name, classification FROM class WHERE name = '$nombre_taxon'"; //busco por id del valor
						$result = $conexion->query($sql);
						$result->field_seek($i);
						array_push($taxones_completos, $result->fetch_array());
					} //aqui tengo todos los taxones con su nombre y su categoria
					echo json_encode($taxones_completos);
					//echo json_encode($nombres_taxones);
				} else{
					echo json_encode("No hay taxones hijos");
				}
			break;

			case 'editargrupo':
				//Se recogen los datos del formulario enviado
				$grupo = $_POST['gruposeleccionado'];
				$nombre = $_POST['name'];
				$padre = $_POST['grupopadre'];
				$fecha = $_POST['fecha'];
				$tipogrupo = $_POST['tipogrupo'];

				if($padre == "'Ninguno'")
					$padre = null;
				else{
					$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $padre AND tipo = $tipogrupo";
					$result = $conexion->query($sql);	
					$resultado = $result->fetch_assoc();
					$id_padre = $resultado['id'];
				}
				
				if($grupo != $nombre){
					$sql = "SELECT grupo FROM grupo_caracteristica WHERE grupo = $nombre AND tipo = $tipogrupo";
					$result = $conexion->query($sql);
					if ($result->num_rows == 0) { 
						if($padre == null)
							$sql = "UPDATE grupo_caracteristica SET grupo=$nombre, grupo_padre = NULL, fecha = $fecha WHERE grupo = $grupo";
						else
							$sql = "UPDATE grupo_caracteristica SET grupo=$nombre, grupo_padre = $id_padre, fecha = $fecha WHERE grupo = $grupo";
						$conexion->query($sql);
						echo json_encode("El grupo se ha editado correctamente.");
					}else{
						echo json_encode("El nombre del grupo ya esta registrado. Por favor pruebe otro nombre.");
					}
				} else{
					if($padre == null)
						$sql = "UPDATE grupo_caracteristica SET grupo_padre = NULL, fecha = $fecha WHERE grupo = $grupo";
					else
						$sql = "UPDATE grupo_caracteristica SET grupo_padre = $id_padre, fecha = $fecha WHERE grupo = $grupo";
					$conexion->query($sql);
					echo json_encode("El grupo se ha editado correctamente.");
				}
				break;

				case 'eliminargrupo':
					//Se recogen los datos del formulario enviado
					$grupo = $_POST['gruposeleccionado'];
					$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'matricial'";
					$result = $conexion->query($sql);
					$grupo = $result->fetch_assoc();
					$id_grupo = $grupo['id'];
					$sql = "SELECT * FROM grupo_taxon WHERE id_grupo = $id_grupo";
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$sql = "DELETE FROM grupo_taxon WHERE id_grupo = $id_grupo";
						$conexion->query($sql);
					}
					$sql = "SELECT * FROM grupo_caracteristica WHERE grupo_padre = $id_grupo";
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$sql = "UPDATE grupo_caracteristica SET grupo_padre = NULL WHERE grupo_padre = $id_grupo";
						$conexion->query($sql);
					}
					$sql = "SELECT id FROM caracteristica WHERE id_grupo = $id_grupo"; //obtengo los id de las caracteristicas del grupo
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$ids_caracteristicas = array();
						for ($i = 0; $i < $result->num_rows ; $i++) { //obtengo los ids de los grupos
							$result->field_seek($i);
							array_push($ids_caracteristicas, $result->fetch_array());
							$id_caracteristica = $ids_caracteristicas[$i][0];
							$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica";
							$result = $conexion->query($sql);	
							$caracteristica = $result->fetch_assoc();
							$id_valor = $caracteristica['id'];
							$sql = "SELECT * FROM class_valor WHERE id_valor = $id_valor";
							$result = $conexion->query($sql);
							if($result->num_rows != 0){
								$sql = "DELETE FROM class_valor WHERE id_valor = $id_valor";
								$conexion->query($sql);
							}
							$sql = "SELECT * FROM grupo_valor WHERE id_valor = $id_valor";
							$result = $conexion->query($sql);
							if($result->num_rows != 0){
								$sql = "DELETE FROM grupo_valor WHERE id_valor = $id_valor";
								$conexion->query($sql);
							}
							$sql = "DELETE FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica";
							$conexion->query($sql);
							$sql = "DELETE FROM imagen_caracteristica WHERE id_caracteristica = $id_caracteristica";
							$conexion->query($sql);
							$sql = "DELETE FROM caracteristica WHERE id = $id_caracteristica";
							$conexion->query($sql);
						}
					}
					$sql = "DELETE FROM grupo_caracteristica WHERE id = $id_grupo";
					$conexion->query($sql);
					echo json_encode("El grupo se ha eliminado correctamente.");
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

			case 'caracteristicascreadasgrupocategoria':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$categoria = $_POST['categoriaseleccionada'];
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'matricial'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];
				$sql = "SELECT caracteristica FROM caracteristica WHERE id_grupo = $id_grupo AND class = $categoria ORDER BY caracteristica ASC";
				$respuesta = $conexion->query($sql);
				if($respuesta->num_rows == 0){
					echo json_encode("No hay características para este grupo y categoría");
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
			
			case 'editarcaracteristica':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada";
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id = $caracteristica['id'];
				$tipocaracteristica = $_POST['tipocaracteristica'];
				$name = $_POST['name'];
				$valor = $_POST['valor'];
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'matricial'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];

				$categoria = $_POST['categoriaseleccionada'];
				$sql = "UPDATE caracteristica SET id_grupo=$id_grupo, class=$categoria WHERE id = $id";
				$conexion->query($sql);
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id";
				$result = $conexion->query($sql);	
				$valor_caracteristica = $result->fetch_assoc();
				$id_valor = $valor_caracteristica['id'];
				if($caracteristicaseleccionada == $name){
					$sql = "UPDATE valor_caracteristica SET tipo=$tipocaracteristica, valor=$valor WHERE id_caracteristica = $id";
					$conexion->query($sql);
					
					echo json_encode("La característica se ha editado correctamente.");

				}else{
					$sql = "SELECT caracteristica FROM caracteristica WHERE caracteristica = $name";
					$result = $conexion->query($sql);
					
					if ($result->num_rows == 0) { 
						$sql = "UPDATE caracteristica SET caracteristica=$name WHERE caracteristica = $caracteristicaseleccionada";
						$conexion->query($sql);
						$sql = "UPDATE valor_caracteristica SET id_caracteristica=$id, tipo=$tipocaracteristica, valor=$valor WHERE id_caracteristica = $id";
						$conexion->query($sql);
						echo json_encode("La característica se ha editado correctamente.");
					}else{
						echo json_encode("El nombre de la característica ya esta registrada. Por favor pruebe otro nombre.");
					}
				}
			break;
			case 'eliminarcaracteristica':
					//Se recogen los datos del formulario enviado
					$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada";
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica";
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_valor = $caracteristica['id'];
					$sql = "SELECT * FROM class_valor WHERE id_valor = $id_valor";
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$sql = "DELETE FROM class_valor WHERE id_valor = $id_valor";
						$conexion->query($sql);
					}
					$sql = "SELECT * FROM grupo_valor WHERE id_valor = $id_valor";
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$sql = "DELETE FROM grupo_valor WHERE id_valor = $id_valor";
						$conexion->query($sql);
					}
					$sql = "DELETE FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica";
					$conexion->query($sql);
					$sql = "DELETE FROM imagen_caracteristica WHERE id_caracteristica = $id_caracteristica";
					$conexion->query($sql);
					$sql = "DELETE FROM caracteristica WHERE id = $id_caracteristica";
					$conexion->query($sql);
					echo json_encode("La característica se ha eliminado correctamente.");
					
			break;
			case 'asociarcaracteristica':
				//Se recogen los datos del formulario enviado
				$valor = $_POST['valor'];
				$taxon = $_POST['taxon'];
				$caracteristicaseleccionada = $_POST['caracteristica'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
				$result = $conexion->query($sql);	
				$valorasociado = $result->fetch_assoc();
				$id_valor = $valorasociado['id'];
				$sql = "SELECT * FROM class_valor WHERE id_valor = $id_valor AND name = $taxon"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows == 0){
					$sql = "INSERT INTO class_valor(id, name, id_valor, valor) VALUES (NULL, $taxon, $id_valor, $valor)"; //insertar en la tabla valor
					$conexion->query($sql);
					echo json_encode("La característica se ha asociado correctamente.");
				}else{
					echo json_encode("La asociación entre característica y taxon ya existe. Por favor pruebe otro.");
				}
				
			break;

			case 'asociarcaracteristicagrupo':
				//Se recogen los datos del formulario enviado
				$valor = $_POST['valor'];
				$grupo = $_POST['grupo'];
				$caracteristicaseleccionada = $_POST['caracteristica'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'matricial'"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$resultado = $result->fetch_assoc();
				$id_grupo = $resultado['id'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
				$result = $conexion->query($sql);	
				$valorasociado = $result->fetch_assoc();
				$id_valor = $valorasociado['id'];
				$sql = "SELECT * FROM grupo_valor WHERE id_valor = $id_valor AND id_grupo = $id_grupo AND valor = $valor"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows == 0){
					$sql = "INSERT INTO grupo_valor(id, id_valor, id_grupo, valor) VALUES (NULL, $id_valor, $id_grupo, $valor)"; //insertar en la tabla valor
					$conexion->query($sql);
					echo json_encode("La característica se ha asociado correctamente.");
				}else{
					echo json_encode("La asociación entre característica y taxon ya existe. Por favor pruebe otro.");
				}
				
			break;

			case 'rellenartaxones':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
				$result = $conexion->query($sql);	
				$valorasociado = $result->fetch_assoc();
				$id_valor = $valorasociado['id'];
				$sql = "SELECT name FROM class_valor WHERE id_valor = $id_valor"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$results = array();
					array_push($results, $result->fetch_array());
					for ($i = 1; $i <$result->num_rows ; $i++) {
						$result->field_seek($i);
						array_push($results, $result->fetch_array());
					};
					echo json_encode($results);
				}else{
					echo json_encode("No hay taxones asociados.");
				}
				break;

				case 'rellenargrupos':
					//Se recogen los datos del formulario enviado
					$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$sql = "SELECT id_grupo FROM grupo_valor WHERE id_valor = $id_valor"; //busco si hay asociacion
					$result = $conexion->query($sql);
					
					if($result->num_rows != 0){
						$results = array();
						for ($i = 0; $i < $result->num_rows ; $i++) {
							$result->field_seek($i);
							$id_grupo = $result->fetch_array()[0];
							$sql = "SELECT grupo FROM grupo_caracteristica WHERE id = $id_grupo"; 
							$conexionq = $conexion->query($sql);
							$valorasociado = $conexionq->fetch_assoc();
							$grupo = $valorasociado['grupo'];
							array_push($results, $grupo);
						};
						echo json_encode($results);
					}else{
						echo json_encode("No hay grupos asociados.");
					}
					break;

			case 'rellenarcaracteristicas':
				//Se recogen los datos del formulario enviado
				$taxonseleccionado = $_POST['taxonseleccionado'];
				$sql = "SELECT id_valor FROM class_valor WHERE name = $taxonseleccionado"; //busco por id del valor
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$ids_valor = array();
					array_push($ids_valor, $result->fetch_array());
					for ($i = 1; $i <$result->num_rows ; $i++) {
						$result->field_seek($i);
						array_push($ids_valor, $result->fetch_array());
					};
					$ids_caracteristicas = array();
					for($i = 0 ; $i < count($ids_valor) ; $i++){
						$id_valor = $ids_valor[$i][0];
						$sql = "SELECT id_caracteristica FROM valor_caracteristica WHERE id = $id_valor"; //busco por id del valor
						$result = $conexion->query($sql);
						$result->field_seek($i);
						array_push($ids_caracteristicas, $result->fetch_array());
					}
					$nombres_caracteristicas = array();
					for($i = 0 ; $i < count($ids_caracteristicas) ; $i++){
						$id_caracteristica = $ids_caracteristicas[$i][0];
						$sql = "SELECT caracteristica FROM caracteristica WHERE id = $id_caracteristica"; //busco por id del valor
						$result = $conexion->query($sql);
						$result->field_seek($i);
						array_push($nombres_caracteristicas, $result->fetch_array());
					}
					echo json_encode($nombres_caracteristicas);
				}else{
					echo json_encode("No hay características asociadas.");
				}
			break;

			case 'rellenarvalor':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$taxonseleccionado = $_POST['taxonseleccionado'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
				$result = $conexion->query($sql);	
				$valorasociado = $result->fetch_assoc();
				$id_valor = $valorasociado['id'];
				$sql = "SELECT valor FROM class_valor WHERE id_valor = $id_valor AND name = $taxonseleccionado"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$valor = $result->fetch_assoc();
					$valor_final = $valor['valor'];
					echo json_encode($valor_final);
				}else{
					echo json_encode("No hay valor asociado.");
				}
				
				break;

				case 'rellenarvalorgrupo':
					//Se recogen los datos del formulario enviado
					$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
					$gruposeleccionado = $_POST['gruposeleccionado'];
					$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $gruposeleccionado AND tipo = 'matricial'"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$grupo = $result->fetch_assoc();
					$id_grupo = $grupo['id'];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
					$result = $conexion->query($sql);	
					$valorasociado = $result->fetch_assoc();
					$id_valor = $valorasociado['id'];
					$sql = "SELECT valor FROM grupo_valor WHERE id_valor = $id_valor AND id_grupo = $id_grupo"; //busco si hay asociacion
					$result = $conexion->query($sql);
					if($result->num_rows != 0){
						$valor = $result->fetch_assoc();
						$valor_final = $valor['valor'];
						echo json_encode($valor_final);
					}else{
						echo json_encode("No hay valor asociado.");
					}
					
					break;
			case 'editarasociacion':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$taxonseleccionado = $_POST['taxonseleccionado'];
				$valorseleccionado = $_POST['valorseleccionado'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
				$result = $conexion->query($sql);	
				$valorasociado = $result->fetch_assoc();
				$id_valor = $valorasociado['id'];
				$sql = "SELECT valor FROM class_valor WHERE id_valor = $id_valor AND name = $taxonseleccionado"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$sql = "UPDATE class_valor SET valor=$valorseleccionado WHERE id_valor = $id_valor AND name = $taxonseleccionado";
					$conexion->query($sql);
					echo json_encode("La asociacion se ha editado correctamente.");
				}else{
					echo json_encode("No hay valor asociado.");
				}
			break;

			case 'eliminarasociacion':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$taxonseleccionado = $_POST['taxonseleccionado'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
				$result = $conexion->query($sql);	
				$valorasociado = $result->fetch_assoc();
				$id_valor = $valorasociado['id'];
				$sql = "SELECT valor FROM class_valor WHERE name = $taxonseleccionado AND id_valor = $id_valor"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$sql = "DELETE FROM class_valor WHERE id_valor = $id_valor AND name = $taxonseleccionado";
					$conexion->query($sql);
					echo json_encode("La asociación se ha eliminado correctamente.");
				}else{
					echo json_encode("No hay valor asociado.");
				}
			break;

			case 'editarasociaciongrupo':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$gruposeleccionado = $_POST['gruposeleccionado'];
				$valorseleccionado = $_POST['valorseleccionado'];
				$valornuevo = $_POST['valornuevo'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $gruposeleccionado AND tipo = 'matricial'"; //busco por id del valor
				$result = $conexion->query($sql);	
				$grupoasociado = $result->fetch_assoc();
				$id_grupo = $grupoasociado['id'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
				$result = $conexion->query($sql);	
				$valorasociado = $result->fetch_assoc();
				$id_valor = $valorasociado['id'];
				$sql = "SELECT valor FROM grupo_valor WHERE id_valor = $id_valor AND id_grupo = $id_grupo AND valor = $valorseleccionado"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$sql = "UPDATE grupo_valor SET valor=$valornuevo WHERE id_valor = $id_valor AND id_grupo = $id_grupo AND valor = $valorseleccionado";
					$conexion->query($sql);
					echo json_encode("La asociacion se ha editado correctamente.");
				}else{
					echo json_encode("No hay valor asociado.");
				}
			break;

			case 'eliminarasociaciongrupo':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$gruposeleccionado = $_POST['gruposeleccionado'];
				$valorseleccionado = $_POST['valorseleccionado'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "SELECT id FROM valor_caracteristica WHERE id_caracteristica = $id_caracteristica"; //busco por id del valor
				$result = $conexion->query($sql);	
				$valorasociado = $result->fetch_assoc();
				$id_valor = $valorasociado['id'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $gruposeleccionado AND tipo = 'matricial'"; //busco por id del valor
				$result = $conexion->query($sql);	
				$grupoasociado = $result->fetch_assoc();
				$id_grupo = $grupoasociado['id'];
				$sql = "SELECT valor FROM grupo_valor WHERE id_grupo = $id_grupo AND id_valor = $id_valor AND valor = $valorseleccionado"; //busco si hay asociacion
				$result = $conexion->query($sql);
				if($result->num_rows != 0){
					$sql = "DELETE FROM grupo_valor WHERE id_grupo = $id_grupo AND id_valor = $id_valor AND valor = $valorseleccionado";
					$conexion->query($sql);
					echo json_encode("La asociación se ha eliminado correctamente.");
				}else{
					echo json_encode("No hay valor asociado.");
				}
			break;

			case 'asociarimagencaracteristica':
				if ($_FILES["file"]["name"][0] != ""){
				    $file = $_FILES["file"];
					$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
					$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
					$result = $conexion->query($sql);	
					$caracteristica = $result->fetch_assoc();
					$id_caracteristica = $caracteristica['id'];
					$name= $file['name'];
					$tipo= $file['type'];
					$ruta_provisonal= $file['tmp_name'];
					$size= $file['size'];
					$dimensiones= getimagesize($ruta_provisonal);
					$width= $dimensiones[0];
					$heigth= $dimensiones[1];
					$carpeta= "imagenes/";
					if ($tipo != "image/jpeg" && $tipo != "image/png" && $tipo != "image/jpg" && $tipo != "image/gif"){
						echo json_encode("<p style='color: red'>El archivo no es una imagen valida.");
					}else if($size > 1000*1000){
						echo json_encode("<p style='color: red'>El archivo supera el maximo permitido 1 MB.");
					}else{
						$foto = addslashes(file_get_contents($ruta_provisonal));
						$sql="INSERT INTO imagen_caracteristica(id,anchura,altura,tipo,imagen,id_caracteristica) VALUES (NULL,$width,$heigth,'$tipo','$foto',$id_caracteristica)";
						$conexion->query($sql);
						echo json_encode("<p style='color: blue'>La imagen se ha insertado.");
					};
				}
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
			case 'borrarimagen':
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$sql = "SELECT id FROM caracteristica WHERE caracteristica = $caracteristicaseleccionada"; //busco por nombre de caracteristica
				$result = $conexion->query($sql);	
				$caracteristica = $result->fetch_assoc();
				$id_caracteristica = $caracteristica['id'];
				$sql = "DELETE FROM imagen_caracteristica WHERE id_caracteristica = $id_caracteristica";
				$conexion->query($sql);
				echo json_encode("La imagen ha sido eliminada.");
			break;
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');	
	}

mysqli_close($conexion); 

}
 ?>