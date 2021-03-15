<?php
session_start();

if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] == true) {

} else {
   echo "Esta pagina es solo para administradores.<br>";
   echo "<br><a href='../administracion.html'>Administración</a>";
exit;
}

$now = time();

if($now > $_SESSION['expire']) {
session_destroy();

echo "Su sesion a terminado,
<a href='../administracion.html'>Necesita Hacer Login</a>";
exit;
}
?>

<!DOCTYPE html>
<html lang="es">

<head>
	<title>Panel de Control</title>
	<meta charset="UTF-8">
	<script src="../js/jquery-3.2.1.min.js"></script>
	<script src="../js/bootstrap.min.js"></script>
	<link rel="stylesheet" href="../css/bootstrap.min.css">
	<link rel="stylesheet" href="../css/panel-control.css">
	<script src="../jsadmin/editar-dicotomica.js"></script>
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">
	<link href="../css/editor.css" type="text/css" rel="stylesheet"/>
	<script src="../js/editor.js" type="text/javascript"></script>

</head>
<body onload="iniciar()">
	<nav class="navbar navbar-toggleable-md navbar-light bg-faded ">
	  <button class="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
	    <span class="navbar-toggler-icon"></span>
	  </button>
	  <a class="navbar-brand" href="#">Panel de control</a>

	  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
	    <ul class="navbar-nav mr-auto mt-2 mt-md-0">
	      <li class="nav-item dropdown">
	        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Taxones</a>
	        <ul class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" tabindex="-1" href="./agregar-taxon.php">Añadir taxón</a></li>
              <li><a class="dropdown-item" href="./editar-taxon.php">Editar taxón</a></li>
              <li><a class="dropdown-item" href="./literatura.php">Configuración de la literatura</a></li>
              <li><a class="dropdown-item" href="./imagenes-taxon.php">Añadir imágenes de taxón</a></li>
              <li><a class="dropdown-item" href="./editar-imagenes-taxon.php">Editar imágenes de taxón</a></li>
			  <li><a class="dropdown-item" href="./agregar-distribucion.php">Añadir distribución</a></li>
			  <li><a class="dropdown-item" href="./editar-distribucion.php">Editar distribución</a></li>
            </ul>
	      </li>
		<ul class="navbar-nav mr-auto mt-2 mt-md-0">
	      <li class="nav-item dropdown">
	        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Glosario</a>
	        <ul class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" tabindex="-1" href="./agregar-termino.php">Añadir término</a></li>
              <li><a class="dropdown-item" href="./editar-termino.php">Editar término</a></li>         
              <li><a class="dropdown-item" href="./imagenes-termino.php">Añadir imágenes de término</a></li>
              <li><a class="dropdown-item" href="./editar-imagenes-termino.php">Editar imágenes de término</a></li>
            </ul>
	      </li>
		<ul class="navbar-nav mr-auto mt-2 mt-md-0">
	      <li class="nav-item dropdown">
	        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Esquemas Generales</a>
	        <ul class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" tabindex="-1" href="./agregar-esquema.php">Añadir esquema</a></li>
              <li><a class="dropdown-item" href="./editar-esquema.php">Editar esquema</a></li>      
            </ul>
	      </li>
		  <ul class="navbar-nav mr-auto mt-2 mt-md-0">
	      <li class="nav-item dropdown">
	        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Claves</a>
	        <ul class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
              <li><a class="dropdown-item" tabindex="-1" href="./agregar-clave.php">Añadir clave</a></li>
              <li><a class="dropdown-item" href="./editar-clave.php">Editar clave</a></li>      
            </ul>
	      </li>
          <ul class="navbar-nav mr-auto mt-2 mt-md-0">
          <li class="nav-item dropdown">
	        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Identificar crear</a>
	        <ul class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
            <li><a class="dropdown-item" tabindex="-1" href="./agregar-grupo.php">Crear grupo</a></li>
              <li><a class="dropdown-item" href="./editar-grupo.php">Editar grupo</a></li> 
              <li><a class="dropdown-item" href="./agregar-caracteristica.php">Crear característica matricial</a></li>
              <li><a class="dropdown-item" href="./editar-caracteristica.php">Editar característica matricial</a></li> 
              <li><a class="dropdown-item" href="./agregar-dicotomica.php">Crear característica dicotómica</a></li>
              <li><a class="dropdown-item" href="./editar-dicotomica.php">Editar característica dicotómica</a></li>
              </ul>
	      </li>
		  <ul class="navbar-nav mr-auto mt-2 mt-md-0">
		  <li class="nav-item dropdown">
	        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Identificar asociar</a>
	        <ul class="dropdown-menu " aria-labelledby="navbarDropdownMenuLink">
				<li><a class="dropdown-item" href="./asociar-grupo-taxon.php">Asociar taxón a grupo</a></li>
			  	<li><a class="dropdown-item" href="./asociar-imagen-caracteristica.php">Asociar imagen a característica</a></li>
				<li><a class="dropdown-item" tabindex="-1" href="./asociar-caracteristica-grupo.php">Asociar caract. matricial a subgrupo</a></li>  
				<li><a class="dropdown-item" href="./asociar-caracteristica.php">Asociar caract. matricial a taxón</a></li>  
				<li><a class="dropdown-item" href="./editar-asociar-grupo-taxon.php">Editar asociar taxón a grupo</a></li>    
				<li><a class="dropdown-item" href="./editar-asociar-imagen-caracteristica.php">Editar asociar imagen a característica</a></li>
			  	<li><a class="dropdown-item" href="./editar-asociar-caracteristica-grupo.php">Editar asociar caract. matricial a subgrupo</a></li>
			  	<li><a class="dropdown-item" href="./editar-asociar-caracteristica.php">Editar asociar caract. matricial a taxón</a></li>  
			  	<li><a class="dropdown-item" href="./editar-asociar-taxon.php">Editar asociar taxón a caract. matricial</a></li>
			</ul>
	      </li>
		  <li class="nav-item">
		  <a class="nav-link" href="./editar-paginas.php">Bienvenida</a>
		  </li>
		  <li class="nav-item">
		  <a class="nav-link" href="./figuras.php">Figuras</a>
	      </li>
	      <li class="nav-item">
	        <a class="nav-link" href=logout.php>Cerrar Sesión</a>
	      </li>
	    </ul>
	  </div>
	</nav>
	<div class="container">
		<div class="row">
		  	<div class="col-sm-12">
		  		<div class="titulo-panel-control" style="text-align: center;"><h2 style="text-decoration: underline;">Editar característica dicotómica</h2></div>
		  		<form enctype="multipart/form-data" id="editarcaracteristicaform" class="a-tabla-animal" method="post" >
				  	<div class="titulo-panel-control" style="text-align: center;"><h4>Grupo de la característica</h4></div>
                    <select class="form-control" id="gruposcreados" onchange="rellenar_caracteristicas()">
					</select>
					<br>
				
					<div class="titulo-panel-control" style="text-align: center;"><h4>Selecciona la característica que desea modificar</h4></div>
      				<select class="form-control" id="caracteristicascreadas" onchange="rellenar_datos_caracteristicas()">
      					<!-- Rellenado con ajax -->
      				</select>
					<br>
					<div style="display: flex; justify-content: center;">
						<div style="display: flex; flex-direction: column;">
							<div class="titulo-panel-control" style="text-align: center;"><h4>Nivel</h4></div>
							<input class="form-control" type="text" id="nivel" onchange="rellenar_padres()"></input>
						</div>

						<div style="display: flex; flex-direction: column;">
							<div class="titulo-panel-control" style="text-align: center;"><h4>Opción</h4></div>
							<select class="form-control" id="optionbox">
								<!-- Rellenado con ajax -->
							</select>
						</div>
					</div>
					<br>
                    <div class="titulo-panel-control" style="text-align: center;"><h4>Descripción de la característica (Máx. 650 caracteres)</h4></div>
                    <input class="form-control" type="text" id="descripcion" required></input>
					
					<div class="titulo-panel-control" style="text-align: center;"><h4>Taxón hijo</h4></div>
					<select class="form-control" id="taxonbox">
      					<!-- Rellenado con ajax -->
      				</select>
				
					<br>
					<div class="titulo-panel-control" style="text-align: center;"><h4>Subgrupo</h4></div>
					<select class="form-control" id="subgrupobox">
      					<!-- Rellenado con ajax -->
      				</select>
					<br>
					<a class="btn btn-primary btn-sm" href='javascript:;' onclick="editarcaracteristica();" role="button">Guardar característica</a>
					<a class='btn btn-primary btn-sm' href='javascript:;' data-toggle='modal' data-target='#eliminarcaracteristicaModal' role='button'>Eliminar característica</a>
					<br>
					<br>
					<br>
				</form>
		  	</div>
		</div>
	</div>
	<!--
	<div id="cambiarcaracteristicaModal" class="modal fade" role="dialog">
	  <div class="modal-dialog">

	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title"></h4>
	      </div>
	      <div class="modal-body">
	        <p>Recuerda volver a poner nuevos valores al cambiar el tipo de valor de la característica.</p>
			<p>Recuerda volver a cambiar los valores para las características asociadas.</p>
	      </div>
	      <div class="modal-footer">
	      	<input type="hidden" id="caracteristicaID" value=""> 
	      	<a  class="btn btn-primary" href='javascript:;' role="button" data-dismiss="modal">De acuerdo</a>
	      </div>
	    </div>

	  </div>
	</div>
	-->
	
	<!-- Modal eliminar-->
	<div id="eliminarcaracteristicaModal" class="modal fade" role="dialog">
	  <div class="modal-dialog">

	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title"></h4>
	      </div>
	      <div class="modal-body">
	      	<p>Estás apunto de eliminar una característica.</p>
	        <p>¿Estas seguro que desea eliminar esta característica?</p>
	      </div>
	      <div class="modal-footer">
	      	<a class="btn btn-primary" href='javascript:;' onclick="eliminarcaracteristica();" role="button" data-dismiss="modal">Si</a>
	      	<a  class="btn btn-primary" href='javascript:;' role="button" data-dismiss="modal">No</a>
	      </div>
	    </div>

	  </div>
	</div>
</body>
</html>