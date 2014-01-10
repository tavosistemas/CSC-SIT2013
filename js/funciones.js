function openmodalmc(){
    $("input.osx").click();
}

function subirachivo() {
    
	
/*var docscargados = $.cookie("docscargados") +"|"+$("#slctipoarchivo").val();
	
	$.cookie("docscargados",docscargados);

	var tipoarchivo=$("#slctipoarchivo").val();
	$("#"+$("#slctipoarchivo").val()).remove();

	var arrfile = $("#file").val().split(".");
	//alert(arrfile.length);
	if(arrfile.length > 2){
		alert("El nombre del archivo no debe contener puntos '.'");
		return false;
	}
	if($("#file").val() !=""){
		if(arrfile[1] =="PDF" || arrfile[1] =="pdf"){
			$("#contlistfiledig").append("<li>"+$("#file").val()+" ["+$("#slctipoarchivo").val()+"]"+"</li>");
			cargatipodocsconsulta();
			alert("La carga del archivo : ["+tipoarchivo+"] " + $("#file").val() +" fue exitosa.");	
			$("#file").val("");
		}else{
			alert("El formato del archivo debe ser PDF");
		}
	}else{
		alert("Debe elegir un archivo de su computadora");
	}
	*/
	
	

	
		
}

function getrowform(id){
    
    $.cookie("idTransp",id);
    
    window.location = "diarform.html";
    
}

function gotoVisualizador(){
    window.location = "vistadocs.html";
    
    
}

function getDocsGaleria(){
    //$.get("showGaleria.jsp?rfc="+$.cookie("rfccte")+"&opt=show", function(data) {
    $.get("funcsrvs?rfc="+$.cookie("rfccte")+"&oper=showgaleria", function(data) {
	
	$("#pikame").html(data);
	
	var preventStageHoverEffect = function(self){
	    self.wrap.unbind('mouseenter').unbind('mouseleave');
	    self.imgNav.append('<a class="tray"></a>');
	    self.imgNav.show();
	    self.hiddenTray = true;
	    self.imgNav.find('.tray').bind('click',function(){
		if(self.hiddenTray){
		    self.list.parents('.jcarousel-container').animate({
			height:"80px"
		    });
		}else{
		    self.list.parents('.jcarousel-container').animate({
			height:"1px"
		    });
		}
		self.hiddenTray = !self.hiddenTray;
	    });
	}
	$("#pikame").PikaChoose({
	    bindsFinished: preventStageHoverEffect, 
	    carousel:true
	});
    });
     
    
/*$.ajax({
	type: "POST",
	url: "showGaleria.jsp",
	dataType:"json",
	data: {
	    opt:"show",
	    rfc:$.cookie("rfccte")
	},
	async : false,
	success : function(data){
	    alert(data);
                    
	}

    });*/
}
function getdatos(){
    
   //alert($.cookie("idTransp"));
    
    $.ajax({
	type: "POST",
	url: "funcsrvs",
	//url: "fncs_transportista.jsp",
	dataType:"json",
	data: {
	    oper:"getDatosTransportista",
	    id:$.cookie("idTransp")
	},
	async : false,
	success : function(data){
	    $(".n-comments").empty();
	    $(".n-comments").html(data.idtransportista);
	    $("#razonsocial").val(data.razon);
	    $("#rfc").val(data.rfc);
	    $("#fecharegistro").val(data.fecharegistro);
	    $("#nombrerepresentante").val(data.representante);
	    $("#telefono").val(data.telefono);
	    $("#direccion").val(data.direccion);    
	    
	}

    });
    
    $.cookie("docscargados","");
    
    $("#razonsocial").attr("disabled","true");
    $("#rfc").attr("disabled","true");
    $("#fecharegistro").attr("disabled","true");
    $("#nombrerepresentante").attr("disabled","true");
    $("#telefono").attr("disabled","true");
    $("#direccion").attr("disabled","true");
    $("#anular").hide();
    
    fncbtncargados();
    
    $.cookie("rfccte",$("#rfc").val());
    
    //$.get("getDocumentos.jsp?rfc="+$.cookie("rfccte")+"&oper=faltadocs", function(data) {
    $.get("funcsrvs?rfc="+$.cookie("rfccte")+"&oper=faltadocs", function(data) {
	$("#slctipoarchivocons").html(data);
    });
    
/*$.ajax({
	type: "POST",
	url: "getDocumentos.jsp",
	dataType:"json",
	data: {
	    opt:"falta",
	    rfc:$("#rfc").val()
	},
	async : false,
	success : function(data){
	    alert(data);
	    $("#slctipoarchivocons").empty();
	    $("#slctipoarchivocons").html(data);

                    
	}

    });*/
}

