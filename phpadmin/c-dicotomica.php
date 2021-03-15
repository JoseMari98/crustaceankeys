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
            case 'gruposcreados':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$sql = "SELECT id, grupo FROM grupo_caracteristica WHERE tipo = 'dicotomica' ORDER BY grupo ASC";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
				};
				echo json_encode($respuestas);
            break;
            
			case 'rellenarpadres':
				//Busca y devuelve los datos encontrados en forma de Array
                //Devuelve todos los tipos de valores
                $grupo = $_POST['grupoSeleccionado'];
                $nivel = $_POST['nivel'];

                $sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
                $result = $conexion->query($sql);	
                $tupla = $result->fetch_assoc();
                $id_grupo = $tupla['id'];

				if($nivel != ""){
					$sql = "SELECT nivel, opcion, caracteristica FROM caracteristica_dicotomica WHERE clave = $id_grupo AND nivel < $nivel ORDER BY nivel DESC";

				} else
                	$sql = "SELECT nivel, opcion, caracteristica FROM caracteristica_dicotomica WHERE clave = $id_grupo ORDER BY nivel DESC";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
				};
            
				echo json_encode($respuestas);		
			break;
			
			case 'fatherbox':
				//Busca y devuelve los datos encontrados en forma de Array
                //Devuelve todos los tipos de valores
                $grupo = $_POST['grupoSeleccionado'];

                $sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
                $result = $conexion->query($sql);	
                $tupla = $result->fetch_assoc();
                $id_grupo = $tupla['id'];

                $sql = "SELECT id, nivel, opcion, caracteristica FROM caracteristica_dicotomica WHERE clave = $id_grupo";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
				};
            
				echo json_encode($respuestas);		
            break;
            
            case 'rellenartaxones':
				//Busca y devuelve los datos encontrados en forma de Array
                //Devuelve todos los tipos de valores
                $grupo = $_POST['grupoSeleccionado'];

                $sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
                $result = $conexion->query($sql);	
                $tupla = $result->fetch_assoc();
                $id_grupo = $tupla['id'];

                $sql = "SELECT name FROM grupo_taxon WHERE id_grupo = $id_grupo ORDER BY name ASC";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
				};
            
				echo json_encode($respuestas);		
            break;

			case 'rellenarsubgrupos':
				//Busca y devuelve los datos encontrados en forma de Array
                //Devuelve todos los tipos de valores
                $grupo = $_POST['grupoSeleccionado'];

                $sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
                $result = $conexion->query($sql);	
                $tupla = $result->fetch_assoc();
                $id_grupo = $tupla['id'];

                $sql = "SELECT id, grupo FROM grupo_caracteristica WHERE id != $id_grupo AND tipo = 'dicotomica' ORDER BY grupo ASC";
				$respuesta = $conexion->query($sql);
				$respuestas = array();
				array_push($respuestas, $respuesta->fetch_array());
				for ($i = 1; $i <$respuesta->num_rows ; $i++) {
					$respuesta->field_seek($i);
					array_push($respuestas, $respuesta->fetch_array());
				};
            
				echo json_encode($respuestas);		
            break;

			case 'rellenardatoscaracteristica':
				$caracteristicaseleccionada = $_POST['caracteristicaSeleccionada'];
				$grupo = $_POST['grupoSeleccionado'];

				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];

				$caracteristicaVector = explode("-", $caracteristicaseleccionada);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";
				$descripcion = $caracteristicaVector[2];

				$sql = "SELECT id, nivel, opcion, caracteristica, taxon, subgrupo FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);	
				$tupla = $result->fetch_assoc();
			
				echo json_encode($tupla);
			break;

			case 'rellenardatoscaracteristica':
				$caracteristicaseleccionada = $_POST['caracteristicaSeleccionada'];
				$grupo = $_POST['grupoSeleccionado'];

				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];

				$caracteristicaVector = explode("-", $caracteristicaseleccionada);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";
				$descripcion = $caracteristicaVector[2];

				$sql = "SELECT id, nivel, opcion, caracteristica, taxon, subgrupo FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);	
				$tupla = $result->fetch_assoc();
			
				echo json_encode($tupla);
			break;

			case 'rellenarfecha':
				$gruposeleccionado = $_POST['gruposeleccionado'];

				$sql = "SELECT fecha FROM grupo_caracteristica WHERE grupo = $gruposeleccionado AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$fecha = $grupo['fecha'];

				if($fecha == null)
					echo json_encode("No hay fecha");
				else
					echo json_encode($fecha);
			break;

			case 'agregarcaracteristica':
				//Se recogen los datos del formulario enviado
				$opcion = $_POST['opcion'];
				$nivel = $_POST['nivel'];
				$descripcion = $_POST['descripcion'];	
				$grupo = $_POST['grupo'];
				$padre = $_POST['padre'];
				$taxon = $_POST['taxon'];
				$subgrupo = $_POST['subgrupo'];

				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];
				
				if($padre != "Ninguna"){
					$padreVector = explode("-", $padre);
					$nivelPadre = $padreVector[0];
					$opcionPadre = "'" . $padreVector[1] . "'";
					$descripcionPadre = "'" . $padreVector[2] . "'";
					$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivelPadre AND opcion = $opcionPadre AND clave = $id_grupo";
					$result = $conexion->query($sql);	
					$tuplaPadre = $result->fetch_assoc();
					$id_padre = $tuplaPadre['id'];
				}

				if($subgrupo != "'Ninguno'"){
					$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $subgrupo AND tipo = 'dicotomica'";
					$result = $conexion->query($sql);	
					$tuplasubgrupo = $result->fetch_assoc();
					$id_subgrupo = $tuplasubgrupo['id'];
				}

				$sql = "SELECT * FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);			
				if($result->num_rows == 0) {
					if($padre == "Ninguna" && $taxon == "'Ninguno'" && $subgrupo == "'Ninguno'"){ //los dos nulos
						$sql = "INSERT INTO caracteristica_dicotomica(id, nivel, opcion, padre, caracteristica, taxon, clave, subgrupo) VALUES (NULL, $nivel, $opcion, NULL, $descripcion, NULL, $id_grupo, NULL)"; //insertar en la tabla valor
						$conexion->query($sql);
						echo json_encode("Se ha insertado la caracteristica.");
					} else {
						if($padre == "Ninguna" && $taxon != "'Ninguno'" && $subgrupo == "'Ninguno'"){ //nulo el padre
							$sql = "INSERT INTO caracteristica_dicotomica(id, nivel, opcion, padre, caracteristica, taxon, clave, subgrupo) VALUES (NULL, $nivel, $opcion, NULL, $descripcion, $taxon, $id_grupo, NULL)"; //insertar en la tabla valor
							$conexion->query($sql);
							echo json_encode("Se ha insertado la caracteristica.");
						} else {
							if($padre != "Ninguna" && $taxon == "'Ninguno'" && $subgrupo == "'Ninguno'"){ //nulo el taxon
								$sql = "INSERT INTO caracteristica_dicotomica(id, nivel, opcion, padre, caracteristica, taxon, clave, subgrupo) VALUES (NULL, $nivel, $opcion, $id_padre, $descripcion, NULL, $id_grupo, NULL)"; //insertar en la tabla valor
								$conexion->query($sql);
								echo json_encode("Se ha insertado la caracteristica.");
							} else {//ninguno nulo
								if($padre != "Ninguna" && $taxon != "'Ninguno'" && $subgrupo == "'Ninguno'"){
									$sql = "INSERT INTO caracteristica_dicotomica(id, nivel, opcion, padre, caracteristica, taxon, clave, subgrupo) VALUES (NULL, $nivel, $opcion, $id_padre, $descripcion, $taxon, $id_grupo, NULL)"; //insertar en la tabla valor
									$conexion->query($sql);
									echo json_encode("Se ha insertado la caracteristica.");
								} else{
									if($padre == "Ninguna" && $taxon == "'Ninguno'" && $subgrupo != "'Ninguno'"){
										$sql = "INSERT INTO caracteristica_dicotomica(id, nivel, opcion, padre, caracteristica, taxon, clave, subgrupo) VALUES (NULL, $nivel, $opcion, NULL, $descripcion, NULL, $id_grupo, $id_subgrupo)"; //insertar en la tabla valor
										$conexion->query($sql);
										echo json_encode("Se ha insertado la caracteristica.");
									} else{
										if($padre != "Ninguna" && $taxon == "'Ninguno'" && $subgrupo != "'Ninguno'"){
											$sql = "INSERT INTO caracteristica_dicotomica(id, nivel, opcion, padre, caracteristica, taxon, clave, subgrupo) VALUES (NULL, $nivel, $opcion, $id_padre, $descripcion, NULL, $id_grupo, $id_subgrupo)"; //insertar en la tabla valor
											$conexion->query($sql);
											echo json_encode("Se ha insertado la caracteristica.");
										} else{
											if($padre == "Ninguna" && $taxon != "'Ninguno'" && $subgrupo != "'Ninguno'"){
												$sql = "INSERT INTO caracteristica_dicotomica(id, nivel, opcion, padre, caracteristica, taxon, clave, subgrupo) VALUES (NULL, $nivel, $opcion, NULL, $descripcion, $taxon, $id_grupo, $id_subgrupo)"; //insertar en la tabla valor
												$conexion->query($sql);
												echo json_encode("Se ha insertado la caracteristica.");
											} else{
												if($padre != "Ninguna" && $taxon != "'Ninguno'" && $subgrupo != "'Ninguno'"){
													$sql = "INSERT INTO caracteristica_dicotomica(id, nivel, opcion, padre, caracteristica, taxon, clave, subgrupo) VALUES (NULL, $nivel, $opcion, $id_padre, $descripcion, $taxon, $id_grupo, $id_subgrupo)"; //insertar en la tabla valor
													$conexion->query($sql);
													echo json_encode("Se ha insertado la caracteristica.");
												}
											}
										}
									}
								}
								
							}
						}
					}
				} else{
					echo json_encode("El nivel y la opcion de la característica ya están insertados. Por favor pruebe otro.");
				}

			break;

			case 'caracteristicascreadasgrupo':
				//Busca y devuelve los datos encontrados en forma de Array
				//Devuelve todos las caracteristicas creados
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupos = $result->fetch_assoc();
				$id_grupo = $grupos['id'];

				$sql = "SELECT nivel, opcion, caracteristica FROM caracteristica_dicotomica WHERE clave = $id_grupo ORDER BY nivel ASC";
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
			
			case 'editarcaracteristica':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$grupo = $_POST['grupo'];
				$subgrupo = $_POST['subgrupo'];

				//grupo
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];

				if($subgrupo != "'Ninguno'"){
					//subgrupo
					$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $subgrupo AND tipo = 'dicotomica'";
					$result = $conexion->query($sql);	
					$tuplasubgrupo = $result->fetch_assoc();
					$id_subgrupo = $tuplasubgrupo['id'];
				}

				//caracteristica actual
				$caracteristicaVector = explode("-", $caracteristicaseleccionada);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";
				$descripcion = "'" . $caracteristicaVector[2] . "'";
				$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);	
				$tupla = $result->fetch_assoc();
				$id_caracteristica = $tupla['id'];

				$nivel = $_POST['nivel'];
				$opcion = $_POST['opcion'];
				$taxon = $_POST['taxon'];
				$descripcion = $_POST['descripcion'];

				$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND
				 caracteristica = $descripcion AND clave = $id_grupo AND taxon = $taxon AND subgrupo = $id_subgrupo";
				$result = $conexion->query($sql);
				
				if ($result->num_rows == 0) { 
					if($taxon == "'Ninguno'" && $subgrupo == "'Ninguno'"){
						$sql = "UPDATE caracteristica_dicotomica SET nivel = $nivel, opcion = $opcion, taxon = NULL, caracteristica = $descripcion, subgrupo = NULL WHERE id = $id_caracteristica";
					} else {
						if($taxon != "'Ninguno'" && $subgrupo == "'Ninguno'"){
							$sql = "UPDATE caracteristica_dicotomica SET nivel = $nivel, opcion = $opcion, taxon = $taxon, caracteristica = $descripcion, subgrupo = NULL WHERE id = $id_caracteristica";
						} else{
							if($taxon == "'Ninguno'" && $subgrupo != "'Ninguno'"){
								$sql = "UPDATE caracteristica_dicotomica SET nivel = $nivel, opcion = $opcion, taxon = NULL, caracteristica = $descripcion, subgrupo = $id_subgrupo WHERE id = $id_caracteristica";
							} else{
								$sql = "UPDATE caracteristica_dicotomica SET nivel = $nivel, opcion = $opcion, taxon = $taxon, caracteristica = $descripcion, subgrupo = $id_subgrupo WHERE id = $id_caracteristica";
							}
						}
					}
					$conexion->query($sql);
					echo json_encode("La característica se ha editado correctamente.");
				}else{
					echo json_encode("El nombre de la característica ya esta registrada. Por favor pruebe otro nombre.");
				}
				
			break;


			case 'buscarhijos':
				$caracteristicaseleccionada = $_POST['caracteristicaActual'];
				$grupo = $_POST['grupo'];

				//grupo
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];

				//caracteristica actual
				$caracteristicaVector = explode("-", $caracteristicaseleccionada);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";
				$descripcion = "'" . $caracteristicaVector[2] . "'";
				$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);	
				$tupla = $result->fetch_assoc();
				$id_caracteristica = $tupla['id'];

				$sql = "SELECT nivel, opcion, caracteristica FROM caracteristica_dicotomica WHERE clave = $id_grupo AND padre = $id_caracteristica";
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

			case 'eliminarcaracteristica':
				//Se recogen los datos del formulario enviado
				$caracteristicaseleccionada = $_POST['caracteristicaActual'];
				$grupo = $_POST['grupo'];

				//grupo
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];

				//caracteristica actual
				$caracteristicaVector = explode("-", $caracteristicaseleccionada);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";
				$descripcion = "'" . $caracteristicaVector[2] . "'";
				$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);	
				$tupla = $result->fetch_assoc();
				$id_caracteristica = $tupla['id'];

				$sql = "DELETE FROM imagen_dicotomica WHERE id_caracteristica = $id_caracteristica";
				$conexion->query($sql);
	
				$sql = "DELETE FROM caracteristica_dicotomica WHERE id = $id_caracteristica";
				$conexion->query($sql);
				echo json_encode("La característica se ha eliminado correctamente.");
					
			break;
		
			case 'asociarimagencaracteristica':
				if ($_FILES["file"]["name"][0] != ""){
				    $file = $_FILES["file"];
					$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
					$grupo = $_POST['gruposeleccionado'];

					$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
					$result = $conexion->query($sql);	
					$grupotupla = $result->fetch_assoc();
					$id_grupo = $grupotupla['id'];

					$caracteristicaVector = explode("-", $caracteristicaseleccionada);
					$nivel = $caracteristicaVector[0];
					$opcion = "'" . $caracteristicaVector[1] . "'";

					$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
					$result = $conexion->query($sql);	
					$tupla = $result->fetch_assoc();
					$id_caracteristica = $tupla['id'];

					$sql = "SELECT id FROM imagen_dicotomica WHERE id_caracteristica = $id_caracteristica";
					$result = $conexion->query($sql);	
					if($result->num_rows == 0){
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
							$sql="INSERT INTO imagen_dicotomica(id,anchura,altura,tipo,imagen,id_caracteristica) VALUES (NULL,$width,$heigth,'$tipo','$foto',$id_caracteristica)";
							$conexion->query($sql);
							echo json_encode("<p style='color: blue'>La imagen se ha insertado.");
						}
					}
				}
			break;

			case 'mostrarimagenes':
				$caracteristicaseleccionada = $_POST['caracteristicaseleccionada'];
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];

				$caracteristicaVector = explode("-", $caracteristicaseleccionada);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";

				$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);	
				$tupla = $result->fetch_assoc();
				$id_caracteristica = $tupla['id'];

				$sql = "SELECT id, anchura, altura, tipo, imagen FROM imagen_dicotomica WHERE id_caracteristica = $id_caracteristica";
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
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);	
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];

				$caracteristicaVector = explode("-", $caracteristicaseleccionada);
				$nivel = $caracteristicaVector[0];
				$opcion = "'" . $caracteristicaVector[1] . "'";

				$sql = "SELECT id FROM caracteristica_dicotomica WHERE nivel = $nivel AND opcion = $opcion AND clave = $id_grupo";
				$result = $conexion->query($sql);	
				$tupla = $result->fetch_assoc();
				$id_caracteristica = $tupla['id'];
				
				$sql = "DELETE FROM imagen_dicotomica WHERE id_caracteristica = $id_caracteristica";
				$conexion->query($sql);
				echo json_encode("La imagen ha sido eliminada.");
			break;

			case 'caracteristicaspadre':
				//Se recogen los datos del formulario enviado
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
				$result = $conexion->query($sql);
				$grupo = $result->fetch_assoc();
				$id_grupo = $grupo['id'];

				
				$sql = "SELECT nivel, opcion, caracteristica FROM caracteristica_dicotomica WHERE clave = $id_grupo AND nivel = 1"; //obtengo los id de las caracteristicas del grupo
				$result = $conexion->query($sql);
			
				if($result->num_rows != 0){
					$ids_caracteristicas = array();
					for ($i = 0; $i < $result->num_rows ; $i++) { //obtengo los ids de los grupos
						$result->field_seek($i);
						array_push($ids_caracteristicas, $result->fetch_array());
					}
				}
				
				echo json_encode($ids_caracteristicas);
			break;

			case 'eliminargrupo':
				//Se recogen los datos del formulario enviado
				$grupo = $_POST['gruposeleccionado'];
				$sql = "SELECT id FROM grupo_caracteristica WHERE grupo = $grupo AND tipo = 'dicotomica'";
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
				/*$sql = "SELECT id FROM caracteristica_dicotomica WHERE clave = $id_grupo"; //obtengo los id de las caracteristicas del grupo
				$result = $conexion->query($sql);
			
				if($result->num_rows != 0){
					$ids_caracteristicas = array();
					for ($i = 0; $i < $result->num_rows ; $i++) { //obtengo los ids de los grupos
						$result->field_seek($i);
						array_push($ids_caracteristicas, $result->fetch_array());
						$id_caracteristica = $ids_caracteristicas[$i][0];		
						$sql = "DELETE FROM imagen_dicotomica WHERE id_caracteristica = $id_caracteristica";
						$conexion->query($sql);
						$sql = "DELETE FROM caracteristica_dicotomica WHERE id = $id_caracteristica";
						$conexion->query($sql);
					}
				}*/
				$sql = "DELETE FROM grupo_caracteristica WHERE id = $id_grupo";
				$conexion->query($sql);
				echo json_encode("El grupo se ha eliminado correctamente.");
			break;
		}
	}else{
		header('Location: http://crustaceankeys.uca.es');	
	}

mysqli_close($conexion); 

}
 ?>