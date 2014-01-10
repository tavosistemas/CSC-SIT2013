function openmodalmc(){
	$("input.osx").click();
}

/*function subirachivo() {
	
	$("#"+$("#slctipoarchivo").val()).remove();

	var arrfile = $("#file").val().split(".");

	if(arrfile.length > 2){
		alert("El nombre del archivo no debe contener puntos '.'");
		return false;
	}
	if($("#file").val() !=""){
		if(arrfile[1] =="PDF" || arrfile[1] =="pdf"){
			$("#contlistfiledig").append("<li>"+$("#file").val()+" ["+$("#slctipoarchivo").val()+"]"+"</li>");
			alert("La carga del archivo : ["+$("#slctipoarchivo").val()+"] " + $("#file").val() +" fue exitosa.");	
			$("#file").val("");
		}else{
			alert("El formato del archivo debe ser PDF");
		}
	}else{
		alert("Debe elegir un archivo de su computadora");
	}
	

	
		
}*/

/*function getrowform(){
	window.location = "diarform.html";
}*/

function gotoVisualizador(){
	window.location = "vistadocs.html";
}

function cargatipodocs(){
	$("#slctipoarchivo").empty();
	var html="<option id=\"SACC\" value=\"SACC\">Solicitud de Alta en Central de Carga</option>"+
									"<option id=\"SAD\" value=\"SAD\">Solicitud de Alta a la Aduana</option>"+
									"<option id=\"OPA\" value=\"OPA\">Oficio del Permiso de la Aduana</option>"+
									"<option id=\"AC\" value=\"AC\">Acta Constitutiva</option>"+
									"<option id=\"PTZN\" value=\"PTZN\">Protolización</option>"+
									"<option id=\"AH\" value=\"AH\">Alta en Hacienda</option>"+
									"<option id=\"CD\" value=\"CD\">Comprobante de Domicilio</option>"+
									"<option id=\"VD\" value=\"VD\">Verificación del Domicilio (F)</option>"+
									"<option id=\"UD\" value=\"UD\">Ultima Declaración</option>"+
									"<option id=\"CI\" value=\"CI\">Cédula de Identificación</option>"+
									"<option id=\"OSCT\" value=\"OSCT\">Oficio de la S.C.T (Expo por México/Asignación de Clave)</option>"+
									"<option id=\"TCP\" value=\"TCP\">Tarjeta de Circulación Permanente de la S.C.T.</option>"+
									"<option id=\"PVF\" value=\"PVF\">Parque Vehícular y sus filiales</option>"+
									"<option id=\"CDPV\" value=\"CDPV\">Comprobante de Domicilio del Parque Vehicular</option>"+
									"<option id=\"CF\" value=\"CF\">Control de Firmas</option>"+
									"<option id=\"COPI\" value=\"COPI\">Copia de Identificación</option>"+
									"<option id=\"CI\" value=\"CI\">Cédula de Identificación</option>"+
									"<option id=\"COMDOMFISC\" value=\"COMDOMFISC\">Comprobante de Domicilio Fiscal</option>"+
									"<option id=\"PODNOT\" value=\"PODNOT\">Poder Notariado</option>"+
									"<option id=\"COPI\" value=\"COPI\">Copia de Identificación</option>"+
									"<option id=\"CI\" value=\"CI\">Cédula de Identificación</option>"+
									"<option id=\"COMDOMFISC\" value=\"COMDOMFISC\">Comprobante de Domicilio Fiscal</option>";

	$("#slctipoarchivo").html(html);
}