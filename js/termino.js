var slideIndex = 1;
function iniciar(){
	mostrartermino();
	mostrarDefinicion();
}
//recoger datos por url
function getGET()
{
    // capturamos la url
    var loc = document.location.href;
    // si existe el interrogante
    if(loc.indexOf('?')>0)
    {
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
function mostrartermino(){
    // Cogemos los valores pasados por get
    var valores=getGET();
    if(valores)
    {
        //recogemos los valores que nos envia la URL en variables para trabajar con ellas
        var termino = valores['termino'];

        $.ajax({
	      url: 'php/glosario-crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrartermino', termino: termino},
	      success: function(respuesta){
	        var  galeria = "";
	        var  minigaleria = "";
	        var contador=1;
	        if(respuesta != null){
		        for(var i = 0; i < respuesta.length; i++){
		        	
		        	galeria += "<div class='mySlides'>";
		        	galeria += "<div class='numbertext'>"+(i+1)+" / "+respuesta.length+"</div>";
		        	galeria += "<img id='"+(i+1)+"' onclick='ponergrande("+(i+1)+")' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;'>";
					galeria += "</div>";
					if(contador % 6 === 0 && contador != 0){
						minigaleria += "<div class='column'>";
		        		minigaleria += "<img class='demo cursor' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;' onclick='currentSlide("+(i+1)+")' alt='"+respuesta[i]['nombre']+"'>";
		        		minigaleria += "</div>";
		        		minigaleria += "<div style='clear: both;'></div>"
					}else{
						minigaleria += "<div class='column'>";
		        		minigaleria += "<img class='demo cursor' src='data:"+respuesta[i]['tipo']+";base64,"+respuesta[i]['imagen']+"' style='width:100%;' onclick='currentSlide("+(i+1)+")' alt='"+respuesta[i]['nombre']+"'>";
		        		minigaleria += "</div>";
					}
		        	
		        	contador++;
	    		}
	    		galeria+= "<a class='prev' onclick='plusSlides(-1)'>&#10094;</a>";
				galeria+= "<a class='next' onclick='plusSlides(1)''>&#10095;</a>";
				$("#galeria").html(galeria);
				$("#minigaleria").html(minigaleria);	
				showSlides(1);	
	    	}else{
	    		var captionText = document.getElementById("caption");
	    		captionText.innerHTML = "No hay imágenes disponibles para término.";
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});     
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarDefinicion(){
	$("#definicion").addClass("active");
	var valores=getGET();
    if(valores){
    	var termino = valores['termino'];
    	$.ajax({
	      url: 'php/glosario-crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarDefinicion', termino: termino},
	      success: function(respuesta){
	        var  contenido = "";
	        
	    		$("#nombretermino").html("<h2 style='margin: 20px 0px;'>"+respuesta[0]['name']+"</h2>");
	  
	        if(respuesta[0]['definicion'] != ""){
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= respuesta[i]['definicion'];
	    		}
				$("#contenido").html(contenido);
				
	    	}else{
	    		$("#contenido").html("No hay ninguna definición disponible.");
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarClassification(){
	$("#description").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#literature").removeClass("active");
	$("#biology").removeClass("active");
	$("#classification").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarClassification', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";
	        if(respuesta != null){
		        for(var i = respuesta.length-1; i > -1; i--){
		        	var taxonseleccionado = respuesta[i].substring(respuesta[i].indexOf(" ")+1,respuesta[i].length);
		        	contenido+= "<div><a href='taxon.html?taxon="+taxonseleccionado+"'>"+respuesta[i]+"</a></div>";
		        	
	    		}
				$("#contenido").html(contenido);
	    	}else{
	    		$("#contenido").html("No hay ninguna descripción disponible.");
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarSynonyms(){
	$("#classification").removeClass("active");
	$("#description").removeClass("active");
	$("#literature").removeClass("active");
	$("#biology").removeClass("active");
	$("#synonyms").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarSynonyms', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";

	        if(respuesta[0]['synonyms'] != ""){
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= respuesta[i]['synonyms'];
	    		}
				$("#contenido").html(contenido);
	    	}else{
	    		$("#contenido").html("No hay ningun sinónimo disponible.");
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarLiterature(){
	$("#classification").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#description").removeClass("active");
	$("#biology").removeClass("active");
	$("#literature").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarLiterature', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";

	        if(respuesta[0]['literature'] != ""){
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= "<p style='text-align: justify; margin-right: 0px; margin-bottom: 0px; margin-left: 0px; font-stretch: normal; line-height: normal; font-size: large; font-family: Times; color: rgb(79, 79, 79);'>"+respuesta[i]['literature']+"</p>";
	    		}
				$("#contenido").html(contenido);
	    	}else{
	    		$("#contenido").html("No hay ninguna literatura disponible.");
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}

function mostrarBiology(){
	$("#classification").removeClass("active");
	$("#description").removeClass("active");
	$("#literature").removeClass("active");
	$("#synonyms").removeClass("active");
	$("#biology").addClass("active");
	var valores=getGET();
    if(valores){
    	var taxon = valores['taxon'];
    	$.ajax({
	      url: 'php/crustacean-keys.php',
	      type: 'POST',
	      dataType: 'json',
	      data: {tipo: 'mostrarBiology', taxon: taxon},
	      success: function(respuesta){
	        var  contenido = "";

	        if(respuesta[0]['biology'] != 'null' && respuesta[0]['biology'] != ""){
		        for(var i = 0; i < respuesta.length; i++){
		        	contenido+= respuesta[i]['biology'];
	    		}
				$("#contenido").html(contenido);
	    	}else{
	    		$("#contenido").html("No hay ninguna biología disponible.");
	    	}
	      },
	      error: function(XMLHttpRequest, textStatus, errorThrown) { 
	                    // alert("Status: " + textStatus); alert("Error: " + errorThrown); 
	                }
	  	});
    }else{
        // no se ha recibido ningun parametro por GET
           location.href ="index.html";

    }
}


// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("mySlides");
  var dots = document.getElementsByClassName("demo");
  var captionText = document.getElementById("caption");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
  captionText.innerHTML = dots[slideIndex-1].alt;
}

function ponergrande(id){
	var modal = document.getElementById('myModal');

	// Get the image and insert it inside the modal - use its "alt" text as a caption
	var img = document.getElementById(id);
	var modalImg = document.getElementById("img01");
	var captionText = document.getElementById("imagetext");
    modal.style.display = "block";
    modalImg.src = img.src;
    // captionText.html($("#contenido").html());
}




// When the user clicks on <span> (x), close the modal
function cerrarmodal(){
	var span = document.getElementsByClassName("close")[0];
	var modal = document.getElementById('myModal');
  	modal.style.display = "none";
}
