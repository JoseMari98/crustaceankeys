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
	<script src="../jsadmin/literatura.js"></script>
	<link href="http://netdna.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css" rel="stylesheet">

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
	        <a class="nav-link" href=logout.php>Cerrar Sesión</a>
	      </li>
	    </ul>
	  </div>
	</nav>
	<div class="container">
		<div class="row">
				<div class="col-sm-12">
	  					<div class="titulo-panel-control" style="text-align: center;"><h2 style="text-decoration: underline;">Configuración de la literatura</h2></div>
	  			<div class="col-sm-12">
	  	</div>
		<div class="row">
				<div class="col-md-6">
					<div class="titulo-panel-control" style="text-align: center;"><h3 style="text-decoration: underline;">Añadir literatura</h3></div>
					<form id="taxonform" class="a-tabla-animal" method="post" >
						<div class="titulo-panel-control" style="text-align: center;"><h4>Datos de la literatura</h4></div>
						<input class="form-control" type="text" id="a-literatura" required></input>
						<br>
						<a class="btn btn-primary btn-sm" href='javascript:;' onclick="insertar_literatura();" role="button">Insertar literatura</a>
						<br>
					</form>
				</div>
				<div class="col-md-6">
					<div class="titulo-panel-control" style="text-align: center;"><h3 style="text-decoration: underline;">Editar o eliminar literatura</h3></div>
					<form id="taxonform" class="a-tabla-animal" method="post" >
						
						<div class="titulo-panel-control" style="text-align: center;"><h4>Selecciona la literatura que desea modificar</h4></div>
	      				<select class="form-control" id="literaturascreadas" onchange="rellenar_datos_literatura()">
	      					<!-- Rellenado con ajax -->
	      				</select>
						<br>
						<div class="titulo-panel-control" style="text-align: center;"><h4>Datos de la literatura</h4></div>
						<input class="form-control" type="text" id="e-literatura" required></input>
						<br>
						<a class="btn btn-primary btn-sm" href='javascript:;' onclick="editar_literatura();" role="button">Guardar literatura</a>
						<a class="btn btn-primary btn-sm" href='javascript:;' onclick="eliminar_literatura();" role="button">Eliminar literatura</a>
						<br>
					</form>
				</div>
		</div>
		<div class="row">
				<div class="col-md-6">
					<div class="titulo-panel-control" style="text-align: center;"><h3 style="text-decoration: underline;">Vincular literatura con taxón</h3></div>
					<form id="taxonform" class="a-tabla-animal" method="post" >
						<div class="titulo-panel-control" style="text-align: center;"><h4>Selecciona el taxón que desea vincular</h4></div>
						<select class="form-control" id="taxonescreados" onchange="rellenar_literatura_posible()">
	      					<!-- Rellenado con ajax -->
	      				</select>
						<br>
						<div class="titulo-panel-control" style="text-align: center;"><h4>Selecciona la literatura que desea vincular</h4></div>
	      				<select class="form-control" id="literaturasnovinculada">
	      					<!-- Rellenado con ajax -->
	      				</select>
						<br>
						<a class="btn btn-primary btn-sm" href='javascript:;' onclick="vincular();" role="button">Vincular</a>
						<br>
					</form>
				</div>
				<div class="col-md-6">
					<div class="titulo-panel-control" style="text-align: center;"><h3 style="text-decoration: underline;">Desvincular literaturas con taxón</h3></div>
					<form id="taxonform" class="a-tabla-animal" method="post" >
						<div class="titulo-panel-control" style="text-align: center;"><h4>Selecciona el taxón que desea desvincular las literaturas</h4></div>
	      				<select class="form-control" id="taxonvinculado" onchange="rellenar_literatura_vinculada()">
	      					<!-- Rellenado con ajax -->
	      				</select>
						<br>
						<div id="literaturavinculada"></div>
						<!-- <a class="btn btn-primary btn-sm" href='javascript:;' onclick="vincular();" role="button">Vincular</a> -->
						<br>
					</form>
				</div>
		</div>
	</div>
</body>
</html>