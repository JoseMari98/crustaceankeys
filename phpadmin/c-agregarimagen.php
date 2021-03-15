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


if ($_FILES["file"]["name"][0] != ""){
    $reporte= null;
    $file = $_FILES["file"];
    $nombre = $_POST['nombre'];
    $taxon = $_POST['taxon'];
    $minidescripcion = $_POST['minidescripcion'];
    for ($i=0; $i<count($file['name']); $i++){
        // $file = $_FILES["file"];
        $nombre= $file['name'][$i];
        $tipo= $file["type"][$i];
        $ruta_provisonal= $file["tmp_name"][$i];
        $size= $file["size"][$i];
        $dimensiones= getimagesize($ruta_provisonal);
        $width= $dimensiones[0];
        $heigth= $dimensiones[1];
        $carpeta= "imagenes/";
        if ($tipo != "image/jpeg" && $tipo != "image/png" && $tipo != "image/jpg" && $tipo != "image/gif"){
            $reporte .= "<p style='color: red'> El archivo $nombre no es una imagen.</p>";
        }else if($size > 5000*5000){
            $reporte .= " <p style='color: red'> el archivo $nombre supera el maximo permitido 5 MB.</p>";
        }else{
            // $src = $carpeta.$nombre;
            // move_uploaded_file($ruta_provisional, $src);
            // $foto=mysql_real_escape_string(file_get_contents($ruta_provisional));
            //  $fp = fopen($ruta_provisonal, "rb");
            // $foto = fread($fp, $size);
            // $foto = addslashes($foto);
            // fclose($fp); 
            $foto = addslashes(file_get_contents($ruta_provisonal));
            $sql="INSERT INTO `imagephp` (anchura,altura,tipo,imagen,name_ref,nombre,minidescripcion) VALUES ($width,$heigth,'$tipo','$foto',$taxon,'$nombre','$minidescripcion')";
            // echo $sql;
            $conexion->query($sql);
            echo "<p style='color: blue'>La imagen $nombre se ha insertado.</p>";
        };
    };
    
    echo $reporte;
};

// echo $nombre.$minidescripcion;


?>