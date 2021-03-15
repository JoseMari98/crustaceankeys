function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
    var gruposeleccionado = "'"+getGET()['grupo']+"'";
    $.ajax({
        url: '../php/identificar.php',
        async: false,
        type: 'POST',
        dataType: 'json',
        data: {tipo: 'rellenarfecha', gruposeleccionado: gruposeleccionado},
        success: function(respuesta){
            if(respuesta != "No hay fecha")
                $("#fecha").html(respuesta);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }
    
        });
    caracteristicas_creadas();
    mostrar_taxones();
    $('#titulodinamico2').html("Identificando: " + getGET()['grupo']);
 };

 var taxonesindefinidos = [];
 var taxonesdefinidos =[];
 var taxonesindefinidosdin = [];
 var gruposdefinidos = [];
 var gruposindefinidos = [];
 var gruposindefinidosdin = [];
 var caracteristicasbuscar = new Map();

 $(document).on('click', '.borrar', function (event) {
    var t = $('#caracteristicastable').DataTable();
    event.preventDefault();
    var caracteristicaseleccionada = $(this).parent("td").parent("tr")[0].getElementsByTagName("td")[0].innerText;
    var valorseleccionado = $(this).parent("td").parent("tr")[0].getElementsByTagName("td")[1].innerText;
    caracteristicasbuscar.delete(caracteristicaseleccionada);
    t.row($(this).parents('tr')).remove().draw();
    taxones_acertados();
    //que se vuelva a hacer la consulta con los datos actuales que hay
});

 $(document).ready(function () {
    $('#caracteristicastable').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ resultados",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ resultados",
            "sInfoEmpty":      "Mostrando resultados del 0 al 0 de un total de 0 resultados",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ resultados)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad"
            }
        },
        "scrollY": "50vh",
        "searching": false,
        "lengthChange": false,
        "scrollCollapse": true,
        "bInfo" : false,
        "paging": false,
        "columns": [
            { "width": "20%" },
            null,
            { "width": "10%" },
          ],
        "pageLength": 200
    });
    $('.dataTables_length').addClass('bs-select');


    $('#taxonesdefinidostable').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ resultados",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ resultados",
            "sInfoEmpty":      "Mostrando resultados del 0 al 0 de un total de 0 resultados",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ resultados)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad"
            }
        },
        "scrollY": "50vh",
        "searching": false,
        "lengthChange": false,
        "bInfo" : false,
        "paging": false,
        "scrollCollapse": true,
        "order": [[ 1, "desc" ]],
        "columns": [
            null,
            { "width": "20%" },
          ],
        "pageLength": 200
    });
    $('.dataTables_length').addClass('bs-select');


    $('#taxonesindefinidostable').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ resultados",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Ningún dato disponible en esta tabla",
            "sInfo":           "Mostrando resultados del _START_ al _END_ de un total de _TOTAL_ resultados",
            "sInfoEmpty":      "Mostrando resultados del 0 al 0 de un total de 0 resultados",
            "sInfoFiltered":   "(filtrado de un total de _MAX_ resultados)",
            "sInfoPostFix":    "",
            "sSearch":         "Buscar:",
            "sUrl":            "",
            "sInfoThousands":  ",",
            "sLoadingRecords": "Cargando...",
            "oPaginate": {
                "sFirst":    "Primero",
                "sLast":     "Último",
                "sNext":     "Siguiente",
                "sPrevious": "Anterior"
            },
            "oAria": {
                "sSortAscending":  ": Activar para ordenar la columna de manera ascendente",
                "sSortDescending": ": Activar para ordenar la columna de manera descendente"
            },
            "buttons": {
                "copy": "Copiar",
                "colvis": "Visibilidad"
            }
        },
        "scrollY": "50vh",
        "searching": false,
        "lengthChange": false,
        "paging": false,
        "bInfo" : false,
        "scrollCollapse": true,
        "pageLength": 200
    });
    $('.dataTables_length').addClass('bs-select');

    /*var table = $('#taxonesdefinidostable').DataTable();
    table.order( [ 2, 'desc' ] ).draw();*/
    });

 function getGET()
{
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if(loc.indexOf('?')>0) {
        // cogemos la parte de la url que hay despues del interrogante
        var getString = loc.split('?')[1];
        // obtenemos un array con cada clave=valor
        var GET = getString.split('&');
        var get = {};
        // recorremos todo el array de valores
        for(var i = 0, l = GET.length; i < l; i++){
            var tmp = GET[i].split('=');
            get[tmp[0]] = unescape(decodeURI(tmp[1]));
        }
        return get;
    }
}

