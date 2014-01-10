;(function($,window,undefined){
	var Slider= function(elem,opciones){
		this.elem = elem;
		this.$elem = $(elem);
		if(this.init){
			this.init(opciones);
		}
	}
	Slider.prototype = {
		defaults:{

			visible : 2,
			anterior  : '#anterior',
			siguiente : '#siguiente',
			slideInicial :1,

		},
		init : function(opciones){
			this.config = $.extend({},this.defaults,opciones);
			this.$contenedor = this.$elem.children().eq(0);
			this.$slides = this.$contenedor.children();
			this.totalslides = this.$slides.length;
			/*console.log(this.totalslides);*/
			this.avance = this.$slides.outerWidth(true);
			//alert(this.$slides.outerWidth(true));
			this.visibles = Math.floor(this.$elem.width()/this.avance);
			this.slide = {
				
					actual: this.config.slideInicial,
					movimiento : false,
			};
			that = this;
			$(this.config.anterior).click(function(){
				that.anterior();
			});
			$(this.config.siguiente).click(function(){
				that.siguiente();
			});
			this.$contenedor.width((this.visibles + this.totalslides+1) * this.avance);
			/*console.log('init');*/
			for (var i = 0; i < this.visibles+1; i++) {
				temp = this.$slides.eq(i).clone();
				this.$contenedor.append(temp);

			}
			t=setInterval(function(){that.siguiente();},10000);

		},
		/*prueba: function(){
			console.log(this.config);
		},*/
		verSlide : function(slide){
			slide = this.setearSlider(slide);
			this.animar(slide);		
		},
		setearSlider : function(slide){
			
			//console.log(this.totalslides);
			if (slide > this.totalslides + 1) {
				//alert('slide aignadao :' + slide + ' total de slider :' + this.totalslides);
				this.$contenedor.css('left','0px');
				this.slide.actual = 1;
				slide = 2;
			}
			if (slide < 1) {
				/*alert('slide aignadao : ' + slide + ' total de slider : ' + this.totalslides);
				alert('avance : ' + this.avance);
				alert(((this.totalslides + 2)*this.avance)* -1);*/
				this.$contenedor.css('left',(((this.totalslides)*this.avance )* -1) + 'px');
				slide = this.totalslides;
			}
			return slide;
		},
		animar : function(slide){
		 	sentido =  (this.slide.actual - slide) == -1 ?
		 				"-":
		 				"+";
		 	this.slide.movimiento= true;
		 	that = this;
		 	this.$contenedor.animate({
		 		left: sentido + "=" + this.avance + 'px',
		 	},500,'swing',function(){
		 		that.slide.actual = slide;
		 		that.slide.movimiento =  false;
		 	})
		},
		siguiente : function(){
			if(!this.slide.movimiento){
				this.verSlide(this.slide.actual + 1);
				//t=setInterval(function(){s.siguiente();},1000);
			}
		},
		anterior : function(){
			if(!this.slide.movimiento){
				this.verSlide(this.slide.actual - 1);
			}
		},
	}
	
	$.fn.marquesina = function(opciones){
		if(typeof opciones == "string") 
		{
				metodo = opciones;
				args = Array.prototype.slice.call(arguments,1);
				var slider =  this.data('slider')?
					this.data('slider'):
					new Slider(this);
			if (slider[metodo])
			{
				slider[metodo].apply(slider,args);
			} 
			
		}else if(typeof opciones == 'object' || !opciones){
				this.data('slider', new Slider(this,opciones));
			}else{
				$.error('Error, parametro pasado es incorrecto');
			}
			
		return this;
	}
	window.slider = Slider;
})(jQuery,window)