function getDocumentosConsulta(){
    $.get("funcsrvs?rfc="+$.cookie("rfccte")+"&oper=faltadocs", function(data) {
	$("#slctipoarchivocons").html(data);
    });
}

function fncbtncargados(){
    
    var rfc=$("#rfc").val();
    var tipoarchivo=$("#slctipoarchivo").val();
    var numtransp=$(".n-comments").html();
    var aduana="aduana";
    var usuario="usr";
    
    var button = $('#subirarchivo'), interval;
    
    alert("1: "+tipoarchivo);
    
    new AjaxUpload(button,{
	
            
	action:'SubirPDF.jsp?rfc='+rfc+"&tipoarchivo="+tipoarchivo+"&numtransp="+numtransp+"&aduana="+aduana+"&usuario="+usuario,
	//action:'subir.jsp?rfc='+rfc+"&tipoarchivo="+tipoarchivo+"&numtransp="+numtransp+"&aduana="+aduana+"&usuario="+usuario,
	name: 'myfile',
            
	onSubmit : function(file, ext){
                
	    button.text('Transfiriendo');
	    btnloadpdf();
                
	    if (! (ext && /^(pdf|PDF)$/i.test(ext))){
		showMessg('Error: Archivo con extensión invalida. Solo son validas las siguientes extensiones [.pdf]');
		button.text('Buscar Archivo...');
		return false;
	    }
		
	},

	onComplete: function(file, response){
	    getDocumentosConsulta();
	    $("#panelimages").load("loadPDF.jsp?rfc="+rfc);
	    cargatipodocsconsulta();
	    $("#slctipoarchivocons").html("");
	    $.get("funcsrvs?rfc="+$.cookie("rfccte")+"&oper=faltadocs", function(data) {
		//alert(data);
		$("#slctipoarchivocons").html(data);
		btnloadpdf();
	    });
	    //$("#panelimages").load("loadimages.jsp?rfc="+rfc);
	    $.get("loadPDF.jsp?rfc="+rfc, function(data) {
	    //$.get("loadimages.jsp?rfc="+rfc, function(data) {
		$("#panelimages").html(data);
	    });
	    button.text('Buscar Archivo...');
	    fncbtncargados();
	    rfc=$("#rfc").val();
	    tipoarchivo=$("#slctipoarchivo").val();
	    numtransp=$(".n-comments").html();
	    aduana="aduana";
	    usuario="usr";
	     
	}

    });
    
    
    
    /*var rfc=$("#rfc").val();
    var tipoarchivo=$("#slctipoarchivo").val();
    var numtransp=$(".n-comments").html();
    var aduana="aduana";
    var usuario="usr";
    
    var button = $('#subirarchivo'), interval;

    new AjaxUpload(button,{
            
	action:'subir.jsp?rfc='+rfc+"&tipoarchivo="+tipoarchivo+"&numtransp="+numtransp+"&aduana="+aduana+"&usuario="+usuario,
	name: 'myfile',
            
	onSubmit : function(file, ext){
                
	    button.text('Transfiriendo');
                
	    if (! (ext && /^(pdf|PDF)$/i.test(ext))){
		showMessg('Error: Archivo con extensión invalida. Solo son validas las siguientes extensiones [.pdf]');
		button.text('Buscar Archivo...');
		return false;
	    }
		
	},

	onComplete: function(file, response){
	    $("#panelimages").load("loadimages.jsp?rfc="+rfc);
	    $.get("loadimages.jsp?rfc="+rfc, function(data) {
		$("#panelimages").html(data);
	    });
	    button.text('Buscar Archivo...');
	}

    });*/
    
    	
   
}