function caracteristicas_creadas(){
    var gruposeleccionado = "'" + getGET()['grupo'] + "'";
	if(gruposeleccionado == "'Seleccione un grupo de identificación'"){
		$("#caracteristicascreadas").html("");
		$("#valuebox").html("");
	}else{
		$.ajax({
		url: '../php/identificar.php',
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'caracteristicascreadasgrupo', gruposeleccionado: gruposeleccionado},
		success: function(respuesta){
			var cadena = "<option selected='selected'>Seleccione una característica</option>"
			if(respuesta != "No hay características para este grupo"){
				for (var i = 0; i < respuesta.length; i++){      
					cadena += "<option>"+respuesta[i][0].toString() +"</option>";
				};
				$("#caracteristicascreadas").html(cadena);
			}else{
				$("#caracteristicascreadas").html(cadena);
				alert(respuesta);
			}
			

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
						alert("Status: " + textStatus); alert("Error: " + errorThrown); 
					}

		});
	}
};

function rellenar_valores(){
	var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";
	if(caracteristicaseleccionada == "'Seleccione una característica'"){
		$("#valuebox").html("");
	}else{
		$.ajax({
	      url: '../php/identificar.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'rellenardatoscaracteristica', caracteristicaseleccionada: caracteristicaseleccionada},
	      success: function(respuesta){
			var  cadena = "<option selected='selected'>Seleccione un valor</option>";
            var valoresobtenidos = respuesta[0][2];
            var valores = valoresobtenidos.split("; ");
			for (var i = 0; i < valores.length; i++){
				cadena += "<option>" + valores[i] + "</option>";
			}
            $("#valuebox").html(cadena);
            mostrarimagenes();
	        
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	};

};

function mostrarimagenes(){
	var caracteristicaseleccionada = "'"+$("#caracteristicascreadas option:selected").text()+"'";	
	if(caracteristicaseleccionada != "'Seleccione una característica'"){
	    $.ajax({
	      url: '../php/identificar.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarimagenes', caracteristicaseleccionada: caracteristicaseleccionada},
	      success: function(respuesta){
	        var cadena = "";
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        cadena+="<img id='"+respuesta[i]['id']+"' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' width='400'/>";
		    	}
	    	}
	        $("#divimagen").html(cadena);

	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }

	  	});
	}else{
		$("#divimagen").html("");
	}
};

function mostrar_taxones(){
    var grupo = "'" + getGET()['grupo'] + "'";
    if(grupo != "'Seleccione un grupo de identificación'"){
        $.ajax({
        url: '../php/identificar.php',
        type: 'POST',
        dataType: 'json',
        data: {tipo: 'taxonesgrupo', grupo: grupo},
        success: function(respuesta){
            $(document).ready(function() {
                var t = $('#taxonesindefinidostable').DataTable();
                if(respuesta != "No hay taxones asociados."){
                    for (var i = 0; i < respuesta.length; i++){ 
                        var nombre = respuesta[i]['name']; 
                        var pos = taxonesindefinidos.indexOf(nombre);
                        if(pos == -1){
                            taxonesindefinidos.push(nombre);   
                            taxonesindefinidosdin.push(nombre);
                            var nombreurl = '<a target="_blank" href="http://crustaceankeys.uca.es/taxon.html?taxon=' + nombre + '">' + nombre + '</a>'  
                            t.row.add([nombreurl]).draw(false); 
                        }
                    };
                }
            });
            mostrar_grupos();

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }

        });
    }
}

function mostrar_grupos(){
    var grupo = "'" + getGET()['grupo'] + "'";
    if(grupo != "'Seleccione un grupo de identificación'"){
        $.ajax({
        url: '../php/identificar.php',
        type: 'POST',
        dataType: 'json',
        data: {tipo: 'grupos', grupo: grupo},
        success: function(respuesta){
            $(document).ready(function() {
                var t = $('#taxonesindefinidostable').DataTable();
                if(respuesta != "No hay grupos asociados."){
                    for (var i = 0; i < respuesta.length; i++){ 
                        var grupo = respuesta[i]['grupo']; 
                        var pos = gruposindefinidos.indexOf(grupo);
                        if(pos == -1){
                            gruposindefinidos.push(grupo);   
                            gruposindefinidosdin.push(grupo);
                            var grupourl = '<a target="_blank" href="http://crustaceankeys.uca.es/identificar.html?grupo=' + grupo + '">' + grupo.toUpperCase() + '</a>'  
                            t.row.add([grupourl]).draw(false); 
                        }
                    };
                }
            });

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }

        });
    }
}

