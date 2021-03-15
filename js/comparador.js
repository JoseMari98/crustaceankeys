function iniciar(){
    //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
    taxones_creados();
    //document.getElementById('subgrupobox').style.display = 'none'; //que sea visible cuando
    document.getElementById('titulocoincidentes').style.display = 'none'; //que sea visible cuando
    //$('#titulodinamico2').html("Identificando: " + getGET()['grupo']);
 };

 var caracteristicas1 = [];
 var caracteristicas2 = [];
 var caracteristicas3 = [];
 var caracteristicascoincidentes = [];

 function taxones_creados(){
	$.ajax({
      url: '../php/comparador.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'taxonescreados'},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option selected='selected'>Seleccione un taxón</option>"
        for (var i = 0; i < respuesta.length; i++){      
            cadena += "<option>"+ respuesta[i][0].toString() +"</option>";
        };
        $("#taxon1").html(cadena);
        $("#taxon2").html(cadena);
        $("#taxon3").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  	});
};

function rellenar_caracteristicas(){
	var taxon1 = "'"+$("#taxon1 option:selected").text()+"'";
	var taxon2 = "'"+$("#taxon2 option:selected").text()+"'";
    var taxon3 = "'"+$("#taxon3 option:selected").text()+"'";
    document.getElementById('titulocoincidentes').style.display = 'block'; //que sea visible cuando
    caracteristicascoincidentes = [];

    if(taxon1 == "'Seleccione un taxón'" || taxon2 == "'Seleccione un taxón'"){
        alert("Debe especificar 2 taxones mínimo para comparar");
	}else{
        $.ajax({
            url: '../php/comparador.php',
            type: 'POST',
            async: false,
            dataType: 'json',
            data: {tipo: 'rellenartaxon', taxon: taxon1},
            success: function(respuesta){
                $("#titulodinamico1").html("Características únicas de: <em>" + $("#taxon1 option:selected").text() + "</em>");
                if(respuesta != null){
                    caracteristicas1 = respuesta.slice();
                    /*cadena += "<ul>";
                    for (var i = 0; i < respuesta.length; i++){      
                        cadena += "<li>" + respuesta[i]['caracteristica'].toString() + ": " + respuesta[i]['valor'].toString() + "</li>";
                    };
                    cadena += "</ul>";
                    $("#contenidotaxon1").html(cadena);*/
                }else{
                    //$("#contenidotaxon1").html("No hay características");
                    alert("El taxon " + $("#taxon1 option:selected").text() + " no tiene características");
                }
            },
            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                        }
    
            });
            
            $.ajax({
                url: '../php/comparador.php',
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {tipo: 'rellenartaxon', taxon: taxon2},
                success: function(respuesta){
                    $("#titulodinamico2").html("Características únicas de: <em>" + $("#taxon2 option:selected").text() + "</em>");
                    if(respuesta != null){
                        //cadena += "<ul>";
                        caracteristicas2 = respuesta.slice();
                        /*for (var i = 0; i < respuesta.length; i++){      
                            cadena += "<li>" + respuesta[i]['caracteristica'].toString() + ": " + respuesta[i]['valor'].toString() + "</li>";
                        };
                        cadena += "</ul>";
                        $("#contenidotaxon2").html(cadena);*/
                    }else{
                        $("#contenidotaxon2").html("No hay características");
                        alert("El taxon " + $("#taxon2 option:selected").text() + " no tiene características");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                            }
        
                });

        if(taxon3 != "'Seleccione un taxón'"){
            document.getElementById('caracteristicastaxon3').style.display = 'block';
            $.ajax({
                url: '../php/comparador.php',
                type: 'POST',
                async: false,
                dataType: 'json',
                data: {tipo: 'rellenartaxon', taxon: taxon3},
                success: function(respuesta){
                    //var cadena = "";
                    $("#titulodinamico3").html("Características únicas de: <em>" + $("#taxon3 option:selected").text() + "</em>");
                    if(respuesta != null){
                        //cadena += "<ul>";
                        caracteristicas3 = respuesta.slice();
                        /*for (var i = 0; i < respuesta.length; i++){      
                            cadena += "<li>" + respuesta[i]['caracteristica'].toString() + ": " + respuesta[i]['valor'].toString() + "</li>";
                        };
                        cadena += "</ul>";
                        $("#contenidotaxon3").html(cadena);*/
                    }else{
                        //$("#contenidotaxon3").html("No hay características");
                        alert("El taxon " + $("#taxon3 option:selected").text() + " no tiene características");
                    }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                            }
        
                });
                caracteristicasCoincidentes();
        }else{
            document.getElementById('caracteristicastaxon3').style.display = 'none'; //que sea visible cuando
            caracteristicas3 = null;
            caracteristicasCoincidentes();
        }
	}
};