function btnloadpdf(){
      
      $.cookie("rfcaptura",$("#rfc").val());
      $.cookie("tipoarchivocaptura",$("#slctipoarchivo").val());
      $.cookie("numtranspcaptura",$(".n-comments").html());
      $.cookie("usrcaptura","usr");
      
    var rfc=$("#rfc").val();
    var tipoarchivo=$("#slctipoarchivo").val();
    var numtransp=$(".n-comments").html();
    var aduana="aduana";
    var usuario="usr";
      
    var button = $('#subirarchivo'), interval;
    
    alert("2: "+tipoarchivo);    
    
    new AjaxUpload(button,{
	
            
	action:'SubirPDF.jsp?rfc='+rfc+"&tipoarchivo="+tipoarchivo+"&numtransp="+numtransp+"&aduana="+aduana+"&usuario="+usuario,
	//action:'subir.jsp?rfc='+rfc+"&tipoarchivo="+tipoarchivo+"&numtransp="+numtransp+"&aduana="+aduana+"&usuario="+usuario,
	name: 'myfile',
            
	onSubmit : function(file, ext){
                
	    button.text('Transfiriendo');
	    btnloadpdf();
                
	    if (! (ext && /^(pdf|PDF)$/i.test(ext))){
		showMessg('Error: Archivo con extensión invalida. Solo son validas las siguientes extensiones [.pdf]');
		button.text('Buscar Archivo...');
		return false;
	    }
		
	},

	onComplete: function(file, response){
	    getDocumentosConsulta();
	    $("#panelimages").load("loadPDF.jsp?rfc="+rfc);
	    cargatipodocsconsulta();
	    $("#slctipoarchivocons").html("");
	    $.get("funcsrvs?rfc="+$.cookie("rfccte")+"&oper=faltadocs", function(data) {
		//alert(data);
		$("#slctipoarchivocons").html(data);
		btnloadpdf();
	    });
	    //$("#panelimages").load("loadimages.jsp?rfc="+rfc);
	    $.get("loadPDF.jsp?rfc="+rfc, function(data) {
	    //$.get("loadimages.jsp?rfc="+rfc, function(data) {
		$("#panelimages").html(data);
	    });
	    button.text('Buscar Archivo...');
	    fncbtncargados();
	    rfc=$("#rfc").val();
	    tipoarchivo=$("#slctipoarchivo").val();
	    numtransp=$(".n-comments").html();
	    aduana="aduana";
	    usuario="usr";
	     
	}

    });
    
     
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
function consimg(){
    $.get("getConsultaDocumentosImgs.jsp?rfc="+$("#rfc").val()+"&tipodoc="+$("#slctipoarchivocons").val()+"&ntransp="+$(".n-comments").html(), function(data) {
	$("#divimgcons").html(data);
    });
}

function funcionestransp(){
    
    getTransportistas();
}

function getTransportistas(){
    
        var windowWidth = (document.documentElement.clientWidth - 200) / 1;
	
        $("#gridTransportista").tsGrid({
            //url:"getGridTransportista.jsp",
            url:"funcsrvs?oper=getGridTransportista&",
            colNames:['ID','Transportista','Dirección','Telefono'],
            colModel:[
		{
		    name:'idtransportista', index:'idtransportista', width:30
		},

		{
		    name:'nombre', index:'nombre', width:340, align:"left"
		},

		{
		    name:'direccion', index:'direccion', width:340, align:"left"
		},

		{
		    name:'telefono', index:'telefono', width:200, align:"center"
		}
            ],
            page: 1,
            limit: 5,
            orderfield:"idtransportista",
            desc:"asc",
            urlper:true,
            tspagerid:"paginadoTransportista",
            multiselect:false,
            widthGrid:950,
           onSelectRow:getrowform
        });
    
    
    /*$.get("fncs_transportista.jsp?opt=getTransportista", function(data) {
	$("#tblTransportistas").append(data);
	
    });*/
    
    
}

function anulardocumentos(){
    $.ajax({
	type: "POST",
	url: "funcionescls.jsp",
	dataType:"json",
	data: {
	    opr:"anulardoc",
	    rfc:$("#rfc").val(),
	    tipodoc:$("#slctipoarchivocons").val()
	},
	async : false,
	success : function(data){
	    $("#divimgcons").empty();
	}

    });
    
}

function descargardocs(){
	$.ajax({
	    type: "POST",
	    url: "funcsrvs",
	    //url: "getDocumentos.jsp",
	    dataType:"json",
	    data: {
		oper:"descargardiar",
		rfc:"rfcdeprueba"
	    },
	    async : false,
	    success : function(data){
		//$("#divimgcons").empty();
	    }

	});
}

function cargaslide(){

//$("#slider").load("ajax/getSlide.jsp",function(){
//cancelSalidasMod(0);
//});
}

function cargatipodocsconsulta(){
    var html="";
    var arr = $.cookie("docscargados").split("|");    
    var x=0;
    for(x=0; x<=(arr.length-1); x++){
	
	if(arr[x]=="SACC"){
	    html=html + "<option id=\"SACC\" value=\"SACC\">Solicitud de Alta en Central de Carga</option>";
	}
	if(arr[x]=="SAD"){
	    html=html + "<option id=\"SAD\" value=\"SAD\">Solicitud de Alta a la Aduana</option>";
	}
	
	
	
	if(arr[x]=="OPA"){
	    html=html + "<option id=\"OPA\" value=\"OPA\">Oficio del Permiso de la Aduana</option>";
	}
	if(arr[x]=="AC"){
	    html=html + "<option id=\"AC\" value=\"AC\">Acta Constitutiva</option>";
	}
	if(arr[x]=="PTZN"){
	    html=html + "<option id=\"PTZN\" value=\"PTZN\">Protolización</option>";
	}
	if(arr[x]=="AH"){
	    html=html + "<option id=\"AH\" value=\"AH\">Alta en Hacienda</option>";
	}
	if(arr[x]=="CD"){
	    html=html + "<option id=\"CD\" value=\"CD\">Comprobante de Domicilio</option>";
	}
	if(arr[x]=="VD"){
	    html=html + "<option id=\"VD\" value=\"VD\">Verificación del Domicilio (F)</option>";
	}
	if(arr[x]=="UD"){
	    html=html + "<option id=\"UD\" value=\"UD\">Ultima Declaración</option>";
	}
	if(arr[x]=="CI"){
	    html=html +"<option id=\"CI\" value=\"CI\">Cédula de Identificación</option>";
	}
	if(arr[x]=="OSCT"){
	    html=html + "<option id=\"OSCT\" value=\"OSCT\">Oficio de la S.C.T (Expo por México/Asignación de Clave)</option>";
	}
	if(arr[x]=="TCP"){
	    html=html + "<option id=\"TCP\" value=\"TCP\">Tarjeta de Circulación Permanente de la S.C.T.</option>";
	}
	if(arr[x]=="PVF"){
	    html=html + "<option id=\"PVF\" value=\"PVF\">Parque Vehícular y sus filiales</option>";
	}
	if(arr[x]=="CDPV"){
	    html=html + "<option id=\"CDPV\" value=\"CDPV\">Comprobante de Domicilio del Parque Vehicular</option>";
	}
	if(arr[x]=="CF"){
	    html=html + "<option id=\"CF\" value=\"CF\">Control de Firmas</option>";
	}
	if(arr[x]=="COPI"){
	    html=html + "<option id=\"COPI\" value=\"COPI\">Copia de Identificación</option>";
	}
	if(arr[x]=="CI"){
	    html=html + "<option id=\"CI\" value=\"CI\">Cédula de Identificación</option>";
	}
	if(arr[x]=="COMDOMFISC"){
	    html=html + "<option id=\"COMDOMFISC\" value=\"COMDOMFISC\">Comprobante de Domicilio Fiscal</option>";
	}
	if(arr[x]=="PODNOT"){
	    html=html + "<option id=\"PODNOT\" value=\"PODNOT\">Poder Notariado</option>";
	}
	
    }
    
    
    
    
    
	
    
}