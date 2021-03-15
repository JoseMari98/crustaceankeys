function iniciar(){
   //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
  var editordescription = $("#description").Editor({'togglescreen':false, 'source':false, 'insert_img':false});
  var editorsynonyms = $("#synonyms").Editor({'togglescreen':false, 'source':false, 'insert_img':false});
  var editorbiology = $("#biology").Editor({'togglescreen':false, 'source':false, 'insert_img':false});
  rellenar_agregar();
};

function rellenar_agregar(){
  //Busca las posibles clasificaciones de los taxones y los coloca en una caja de selección
  $.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'taxonesbox'},
      success: function(respuesta){
        var  cadena = "";
        for (var i = 0; i < respuesta.length; i++){      
            cadena += " <option>"+ respuesta[i][0].toString() +"</option>";
        };
        $("#taxonesbox").html(cadena);
        rellenar_padres();
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  });

};
//Rellena la caja de seleccion de los padres posibles según la clasificación taxonómica seleccionada
function rellenar_padres(){
  $("#fatherclassbox").html("");
  var tipotaxon = $("#taxonesbox option:selected").text();
  $.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: {tipo: 'fatherclassbox', taxon: tipotaxon},
      success: function(respuesta){
        var  cadena = "";
        cadena += "<option>Seleccione un taxón padre</option>";
        if(respuesta[0] != null){
          for (var i = 0; i < respuesta.length; i++){
            
              cadena += "<option>"+ respuesta[i][1].toString() +" "+ respuesta[i][0].toString() +"</option>";

          };
        }
        $("#fatherclassbox").html(cadena);
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

  });

};

function insertar_taxon(){
  if(espaciosinifin($("#name").val())!= ""){
    var name = "'"+espaciosinifin($("#name").val())+"'";
    var tipotaxon = "'"+$("#taxonesbox option:selected").text()+"'";
    
    var description = "'"+$('#description').Editor("getText")+"'"; // Forma especial para obtener texto del cuadro de texto del pluging EDITOR
    var fatherclassbox = "'"+$("#fatherclassbox option:selected").text()+"'";
    if(fatherclassbox == "'Seleccione un taxón padre'"){
      fatherclassbox = "null";
    }else{
      var clasen = "'"+fatherclassbox.substring(fatherclassbox.indexOf(" ")+1,fatherclassbox.length);
      fatherclassbox = clasen;
    }
    var synonyms = "'"+$("#synonyms").Editor("getText")+"'";
    var biology = "'"+$("#biology").Editor("getText")+"'";

    var data = {tipo: 'agregartaxon', tipotaxon: tipotaxon, name: name, description: description, fatherclassbox: fatherclassbox, synonyms:synonyms, biology:biology}
    
    $.ajax({
      url: '../phpadmin/c-taxones.php',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(respuesta){
        if(respuesta == "Se ha insertado el taxón."){
              $("#name").val("");
              $('#description').Editor("setText", ""); 
              $('#synonyms').Editor("setText", "");
              $("#taxonesbox").html("");
              $("#fatherclassbox").html("");
              rellenar_agregar();
        }
        alert(respuesta);
        
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

    });
  }else{
    alert("Debe especificar el nombre del taxon para poder insertarlo.");
  };

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