function mostrar_taxonesindefinidos(vacio){
    $(document).ready(function() {
        var t = $('#taxonesindefinidostable').DataTable();
        t.clear().draw();
        if(vacio){
            for (var i = 0; i < taxonesindefinidos.length; i++){ 
                var nombre = taxonesindefinidos[i];
                var nombreurl = '<a target="_blank" href="http://crustaceankeys.uca.es/taxon.html?taxon=' + nombre + '">' + nombre + '</a>';
                t.row.add([nombreurl]).draw(false); 
            };
            taxonesindefinidosdin = taxonesindefinidos.slice();
        } else{
            for (var i = 0; i < taxonesindefinidos.length; i++){ 
                var nombre = taxonesindefinidos[i]; 
                var pos = taxonesdefinidos.indexOf(nombre);
                var posdin = taxonesindefinidosdin.indexOf(nombre);
                if(pos == -1){
                    if(posdin == -1){
                        taxonesindefinidosdin.push(nombre);  
                    }
                    var nombreurl = '<a target="_blank" href="http://crustaceankeys.uca.es/taxon.html?taxon=' + nombre + '">' + nombre + '</a>';
                    t.row.add([nombreurl]).draw(false); 
                }
            };
        }
    });
}

function mostrar_gruposindefinidos(vacio){
    $(document).ready(function() {
        var t = $('#taxonesindefinidostable').DataTable();
        if(vacio){
            for (var i = 0; i < gruposindefinidos.length; i++){ 
                var grupo = gruposindefinidos[i];
                var grupourl = '<a target="_blank" href="http://crustaceankeys.uca.es/identificar.html?grupo=' + grupo + '">' + grupo.toUpperCase() + '</a>';
                t.row.add([grupourl]).draw(false); 
            };
            gruposindefinidosdin = gruposindefinidos.slice();
        } else{
            for (var i = 0; i < gruposindefinidos.length; i++){ 
                var grupo = gruposindefinidos[i]; 
                var pos = gruposdefinidos.indexOf(grupo);
                var posdin = gruposindefinidosdin.indexOf(grupo);
                if(pos == -1){
                    if(posdin == -1){
                        gruposindefinidosdin.push(grupo);  
                    }
                    var grupourl = '<a target="_blank" href="http://crustaceankeys.uca.es/identificar.html?grupo=' + grupo + '">' + grupo.toUpperCase() + '</a>';
                    t.row.add([grupourl]).draw(false); 
                }
            };
        }
        
    });
}

function anadir_caracteristica(){
    //que se anada a la tabla y que se haga la consulta y se actualicen las tablas de los taxones
    var caracteristicaseleccionada = $("#caracteristicascreadas option:selected").text();
    var valorseleccionado = $("#valuebox option:selected").text();

	if(caracteristicaseleccionada != "Seleccione una característica"){
        if(valorseleccionado != "Seleccione un valor"){
            $(document).ready(function() {
                var t = $('#caracteristicastable').DataTable();
                if(caracteristicasbuscar.get(caracteristicaseleccionada) == null){
                    boton = "<input type='button' class='borrar' value='Eliminar'/>";
                    caracteristicasbuscar.set(caracteristicaseleccionada, valorseleccionado);   
                    t.row.add([caracteristicaseleccionada, valorseleccionado, boton]).draw(false); 
                    taxones_acertados();
                } else
                    alert("Caracteristica previamente añadida");
            });
        }else {
            alert("Selecciona un valor");
        }
    } else{
        alert("Selecciona una característica");
    }
}

