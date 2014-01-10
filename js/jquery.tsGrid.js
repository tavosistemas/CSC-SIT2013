/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


(function($){
  $.fn.tsGrid = function( opcPers) {
       var urlServer = opcPers.url;
       var colNames = opcPers.colNames;
       var colModels = opcPers.colModel;
       var inipage = opcPers.page;
       var  limit = opcPers.limit;
       var orderby = opcPers.orderfield;
       var sord = opcPers.desc;
       var pagertsid = opcPers.tspagerid;
       var id=$(this).attr("id");
       var multiselect = opcPers.multiselect;
       var onSelectRow = opcPers.onSelectRow;
       var quitSelectRow=opcPers.quitSelectRow;
       var widthGrid = opcPers.widthGrid;
       var urlper = opcPers.urlper;
       var Registros ="";
       var newpag=0;
       var totalPaginas=0;
       var records=0;
       var numColumnas=0;
       var flagvar=0;
       var height=opcPers.height;

       //alert(colNames.length);
       
     // alert("pagina:" + urlServer +" , "+ "inipage:" +inipage +" , "+"limit:" +limit+" , " +"orderby:"+orderby+" , " + "sord:" +sord +" , "+"nombres Columnas:" +colNames);

       /*Se crean las cabeceras de las columnas*/
       var columsHeaders = getColumnsHeaders(colNames);
       /*Se crean las cabeceras de las columnas*/
       
       var HtmlTableHeader="<div style=\"border:0px solid #000; height:"+height+"px; overflow:auto; margin:0; width:100%;\" id=\""+"maindiv"+id+"\"> \n<table style=\"width:"+widthGrid+"px\" id=\""+"ts_"+id+"\" class=\"stripeMe\" cellspacing=\"1\" class=\"tablesorter\"> \n";
       var HtmlTablethead ="\t<thead class=\"fixedHeader\">\n" +columsHeaders+"\t</thead> \n";

        makeRows(urlServer,inipage,limit,orderby,sord);
              
        /**
        * Obtengo  los nombres y formo las cabeceras de cada columna
        * que se asignan mediante parametros.
        * @return {String}
        */
        function getColumnsHeaders(colNames){
            numColumnas = colNames.length;
            
            var Htmltableth="";
            var asd = "\t\t<tr>\n  \t\t\t<th id=\"tsGrid_"+id+colModels[0].name+"\" WIDTH='"+70+"' style=\"border:1px solid #ccc;\">"+"Selección"+"</th>\n";
            Htmltableth = asd;
            for(x=0;x<=(numColumnas-1);x++){
                //alert(x);
                var idCol = colModels[x].name;
                var widthCol = colModels[x].width;
                var rowhide = colModels[x].hide;
                var rowtxtalgin = colModels[x].align;
                var rowvisibility;
                //alert(colModels[x].visibility);
                if(colModels[x].visibility == false){
                    rowvisibility= false;
                }else if(colModels[x].visibility == undefined){
                    rowvisibility= true;                    
                }
                //var rowvisibility= colModels[x].visibility;
                
                if(rowvisibility!=false){
                        //alert("entre JP: " + colNames[x]);
                    Htmltableth = Htmltableth + "  \t\t\t<th id=\"tsGrid_"+idCol+"\" WIDTH='"+widthCol+"' style=\"border:1px solid #ccc; border-left:0\">"+colNames[x]+"</th>\n";
                }else{
                    //alert("FALSE");
                    //alert("entre IDcampo: " + colNames[x]);
                    Htmltableth = Htmltableth + "  \t\t\t<th id=\"tsGrid_"+idCol+"\" style=\"display:none\" WIDTH='"+widthCol+"' style=\"border:1px solid #ccc; border-left:0\">"+colNames[x]+"</th>\n";
                }
                
                if(x==0){
                       
                        //***********************REGRESAR A LA VERSION ANTERIOR QUITAR COMENTARIO DE LAS SIGUIENTES 2 LINEAS ********************
                       // var asd = "\t\t<tr>\n  \t\t\t<th id=\"tsGrid_"+id+idCol+"\" WIDTH='"+70+"'>"+"Selección"+"</th>\n";
                       //Htmltableth = asd + "  \t\t\t<th id=\"tsGrid_"+idCol+"\" WIDTH='"+widthCol+"'>"+colNames[x]+"</th>\n";

                }else{
                    //alert("entre Repetido 0" + colNames[x]);
                   // Htmltableth = Htmltableth+ "\t\t\t<th id=\"tsGrid_"+idCol+"\" WIDTH='"+widthCol+"'>" +colNames[x]+"</th>\n" // ---------- > DAVID 04 Agosto 2010
                }
            }
            
            return Htmltableth+"\t\t</tr>\n";
        }

        /**
        * Escribo cada renglon obtenido de la Base de Datos.
        * @return {String}
        */
        function makeRows(urlServer,inipage,limit,orderby,sord){
            
            $("#" +id).html("<div id=\"cargando\" class=\"cargando\"> Cargando Datos ...</div>");
            if(urlper==true){
	//	alert(urlServer+"?page="+inipage+"&rows="+limit+"&sidx="+orderby+"&sord="+sord);
                $.getJSON(urlServer+"?page="+inipage+"&rows="+limit+"&sidx="+orderby+"&sord="+sord,
                //$.getJSON(urlServer+"&page="+inipage+"&rows="+limit+"&sidx="+orderby+"&sord="+sord,
                    function(data){
                        
                        $("#cargando").hide();
                        totalPaginas = data.total;
                        records = data.records;
                        var cont =1;

                        if(totalPaginas ==0){
                            $("#" +id).empty();
                            $("#" +pagertsid).empty();
                            //alert("La consulta no arrojó ningun resultado");


                           /****************************************************************/
                           /***********VALIDAR MEDIANTE UN PARAMETRO*****************/
                           /****************************************************************/
                           // showMessg("La consulta no arrojó ningun resultado");
                        }
                        
                        $.each(data.rows, function(i,item){
                            var prevRegistros=Registros;
                            Registros = prevRegistros + writeRow(data.total,item.cell.length,item.cell);
                            if(cont==(data.rows.length)){
                                printGrid(Registros)
                            }else{
                                cont++
                            }
                        });
                    }
                );
                   

            }else{
                $.getJSON(urlServer+"?page="+inipage+"&rows="+limit+"&sidx="+orderby+"&sord="+sord,
                    function(data){
                        $("#cargando").hide();
                        totalPaginas = data.total;
                        records = data.records;
                        var cont =1;

                        $.each(data.rows, function(i,item){
                            var prevRegistros=Registros;
                            Registros = prevRegistros + writeRow(data.total,item.cell.length,item.cell);
                            if(cont==(data.rows.length)){
                                printGrid(Registros)
                            }else{
                                cont++
                            }
                        });

                    }
                );
            }
            
                
        }


         /**
         * Lleno la tabla con los registros de la Base de Datos.
         * @return {String}
         */
        function writeRow(totalRows,totalColumns,columns){
            var trRow =""
                 /**mmi codigo **/
                  /*var chkSelect ="\t\t<tr  id=\"idRow"+id+columns[0]+"\"> \n"+"\t\t\t<td WIDTH='"+75+"' style=\"text-align:center\">"+"<center><input id=\""+columns[0]+"\" class=\"grdTs"+id+"\" type=\"checkbox\"/></center>"+"</td>\n"
                 trRow = chkSelect;
                      for(i=0; i<=(totalColumns-1);i++){
                          var rowvisibility= colModels[i].visibility;
                        if(rowvisibility!=false){
                            trRow = trRow + "\t\t\t<td style=\"text-align:"+colModels[i].align+"\">"+columns[i]+"</td>\n"
                        }
                    }*/
                 /** mi codigo **/
                // alert("Columnas: "+totalColumns);
                 for(x=0; x<=(limit);x++){
                      for(i=0; i<=(totalColumns-1);i++){
                        var rowvisibility;
                        if(colModels[i].visibility == false){
                            rowvisibility= false;
                        }else if(colModels[i].visibility == undefined){
                            rowvisibility= true;
                        }
                        var chkSelect ="";

                        if(i==0){
                            //alert(rowvisibility);
                            chkSelect ="\t\t<tr height=18 id=\"idRow"+id+columns[i]+"\"> \n"+"\t\t\t<td WIDTH='"+75+"' style=\"text-align:center; border:1px solid #ccc; border-left:0\">"+"<center><input id=\""+columns[i]+"\" class=\"grdTs"+id+"\" type=\"checkbox\"/></center>"+"</td>\n"
                            if(rowvisibility== false){
                                trRow = chkSelect + ""
                            }else{
                                trRow = chkSelect + "\t\t\t<td height=18 style=\"border:1px solid #ccc; text-align:"+colModels[i].align+"\" >"+columns[i]+"</td>\n"
                            }
                            
                            
                        }else{
                            if(rowvisibility== false){
                                trRow = chkSelect + ""
                            }else{
                                trRow = trRow + "\t\t\t<td height=18 style=\"border:1px solid #ccc; text-align:"+colModels[i].align+"\">"+columns[i]+"</td>\n"
                            }
                            
                        }
                    }
                }
                 
             
            //for(x=0; x<=(totalRows-1);x++){
            /*for(x=0; x<=(limit);x++){
                for(i=0; i<=(totalColumns-1);i++){
                    if(i==0){
                        var chkSelect ="\t\t<tr  id=\"idRow"+id+columns[i]+"\"> \n"+"\t\t\t<td WIDTH='"+75+"'>"+"<center><input id=\""+columns[i]+"\" class=\"grdTs"+id+"\" type=\"checkbox\"/></center>"+"</td>\n"
                        trRow = chkSelect + "\t\t\t<td>"+columns[i]+"</td>\n"
                    }else{
                        trRow = trRow + "\t\t\t<td>"+columns[i]+"</td>\n"
                    }
                }       
            }*/
            
            return trRow +"\t\t</tr>\n";
        }

        /**
        * Se Imprime la Tabla
        * @return {HTML}
        */
        function printGrid(rows){
            var HtmlTabletbody =" \t<tbody id=\""+"tbody_"+id+"\" class=\"scrollContent\">\n"+rows+"\t</tbody> \n </table>\n</div>";
            var HtmlTable =HtmlTableHeader+HtmlTablethead + HtmlTabletbody;
            $("#"+id).html(HtmlTable);
            /*$("#ts_"+id).tablesorter({
                widgets: ['zebra']
            });*/
            
            //$(".stripeMe tr").addClass("alt");
            $('.stripeMe tr:even').addClass('alt');

            //$("#ts_"+id).columnSizing();

             //xMoveTo(".theadfixedHeader",0,xScrollTop())

            tspager();

            if(multiselect==false){
                
                var checkanterior=0;
                $(".grdTs"+id).bind("click", function(e){
                        //alert(this.id);
                        //alert(checkanterior);
                        multiselectValida(this.id,checkanterior);
                        if(onSelectRow != null){
                            if(this.checked==true){
				
                                onSelectRow(this.id);
                            }else{
                                if(quitSelectRow!=null){
                                    quitSelectRow()
                                }

                            }
                        }

                        checkanterior = this.id
                      //  alert("anterior:" + checkanterior);
                });
            }else{
                $(".grdTs"+id).bind("click", function(e){
                    if(onSelectRow != "undefinide"){
                          onSelectRow(this.id);
                    }
                });
            }
            
             
            
            /*$("#"+id+' input:checkbox').each( function() {
                this.checked = !this.checked;
                alert(".grdTs"+id);
                $(".grdTs"+id).bind("click", function(e){
                        prueba();
                 });
                
            });*/
            
        }

        function multiselectValida(idchck,idchckanterior){
        
            var contadochecks=0;
            $("#"+id+' input:checkbox').each( function() {
                if(this.checked == true){
                  contadochecks = contadochecks +1;                  
                }
                if(contadochecks>1){                  
                   $("#"+id+' input:checkbox').each( function() {
                        if(this.id==idchckanterior){
                            $(this).attr("checked",false);
                            return false;
                        }
                    });

                  //$("#"+idchckanterior).attr("checked", false);
                  return false;
                }
                
            });

            
            
        }

        /**
        * Se crea el Paginador y sus funciones.
        * @return {HTML}
        */
        function tspager(){
            var ts_paginado = "<div class=\"ts_divContPaginador\">"+
                                        " <div class=\"ts_objeto\">  Registros Totales : "+records+" </div>"+" "+
                                        " <div class=\"ts_objeto\"><img src=\"css/thmGridblue/ts_img_separador.png\"/></div>"+" "+
                                        "<div id='tsrefresh_"+id+"' class=\"ts_divRefresh\"><img src=\"css/thmGridblue/ts_img_refresh.png\" alt=\"Actualizar\" title=\"Actualizar\"/></div>"+
                                        " <div id='tsprev_"+id+"' class=\"ts_divPagAnterior\"><img src=\"css/thmGridblue/ts_img_prev.png\" alt=\"Anterior\" title=\"Anterior\"/></div> "+
                                        " <div class=\"ts_objeto\">Página :</div>"+
                                        " <div class=\"ts_objeto\"><input id='ts_txtPag"+id+"' class=\"ts_inputNroPag\" type=\"text\" /> </div> "+
                                        "<div class=\"ts_objeto\"> de "+totalPaginas+" </div>"+
                                        " <div id='tsnext_"+id+"' class=\"ts_divPagSiguiente\"><img src=\"css/thmGridblue/ts_img_next.png\" alt=\"Siguiente\" title=\"Siguiente\"/></div>"+
                                        " <div class=\"ts_objeto\"><img src=\"css/thmGridblue/ts_img_separador.png\"/></div>"+" "+
                                        "<div class=\"ts_objeto\" style\"margin-left:8px;\"> Mostrar :</div>"+
                                        "<div class=\"ts_CboPag\"> <select name='tscbo_'"+id+"  id='tscbo_"+id+"' style=\"width:55px; height:22px;\" > <option  value=\"5\">5</option> <option value=\"10\">10</option> <option value=\"20\">20</option><option value=\"30\">30</option> </select></div>"+
                                        "<div class=\"ts_objeto\"> registros por página</div>"+
                                        "  </div>"
            $("#"+pagertsid).html(ts_paginado);
            
            if(limit<10){
                $("#tscbo_"+id).val();
            }else{
                $("#tscbo_"+id).val(limit);
            }

            //$("#tscbo_"+id).msDropDown();
            if(newpag==0){
                $("#ts_txtPag"+id).val(1);
            }else{
                $("#ts_txtPag"+id).val(newpag);
            }

            var  txtPaginaGrid = $('#ts_txtPag'+id);
            var valanterior = parseInt($('#ts_txtPag'+id).val());
            var code =null;
            txtPaginaGrid.keypress(function(e){
                code= (e.keyCode ? e.keyCode : e.which);
                if (code == 13){
                    if(parseInt($('#ts_txtPag'+id).val()) <  1){
                        alert("Pagina no encontrada");
                         $('#ts_txtPag'+id).val(valanterior);
                    }else if(parseInt($('#ts_txtPag'+id).val()) > totalPaginas){
                            alert("Pagina no encontrada");
                            $('#ts_txtPag'+id).val(valanterior);
                    }else{
                            newpag= parseInt($('#ts_txtPag'+id).val());
                            for(y=0; y<=limit+1; y++){
                                $("#idRow"+limit).fadeOut();
                            }
                            Registros="";
                            
                            makeRows(urlServer,newpag,limit,orderby,sord);
                    }
                    
                }

            });

            
            $("#"+pagertsid+" div").each(function (i) {
                if(this.id == "tsnext_"+id){
                    $("#"+this.id).bind("click", function(e){
                        if(newpag <= (totalPaginas-1)){
                            //alert(parseInt($('#ts_txtPag'+id).val()));
                            if(parseInt($('#ts_txtPag'+id).val()) != (totalPaginas)){
                                siguiente();
                            }                            
                        }                        
                    });
                }

                if(this.id == "tsprev_"+id){
                    $("#"+this.id).bind("click", function(e){
                        if(newpag > (1)){
                            anterior();
                        }else{
                            $("#tsprev_"+id).css("cursor","pointer");
                            $("#tsprev_"+id).css("color","#cdcdcd");
                        }
                    });
                }

                if(this.id == "tsrefresh_"+id){
                    $("#"+this.id).bind("click", function(e){
                        Registros="";
                          for(y=0; y<=limit+1; y++){
                             $("#idRow"+limit).fadeOut();
                        }
                        newpag=0;
                        
                        makeRows(urlServer,inipage,limit,orderby,sord);
                    });
                }
                
                if(this.id == "tsrefresh_"+id){
                    $("#tscbo_"+id).change(function() {
                        limit = $("#tscbo_"+id).val();
                        Registros="";
                         for(y=0; y<=limit+1; y++){
                             $("#idRow"+limit).fadeOut();
                        }
                        newpag=0;
                        
                        makeRows(urlServer,inipage,limit,orderby,sord);
                    });
                }
                

            });
        }

        /**
        * Funcion para el Evento Siguiente
        * del Paginado
        */
        function siguiente(){
            if(newpag==0){
                newpag= inipage+1;
            }else{
                newpag= newpag+inipage;
            }
            for(y=0; y<=limit; y++){
               $("#idRow"+limit).fadeOut();
            }
            Registros="";
            //alert(urlServer+newpag+limit+orderby+sord);
            makeRows(urlServer,newpag,limit,orderby,sord);
        }

         /**
         * Funcion para el Evento Anterior
         * del Paginado
         */
        function anterior(){
            newpag= newpag-inipage;
            Registros="";
            for(y=0; y<=limit+1; y++){
               $("#idRow"+limit).fadeOut();
            }
            
            makeRows(urlServer,newpag,limit,orderby,sord);
        }


        function refresh(){
             if(this.id == "tsrefresh_"+id){
                    $("#tscbo_"+id).change(function() {
                        limit = $("#tscbo_"+id).val();
                        Registros="";
                         for(y=0; y<=limit+1; y++){
                             $("#idRow"+limit).fadeOut();
                        }
                        newpag=0;
                        
                        makeRows(urlServer,inipage,limit,orderby,sord);
                    });
                }
        }

        
  }

})(jQuery);