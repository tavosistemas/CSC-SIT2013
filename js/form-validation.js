jQuery(document).ready(function($) {

	// hide messages 
	$("#error").hide();
	$("#exito").hide();
	$("#success").hide();
	
	// on submit...
	$("#contactForm #submit").click(function() {
		$("#error").hide();
		
		//required:
		
		//name
		var razonsocial = $("input#razonsocial").val();
		if(razonsocial == ""){
			$("#error").fadeIn().text("Campo Razon Social requerido.");
			$("input#razonsocial").focus();
			return false;
		}
		
		// email
		var rfc = $("input#rfc").val();
		if(rfc == ""){
			$("#rfc").fadeIn().text("RFC requerido");
			$("input#rfc").focus();
			return false;
		}
		
		// web
		var fecharegistro = $("input#fecharegistro").val();
		if(fecharegistro == ""){
			$("#error").fadeIn().text("Fecha de Registro requerida");
			$("input#fecharegistro").focus();
			return false;
		}
		
		var nombrerepresentante = $("input#nombrerepresentante").val();
		if(nombrerepresentante == ""){
			$("#error").fadeIn().text("Nombre del Representante requerido");
			$("input#nombrerepresentante").focus();
			return false;
		}

		var telefono = $("input#telefono").val();
		if(telefono == ""){
			$("#error").fadeIn().text("Teléfono requerido");
			$("input#telefono").focus();
			return false;
		}

		var direccion = $("input#direccion").val();
		if(direccion == ""){
			$("#error").fadeIn().text("Dirección requerida");
			$("input#direccion").focus();
			return false;
		}
		
		success();		
		// comments
		//var comments = $("#comments").val();
		
		// send mail php
		//var sendMailUrl = $("#sendMailUrl").val();
		
		//to, from & subject
		var to = $("#to").val();
		var from = $("#from").val();
		var subject = $("#subject").val();
		
		// data string
		/*var dataString = 'name='+ name
						+ '&email=' + email        
						+ '&web=' + web
						+ '&comments=' + comments
						+ '&to=' + to
						+ '&from=' + from
						+ '&subject=' + subject;						         */
		// ajax
		/*$.ajax({
			type:"POST",
			url: sendMailUrl,
			data: dataString,
			success: success()
		});*/
	});  
		
		
	// on success...
	 function success(){
		$("#exito").fadeIn().text("Se ha guardado su información");

	 	/*$("#success").fadeIn();
	 	$("#contactForm").fadeOut();*/
	 }
	
    return false;
});

