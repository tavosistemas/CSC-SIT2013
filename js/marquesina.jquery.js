;(function($,window,undefined){ // variabl a la que se asigna en el que se reive 
	//closure;

	$.fn.marquesina = function(anterior,siguiente){
		//alert('hola , soy un plugin de jquery');
		return this.each(function(){
			$container = $(this).children().eq(0);
			if ($container) {
				//alert('dentradefiniciones');
				var $fotos = $container.children();
				var cantidad = $fotos.length;
				var incremento = $fotos.outerWidth(true);
				var enMarquesina = Math.floor($(this).width() / incremento);
				var primerElemento = 1;
				var estaMoviendo = false;

			}
			//alert ('cantida=' + cantidad);
			var aumento = (cantidad + enMarquesina +1) * incremento ;
			$container.css('width',(cantidad + enMarquesina +1) * incremento);
			//alert(aumento);
			//alert((cantidad + enMarquesina+1) * incremento);
			for (var i = 0; i < enMarquesina+1; i++) 
			{
				//alert(i);
				$container.append($fotos.eq(i).clone());
			}
		
			$(siguiente).click(function(e){
				e.preventDefault();

				
                console.log(primerElemento);

				if (!estaMoviendo) {

					if (primerElemento> cantidad) {
					primerElemento =2;
					$container.css('left','0px');
					} else{
						primerElemento++;

					}
					estaMoviendo= true;

						$container.animate({
							left:'-=' + incremento,
						},'swing',function(){
							estaMoviendo= false;
						});
				}
			});

			$(anterior).click(function(e){
				e.preventDefault();



				if (!estaMoviendo) {

				if (primerElemento == 1) {
					$container.css('left',cantidad*incremento*-1);
					primerElemento=cantidad;
				}else
				{
					primerElemento--;
				}

					estaMoviendo= true;

						$container.animate({
							left:'+=' + incremento,
						},'swing',function(){
							estaMoviendo= false;
						});
				}

			});

		});
	}


})(jQuery,window) // paramertro que resibe