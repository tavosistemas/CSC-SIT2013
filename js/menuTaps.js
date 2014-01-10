/***************************/
//@Author: Adrian Mato Gondelle
//@website: http://web.ontuts.com
//@email: yensamg@gmail.com
//@license: Feel free to use it, but keep this credits please!					
/***************************/


/*
$(document).ready(function(){
    $(".menu > li")(function(e){
        var a = e.target.id;
        //desactivamos seccion y activamos elemento de menu
        $(".menu li.active").removeClass("active");
        $(".menu #"+a).addClass("active");
        //ocultamos divisiones, mostramos la seleccionada
        $(".content").css("display", "none");
        $("."+a).fadeIn();
    });
});*/
;


//control de eventos
$(this.document).ready(function(){
	
var item1 = $('#Servicios');
var divitem1 = $("#DescripcionServisios");


var item2 = $("#Censecar");
var divitem2 = $("#DescripcionCensecar");

var item3 = $("#AsesoriaLLegar");
var divitem3 = $("#DescripcioneLegal");

var item4 = $("#Sitios");
var divitem4 = $("#DescripcionSitios");

var item5 = $("#Soporte");
var divitem5 = $("#DescripcionSoporte");

var item6 = $("#Contacto");
var divitem6 = $("#DescripcionContacto");

	item1.click(function(){
		alert("ejmeplo");
		displayOptions($("#DescripcionServisios"));
	});
	item1.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionServisios"));
	});

	divitem1.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionServisios"));
	});
	divitem1.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionServisios"));
	});


	item2.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionCensecar"));
	});
	item2.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionCensecar"));
	});


	divitem2.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionCensecar"));
	});
	divitem2.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionCensecar"));
	});

	item3.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcioneLegal"));
	});
	item3.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcioneLegal"));
	});

	divitem3.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcioneLegal"));
	});
	divitem3.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcioneLegal"));
	});
	item4.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionSitios"));
	});
	item4.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionSitios"));
	});

	divitem4.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionSitios"));
	});
	divitem4.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionSitios"));
	});
	item5.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionSoporte"));
	});
	item5.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionSoporte"));
	});
	divitem5.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionSoporte"));
	});
	divitem5.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionSoporte"));
	});
	item6.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionContacto"));
	});
	item6.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionContacto"));
	});
	divitem6.mouseover(function(){
		//alert("ejmeplo");
		displayOptions($("#DescripcionContacto"));
	});
	divitem6.mouseout(function(){
		//alert("desapareser");
		hideOptions($("#DescripcionContacto"));
	});
});

//funcion que MUESTRA todos los elementos del menu
function displayOptions(e){
	e.show();

};
//funcion que OCULTA los elementos del menu
function hideOptions(e){
	//e.find("li").hide();
	//e.find("li.active").show();
	e.hide();

};