function caracteristicasCoincidentes(){
    var caracteristicascoincidentesaux = [];
    var caracteristicas1aux = caracteristicas1.slice();
    var caracteristicas2aux = caracteristicas2.slice();

    for(var i = 0 ; i < caracteristicas1.length ; i++){
        var j = 0;
        var booleano = false;
        while(j < caracteristicas2.length && !booleano){
            if(caracteristicas1[i]['caracteristica'] == caracteristicas2[j]['caracteristica']){
                if(caracteristicas1[i]['valor'] == caracteristicas2[j]['valor']){
                    caracteristicascoincidentesaux.push(caracteristicas1[i]);
                    booleano = true;

                    var pos = caracteristicas1aux.indexOf(caracteristicas1[i]);
                    var pos2 = caracteristicas2aux.indexOf(caracteristicas2[j]);

                    if(pos !== -1)
                        caracteristicas1aux.splice(pos, 1);
                    if(pos2 !== -1)
                        caracteristicas2aux.splice(pos2, 1);
                }
            }
            j++;
        }
    }    

    caracteristicas1 = caracteristicas1aux.slice();
    caracteristicas2 = caracteristicas2aux.slice();

    if(caracteristicas3 != null){
        var caracteristicas3aux = caracteristicas3.slice();

        for(var i = 0 ; i < caracteristicas3.length ; i++){
            var j = 0;
            var booleano = false;
            while(j < caracteristicascoincidentesaux.length && !booleano){
                if(caracteristicas3[i]['caracteristica'] == caracteristicascoincidentesaux[j]['caracteristica']){
                    if(caracteristicas3[i]['valor'] == caracteristicascoincidentesaux[j]['valor']){
                        caracteristicascoincidentes.push(caracteristicas3[i]);
                        booleano = true;

                        var pos = caracteristicas3aux.indexOf(caracteristicas3[i]);

                        if(pos !== -1)
                            caracteristicas3aux.splice(pos, 1);
                    }
                }
                j++;
            }
        }    

        caracteristicas3 = caracteristicas3aux.slice();
        caracteristicas1aux = caracteristicas1.slice();

        for(var i = 0 ; i < caracteristicas3.length ; i++){
            var j = 0;
            var booleano = false;
            while(j < caracteristicas1.length && !booleano){
                if(caracteristicas3[i]['caracteristica'] == caracteristicas1[j]['caracteristica']){
                    if(caracteristicas3[i]['valor'] == caracteristicas1[j]['valor']){
                        var pos = caracteristicas1aux.indexOf(caracteristicas1[i]);
                        var pos2 = caracteristicas3aux.indexOf(caracteristicas3[i]);

                        if(pos !== -1)
                            caracteristicas1aux.splice(pos, 1);

                        if(pos2 !== -1)
                            caracteristicas3aux.splice(pos2, 1);
                    }
                }
                j++;
            }
        }
        caracteristicas1 = caracteristicas1aux.slice();
        caracteristicas3 = caracteristicas3aux.slice();

        caracteristicas2aux = caracteristicas2.slice();
        for(var i = 0 ; i < caracteristicas3.length ; i++){
            var j = 0;
            var booleano = false;
            while(j < caracteristicas2.length && !booleano){
                if(caracteristicas3[i]['caracteristica'] == caracteristicas2[j]['caracteristica']){
                    if(caracteristicas3[i]['valor'] == caracteristicas2[j]['valor']){
                        var pos = caracteristicas2aux.indexOf(caracteristicas2[i]);
                        var pos2 = caracteristicas3aux.indexOf(caracteristicas3[i]);

                        if(pos !== -1)
                            caracteristicas2aux.splice(pos, 1);

                        if(pos2 !== -1)
                            caracteristicas3aux.splice(pos2, 1);
                    }
                }
                j++;
            }
        }

        caracteristicas2 = caracteristicas2aux.slice();
        caracteristicas3 = caracteristicas3aux.slice();
    } else
        caracteristicascoincidentes = caracteristicascoincidentesaux.slice();

    if(caracteristicas1.length > 0){
        var cadena = "";
        cadena += "<ul>";
        for (var i = 0; i < caracteristicas1.length; i++){      
            cadena += "<li>" + caracteristicas1[i]['caracteristica'].toString() + ": " + caracteristicas1[i]['valor'].toString() + "</li>";
        };
        cadena += "</ul>";
        $("#contenidotaxon1").html(cadena);
    }else{
        $("#contenidotaxon1").html("No hay características únicas <br><br>");
    }

    if(caracteristicas2.length > 0){
        var cadena = "";
        cadena += "<ul>";
        for (var i = 0; i < caracteristicas2.length; i++){      
            cadena += "<li>" + caracteristicas2[i]['caracteristica'].toString() + ": " + caracteristicas2[i]['valor'].toString() + "</li>";
        };
        cadena += "</ul>";
        $("#contenidotaxon2").html(cadena);
    }else{
        $("#contenidotaxon2").html("No hay características únicas <br><br>");
    }

    if(caracteristicas3 != null && caracteristicas3.length > 0){
        var cadena = "";
        cadena += "<ul>";
        for (var i = 0; i < caracteristicas3.length; i++){      
            cadena += "<li>" + caracteristicas3[i]['caracteristica'].toString() + ": " + caracteristicas3[i]['valor'].toString() + "</li>";
        };
        cadena += "</ul>";
        $("#contenidotaxon3").html(cadena);
    }else{
        $("#contenidotaxon3").html("No hay características únicas <br><br>");
    }
    
    if(caracteristicascoincidentes.length > 0){
        var cadena = "";
        cadena += "<ul>";
        for (var i = 0; i < caracteristicascoincidentes.length; i++){      
            cadena += "<li>" + caracteristicascoincidentes[i]['caracteristica'].toString() + ": " + caracteristicascoincidentes[i]['valor'].toString() + "</li>";
        };
        cadena += "</ul>";
        $("#contenidocoincidente").html(cadena);
    }else{
        $("#contenidocoincidente").html("No hay características coincidentes <br><br>");
    }
};

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