var taxonesdescartados = [];
var posiblestaxones = new Array();
var taxonesTotales = [];
var historialCaracteristicas = [];
var posiblessubgrupos = [];
var gruposdescartados = [];
var gruposTotales = [];
var gruposindefinidosdin = [];
var caracteristicasTotales = [];

function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
    var gruposeleccionado = "'"+getGET()['grupo']+"'";
    $.ajax({
        url: '../phpadmin/c-dicotomica.php',
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
    $.ajax({
        url: '../php/dicotomica.php',
        async: false,
        type: 'POST',
        dataType: 'json',
        data: {tipo: 'caracteristicasGrupo', gruposeleccionado: gruposeleccionado},
        success: function(respuesta){
            console.log(respuesta);
            for(var i = 0 ; i < respuesta.length ; i++)
                caracteristicasTotales.push(respuesta[i]);
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }
    
        });
    taxones_recursivos(null, true);
    subgrupos_recursivos(null, true);
    taxonesIndefinidos();
    caracteristicas_creadas(null);
    $('#titulodinamico2').html("Identificando: " + getGET()['grupo']);
 };

 $(document).ready(function () {
    $('#tablahistorial').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ resultados",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "Historial vacío",
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
        columnDefs:[{
            targets: "_all",
            sortable: false
        }],
        ordering: false,
        "scrollY": "50vh",
        "searching": false,
        "lengthChange": false,
        "scrollCollapse": true,
        "bInfo" : false,
        "paging": false,
        /*"columns": [
            { "width": "20%" },
            null,
            { "width": "10%" },
          ],*/
        "pageLength": 200
    });
    $('.dataTables_length').addClass('bs-select');


    $('#posiblestaxones').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ resultados",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "No hay ningún taxón posible",
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
        /*"columns": [
            null,
            { "width": "20%" },
          ],*/
        "pageLength": 200
    });
    $('.dataTables_length').addClass('bs-select');


    $('#taxonesdescartados').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ resultados",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "No hay ningún taxón descartado",
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

    $('#taxonesindefinidos').DataTable({
        "language": {
            "sProcessing":     "Procesando...",
            "sLengthMenu":     "Mostrar _MENU_ resultados",
            "sZeroRecords":    "No se encontraron resultados",
            "sEmptyTable":     "No hay ningún taxón indefinido",
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
    });

    var table = $('#taxonesdescartados').DataTable();
    table.order( [ 2, 'desc' ] ).draw();

function getGET() {
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if(loc.indexOf('?')>0) {
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

$(document).ready(function() {
    var table = $('#tablahistorial').DataTable();
    
    $('#tablahistorial tbody').on( 'click', 'tr', function () {
        var caracteristicaSeleccionada = table.row( this ).data()[0];
        var pos = historialCaracteristicas.indexOf(caracteristicaSeleccionada);
        if((pos - 1) >= 0){
            padre = historialCaracteristicas[pos - 1];
        } else{
            padre = null;
        }

        historialCaracteristicas.splice(pos, historialCaracteristicas.length);

        var primerIndice = table.row(this).index();

        var i = table.data().count() - 1;
        while(primerIndice <= i){
            table.row(i).remove().draw();
            i--;
        }

        var t = $('#posiblestaxones').DataTable();
        t.clear().draw();

        var t2 = $('#taxonesdescartados').DataTable();
        t2.clear().draw();
        caracteristicas_creadas(padre);
    });
});

function taxonesIndefinidos(){
    var gruposeleccionado = "'" + getGET()['grupo'] + "'";
    var taxones = [];
    var taxones2 = [];
    var taxonesindefinidos = [];

    $.ajax({
        url: '../php/dicotomica.php',
        type: 'POST',
        async: false,
        dataType: 'json',
        data: {tipo: 'taxonesindefinidos', gruposeleccionado: gruposeleccionado},
        success: function(respuesta){
            taxones = respuesta;

        },
        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                        alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                    }

        });

        $.ajax({
            url: '../php/dicotomica.php',
            async: false,
            type: 'POST',
            dataType: 'json',
            data: {tipo: 'taxonesindefinidos2', gruposeleccionado: gruposeleccionado},
            success: function(respuesta){
                taxones2 = respuesta;
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                        }
    
            });

            for (var i = 0; i < taxones.length ; i++){ 
                var taxon = taxones[i][0];
                var j = 0;
                var encontrado = false;
                while(j < taxones2.length && !encontrado){
                    var taxon2 = taxones2[j][0];
                    if(taxon == taxon2)
                        encontrado = true;
                    j++;
                }
                if(!encontrado){
                    taxonesindefinidos.push(taxon);   
                }
            }

            $(document).ready(function() {
                var table = $('#taxonesindefinidos').DataTable();
                for (var i = 0; i < taxonesindefinidos.length ; i++){ 
                    var nombre = taxonesindefinidos[i];
                    var nombreurl = "<a target='_blank' href='http://crustaceankeys.uca.es/taxon.html?taxon=" + nombre + "'>" + nombre + "</a>";
                    table.row.add([nombreurl]).draw(false); 
                }
            });
}


function anadirCaracteristica(caracteristica){
    var valor = $("#" + caracteristica).html();
    var t = $('#tablahistorial').DataTable();
    var pos = historialCaracteristicas.indexOf(valor);
    if(pos == -1){
        historialCaracteristicas.push(valor);   
        //var nombreurl = '<a target="_blank" href="http://crustaceankeys.uca.es/taxon.html?taxon=' + nombre + '">' + nombre + '</a>'  
        t.row.add([valor]).draw(false); 
    }
    caracteristicas_creadas(valor);
}

function caracteristicas_creadas(caracteristicaSeleccionada){
    var gruposeleccionado = "'" + getGET()['grupo'] + "'";
	if(historialCaracteristicas.length == 0){
        taxones_recursivos(null, false);
        subgrupos_recursivos(null, false);
        taxonesLista();

		$.ajax({
        url: '../php/dicotomica.php',
        async:false,
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'primerascaracteristicas', gruposeleccionado: gruposeleccionado},
		success: function(respuesta){
            var cadena = "";
			if(respuesta != "No hay características para este grupo"){
				for (var i = 0; i < respuesta.length; i++){  
                    var cadenaImagen = "";  
                    $.ajax({
                        url: '../phpadmin/c-dicotomica.php',
                        async:false,
                        type: 'POST',
                        dataType: 'json',
                        data: {tipo: 'mostrarimagenes', caracteristicaseleccionada: respuesta[i][0].toString() + "-" + respuesta[i][1].toString() + "-" + respuesta[i][2].toString(), gruposeleccionado: gruposeleccionado},
                        success: function(respuestaImagen){
                            if(respuestaImagen != null){
                                for(var i = 0; i < respuestaImagen.length; i++){
                                    cadenaImagen+="<img id='10"+respuestaImagen[i]['id']+"' src='data:"+respuestaImagen[i]['tipo']+";base64,"+respuestaImagen[i]['imagen']+"' width='100%'/>";
                                }
                            }             
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                                  }
              
                        });

                    cadena += "<div id='caracteristica' style='width: 500px; border-style: inset; border-width: 1px; background-color: #bcbebf; padding: 5px; cursor: pointer' onclick='anadirCaracteristica(" 
                    + i + ")'>" + 
                    "<div id='" + i + "' style='color:#000000'>" + respuesta[i][0].toString() + "-" + respuesta[i][1].toString() + "-" + respuesta[i][2].toString() + "</div>" 
                    + cadenaImagen + "</div>";
                    
				};
				$("#caracteristicas").html(cadena);
			}else{
				alert(respuesta);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
						alert("Status: " + textStatus); alert("Error: " + errorThrown); 
					}

		});
	}else{
        var t = $('#posiblestaxones').DataTable();
        t.clear().draw();
        posiblestaxones = [];
        posiblessubgrupos = [];
        taxones_recursivos(caracteristicaSeleccionada, false);
        subgrupos_recursivos(caracteristicaSeleccionada, false);
        taxonesLista();

        var t2 = $('#taxonesdescartados').DataTable();
        t2.clear().draw();
        taxonesdescartados = [];
        gruposdescartados = [];
        subgrupos_descartados();
        taxones_descartados();

		$.ajax({
        url: '../php/dicotomica.php',
        async: false,
		type: 'POST',
		dataType: 'json',
		data: {tipo: 'caracteristicashijas', gruposeleccionado: gruposeleccionado, caracteristicaSeleccionada: caracteristicaSeleccionada},
		success: function(respuesta){
			var cadena = "";
			if(respuesta != "No hay características para este grupo"){
				for (var i = 0; i < respuesta.length; i++){      
                    var cadenaImagen = "";  
                    $.ajax({
                        url: '../phpadmin/c-dicotomica.php',
                        async:false,
                        type: 'POST',
                        dataType: 'json',
                        data: {tipo: 'mostrarimagenes', caracteristicaseleccionada: respuesta[i][0].toString() + "-" + respuesta[i][1].toString() + "-" + respuesta[i][2].toString(), gruposeleccionado: gruposeleccionado},
                        success: function(respuestaImagen){
                            if(respuestaImagen != null){
                                for(var i = 0; i < respuestaImagen.length; i++){
                                    cadenaImagen+="<img id='"+respuestaImagen[i]['id']+"' src='data:"+respuestaImagen[i]['tipo']+";base64,"+respuestaImagen[i]['imagen']+"' width='100%'/>";
                                }
                            }             
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                      alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                                  }
              
                        });

                    cadena += "<div id='caracteristica' style='width: 500px; padding: 5px; border-style: inset; border-width: 1px; background-color: #bcbebf; cursor: pointer' onclick='anadirCaracteristica(" 
                    + i + ")'>" + 
                    "<div id='" + i + "' style='color:#000000'>" + respuesta[i][0].toString() + "-" + respuesta[i][1].toString() + "-" + respuesta[i][2].toString() + "</div>" 
                    + cadenaImagen + "</div>";
				};
				$("#caracteristicas").html(cadena);
			}else{
                //buscartaxon
                var flag = false;
                $.ajax({
                    url: '../php/dicotomica.php',
                    async:false,
                    type: 'POST',
                    dataType: 'json',
                    data: {tipo: 'taxonhijo', gruposeleccionado: gruposeleccionado, caracteristicaSeleccionada: caracteristicaSeleccionada},
                    success: function(respuesta){
                        var cadena = "";
                        if(respuesta != "No hay taxon para este grupo"){
                            flag = true;
                            cadena += "<div id='caracteristica' style='width: 500px; padding: 5px; border-style: inset; border-width: 1px; background-color: #bcbebf;'>" + 
                            "<a target='_blank' style='color:#000000' href='http://crustaceankeys.uca.es/taxon.html?taxon=" + respuesta + "'>" 
                            + respuesta + "</a>" + "</div>";
                            $("#caracteristicas").html(cadena);
                        }
                    },
                    error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                                }
            
                    });
                    
                    if(!flag){
                        $.ajax({
                            url: '../php/dicotomica.php',
                            async:false,
                            type: 'POST',
                            dataType: 'json',
                            data: {tipo: 'subgrupohijo', gruposeleccionado: gruposeleccionado, caracteristicaSeleccionada: caracteristicaSeleccionada},
                            success: function(respuesta){
                                if(respuesta != "No hay subgrupo para este grupo"){
                                    var nombre = respuesta['subgrupo']; 
                                    cadena += "<div id='caracteristica' style='width: 500px; padding: 5px; border-style: inset; border-width: 1px; background-color: #bcbebf;'>" + 
                                    "<a target='_blank' style='color:#000000' href='http://crustaceankeys.uca.es/dicotomica.html?grupo=" + nombre + "'>" 
                                    + nombre + "</a>" + "</div>";
                                    $("#caracteristicas").html(cadena);
                                }
                            },
                            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                                        }
                    
                            });
                    }
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) { 
						alert("Status: " + textStatus); alert("Error: " + errorThrown); 
					}

		});
	}
};

function taxones_recursivos(caracteristicaPadre, primera){ //buscar todos los taxones que estan asociados
    if(caracteristicaPadre != null){
        var caracteristicaPadre = caracteristicasTotales.find( caracteristica => (caracteristica.nivel === caracteristicaPadre.split("-")[0] && caracteristica.opcion === caracteristicaPadre.split("-")[1]));
        if(caracteristicaPadre['taxon'] != null){
            var nombre = caracteristicaPadre['taxon']; 
            var pos = posiblestaxones.indexOf(nombre);
            if(pos == -1){
                if(primera)
                    taxonesTotales.push(nombre);
                posiblestaxones.push(nombre);   
            }
        }

        var caracteristicasHijas = caracteristicasTotales.filter( caracteristica => caracteristica.padre === caracteristicaPadre['id']);
        for (var i = 0; i < caracteristicasHijas.length; i++){
            if(caracteristicasHijas[i]['taxon'] != null){
                var nombre = caracteristicasHijas[i]['taxon']; 
                var pos = posiblestaxones.indexOf(nombre);
                if(pos == -1){
                    if(primera)
                        taxonesTotales.push(nombre);
                    posiblestaxones.push(nombre);   
                }
            }
            taxones_recursivos(caracteristicasHijas[i]['nivel'] + "-" + caracteristicasHijas[i]['opcion'] + "-" + caracteristicasHijas[i]['caracteristica'], primera);
        }
    } else{
        var caracteristicasHijas = caracteristicasTotales.filter( caracteristica => caracteristica.nivel === "1");
        for (var i = 0; i < caracteristicasHijas.length; i++){
            taxones_recursivos(caracteristicasHijas[i]['nivel'] + "-" + caracteristicasHijas[i]['opcion'] + "-" + caracteristicasHijas[i]['caracteristica'], primera);
        }
    }
                
}

function subgrupos_recursivos(caracteristicaPadre, primera){ //buscar todos los grupos asociados
    if(caracteristicaPadre != null){
        var caracteristicaPadre = caracteristicasTotales.find( caracteristica => (caracteristica.nivel === caracteristicaPadre.split("-")[0] && caracteristica.opcion === caracteristicaPadre.split("-")[1]));
        if(caracteristicaPadre['subgrupo'] != null){
            var nombre = caracteristicaPadre['subgrupo']; 
            var pos = posiblessubgrupos.indexOf(nombre);
            if(pos == -1){
                if(primera)
                    gruposTotales.push(nombre);
                posiblessubgrupos.push(nombre);   
            }
        }

        var caracteristicasHijas = caracteristicasTotales.filter( caracteristica => caracteristica.padre === caracteristicaPadre['id']);
        for (var i = 0; i < caracteristicasHijas.length; i++){
            if(caracteristicasHijas[i]['subgrupo'] != null){
                var nombre = caracteristicasHijas[i]['subgrupo']; 
                var pos = posiblessubgrupos.indexOf(nombre);
                if(pos == -1){
                    if(primera)
                        gruposTotales.push(nombre);
                    posiblessubgrupos.push(nombre);   
                }
            }
            subgrupos_recursivos(caracteristicasHijas[i]['nivel'] + "-" + caracteristicasHijas[i]['opcion'] + "-" + caracteristicasHijas[i]['caracteristica'], primera);
        }
    } else{
        var caracteristicasHijas = caracteristicasTotales.filter( caracteristica => caracteristica.nivel === "1");
        for (var i = 0; i < caracteristicasHijas.length; i++){
            subgrupos_recursivos(caracteristicasHijas[i]['nivel'] + "-" + caracteristicasHijas[i]['opcion'] + "-" + caracteristicasHijas[i]['caracteristica'], primera);
        }
    }
}

function taxonesLista(){
    $(document).ready(function() {
        var t = $('#posiblestaxones').DataTable();
        for (var i = 0; i < posiblestaxones.length; i++){ 
            var nombre = posiblestaxones[i]; 
            var nombreurl = "<a target='_blank' href='http://crustaceankeys.uca.es/taxon.html?taxon=" + nombre + "'>" + nombre + "</a>";
            t.row.add([nombreurl]).draw(false); 
        }

        for (var i = 0; i < posiblessubgrupos.length; i++){ 
            var nombre = posiblessubgrupos[i]; 
            var nombreurl = "<a target='_blank' href='http://crustaceankeys.uca.es/dicotomica.html?grupo=" + nombre + "'>" + nombre + "</a>";
            t.row.add([nombreurl]).draw(false); 
        }
    });
}

function taxones_descartados(){
    for (var i = 0; i < taxonesTotales.length ; i++){ 
        var taxon = taxonesTotales[i];
        var j = 0;
        var encontrado = false;
        while(j < posiblestaxones.length && !encontrado){
            var taxon2 = posiblestaxones[j];
            if(taxon == taxon2)
                encontrado = true;
            j++;
        }
        if(!encontrado){
            taxonesdescartados.push(taxon);   
        }
    }

    $(document).ready(function() {
        var t = $('#taxonesdescartados').DataTable();
        for (var i = 0; i < taxonesdescartados.length ; i++){ 
            var taxon = taxonesdescartados[i];
            var nombreurl = "<a target='_blank' href='http://crustaceankeys.uca.es/taxon.html?taxon=" + taxon + "'>" + taxon + "</a>";
            t.row.add([nombreurl]).draw(false);
        }
    });
}

function subgrupos_descartados(){
    for (var i = 0; i < gruposTotales.length ; i++){ 
        var subgrupo = gruposTotales[i];
        var j = 0;
        var encontrado = false;
        while(j < posiblessubgrupos.length && !encontrado){
            var subgrupo2 = posiblessubgrupos[j];
            if(subgrupo == subgrupo2)
                encontrado = true;
            j++;
        }
        if(!encontrado){
            gruposdescartados.push(subgrupo);   
        }
    }

    $(document).ready(function() {
        var t = $('#taxonesdescartados').DataTable();
        for (var i = 0; i < gruposdescartados.length ; i++){ 
            var grupo = gruposdescartados[i];
            var nombreurl = "<a target='_blank' href='http://crustaceankeys.uca.es/dicotomica.html?grupo=" + grupo + "'>" + grupo + "</a>";
            t.row.add([nombreurl]).draw(false);
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