function taxones_acertados(){
    taxonesdefinidosaux = taxonesdefinidos;
    taxonesindefinidosaux = taxonesindefinidos;
    caracteristicasbuscaraux = caracteristicasbuscar;
    $.ajax({
        url: '../php/identificar.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {tipo: 'taxonesacertados', taxonesdefinidos: JSON.stringify(taxonesdefinidosaux), taxonesindefinidos: JSON.stringify(taxonesindefinidosaux), caracteristicasbuscar: JSON.stringify(Array.from(caracteristicasbuscaraux.entries()))},
        success: function(respuesta){
            $(document).ready(function() {
                var t = $('#taxonesdefinidostable').DataTable();
                t.clear().draw();
                if(respuesta != null && respuesta.length != 0){
                    var taxonesdefinidoscopia = taxonesdefinidos.slice();
                    for(var j = 0 ; j < taxonesdefinidos.length ; j++){
                        k = 0;
                        valido = false;
                        while(k < respuesta.length && !valido){
                            if(respuesta[k][0] === taxonesdefinidos[j])
                                valido = true;
                            k++;
                        }

                        if(!valido){
                            var poselemento = taxonesdefinidoscopia.indexOf(taxonesdefinidos[j]);
                            taxonesdefinidoscopia.splice(poselemento, 1);
                        }
                    }

                    taxonesdefinidos = taxonesdefinidoscopia.slice();

                    for (var i = 0; i < respuesta.length; i++){ 
                        var nombre = respuesta[i][0]; 
                        var acierto = respuesta[i][1];
                        var apariciones = respuesta[i][2];
                        var pos = taxonesdefinidos.indexOf(nombre);
                        var posdin = taxonesindefinidosdin.indexOf(nombre);

                        if(pos == -1){
                            taxonesdefinidos.push(nombre);   
                        }
                        if(posdin != -1)
                            taxonesindefinidosdin.splice(posdin, 1);
                        var nombreurl = '<a target="_blank" href="http://crustaceankeys.uca.es/taxon.html?taxon=' + nombre + ' ">' + nombre + '</a>';
                        t.row.add([nombreurl, acierto + "/" + apariciones]).draw(false);
                    };
                    mostrar_taxonesindefinidos(false);
                } else{
                    if(respuesta.length == 0){
                        while(taxonesdefinidos.length > 0)
                            taxonesdefinidos.pop();
                        mostrar_taxonesindefinidos(true);
                    }
                }
            });
            grupos_acertados();
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }

        });
}

function grupos_acertados(){
    gruposdefinidosaux = gruposdefinidos;
    gruposdefinidosaux = gruposindefinidos;
    caracteristicasbuscaraux = caracteristicasbuscar;
    $.ajax({
        url: '../php/identificar.php',
        type: 'POST',
        dataType: 'json',
        data: {tipo: 'gruposacertados', gruposdefinidos: JSON.stringify(gruposdefinidosaux), gruposindefinidos: JSON.stringify(gruposdefinidosaux), caracteristicasbuscar: JSON.stringify(Array.from(caracteristicasbuscaraux.entries()))},
        success: function(respuesta){
            $(document).ready(function() {
                var t = $('#taxonesdefinidostable').DataTable();
                if(respuesta != null && respuesta.length != 0){
                    var gruposdefinidoscopia = gruposdefinidos.slice();
                    for(var j = 0 ; j < gruposdefinidos.length ; j++){
                        k = 0;
                        valido = false;
                        while(k < respuesta.length && !valido){
                            if(respuesta[k][0] === gruposdefinidos[j])
                                valido = true;
                            k++;
                        }

                        if(!valido){
                            var poselemento = gruposdefinidoscopia.indexOf(gruposdefinidos[j]);
                            gruposdefinidoscopia.splice(poselemento, 1);
                        }
                    }

                    gruposdefinidos = gruposdefinidoscopia.slice();

                    for (var i = 0; i < respuesta.length; i++){ 
                        var grupo = respuesta[i][0];
                        var acierto = respuesta[i][1];
                        var apariciones = respuesta[i][2];
                        var pos = gruposdefinidos.indexOf(grupo);
                        var posdin = gruposindefinidosdin.indexOf(grupo);
                        if(pos == -1){
                            gruposdefinidos.push(grupo);   
                        }
                        if(posdin != -1)
                            gruposindefinidosdin.splice(posdin, 1);
                        var grupourl = '<a target="_blank" href="http://crustaceankeys.uca.es/identificar.html?grupo=' + grupo + ' ">' + grupo.toUpperCase() + '</a>';
                        t.row.add([grupourl, acierto + "/" + apariciones]).draw(false);
                    };
                    mostrar_gruposindefinidos(false);
                } else{
                    if(respuesta.length == 0){
                        while(gruposdefinidos.length > 0)
                            gruposdefinidos.pop();
                        mostrar_gruposindefinidos(true);
                    }
                }
            });
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }

        });
}

    //Elimina los espacios en blanco de principio y final de la cadena de texto
    function espaciosinifin(texto){
        var string = texto;
        var caracter;
        caracter = string.substr(0,1);
        while(caracter == " "){
            string = string.substr(1,string.length);
            caracter = string.substr(0,1);
        }
    
        caracter = string.substr(string.length-1,1);
        while(caracter == " "){
            string = string.substr(0,string.length-1);
            caracter = string.substr(string.length-1,1);
        }
    
        return string;
     };