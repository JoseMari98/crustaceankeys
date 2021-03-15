function iniciar(){
   //Se inicializa los cuadros de textos enriquecidos del pluging EDITOR
  var editordefinicion = $("#definicion").Editor({'togglescreen':false, 'source':false, 'insert_img':false});
};


function insertar_termino(){
  if(espaciosinifin($("#name").val())!= ""){
    var name = "'"+espaciosinifin($("#name").val())+"'";
    
    var definicion = "'"+$('#definicion').Editor("getText")+"'"; // Forma especial para obtener texto del cuadro de texto del pluging EDITOR

    var data = {tipo: 'agregartermino', name: name, definicion: definicion}
    
    $.ajax({
      url: '../phpadmin/c-terminos.php',
      type: 'POST',
      dataType: 'json',
      data: data,
      success: function(respuesta){
        if(respuesta == "Se ha insertado el termino $name en el Glosario."){
              $("#name").val("");
              $('#definicion').Editor("setText", ""); 
			limpiarFormulario();
		}
        alert(respuesta);
        
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) { 
                    alert("Status: " + textStatus); alert("Error: " + errorThrown); 
                }

    });
  }else{
    alert("Debe especificar el nombre del termino para poder insertarlo.");
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

function limpiarFormulario(){
    document.getElementById("#agregarterminoform").reset();
  };