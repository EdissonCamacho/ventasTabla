$(document).ready(function () {


    cargarSelectMes();
    cargarSelectVendedor();
    consultarMeses();


    function consultarMeses() {
        var mensaje = "ok";

        var objData = new FormData();
        objData.append("consultaMeses", mensaje);

        $.ajax({
            url: "control/vendedorControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {
                var contador = 0;
                var ciclos = respuesta.length;

                // alert(ciclos);


                var concatenar = "";
                respuesta.forEach(cabecera);
                function cabecera(item, index) {

                    if (contador == 0) {
                        concatenar += '<tr>';
                        concatenar += '<th>Nombre Vendedor</th>';
                        concatenar += '<th>' + item.nombreMes + '</th>';


                    }else if(contador!=0){
                        concatenar += '<th>' + item.nombreMes + '</th>';



                    } 
                    
                   
                    if (contador == ciclos - 1) {
                        concatenar += '<th>Total Vendido</th>';
                        concatenar += '<th>Comision</th>';

                        concatenar += '</tr>';


                    }
                    
                    contador++;

                    // alert(contador);
                    alert(concatenar);




                }
               

                $("#cabecera").html(concatenar);
                cargarDatos();

            }








        })




    }


    function cargarDatos() {

        var mensaje = "ok";

        var objData2 = new FormData();

        objData2.append("consulatarDatos", mensaje);

        $.ajax({
            url: "control/vendedorControl.php",
            type: "post",
            dataType: "json",
            data: objData2,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                var vendedorAnterio = 0;
                var vendedorActual = 0;
                var contador2 = 0;
                var concatenar2 = "";
                respuesta.forEach(cuerpo);



                console.log(respuesta);

                function cuerpo(item,index){

                    if(contador2==0){

                        concatenar2+='<tr>';
                        concatenar2+='<td>'+item.nombre+ '</td>';
                        concatenar2+='<td>'+item.totalVendido+ '</td>';
                        contador2++;
                        vendedorActual==item.idVendedor;
                    }
                    else if( vendedorActual==item.idVendedor && contador2!=0){
                        concatenar2+='<td>'+item.totalVendido+ '</td>';
                        contador2++;

                    }else{
                        concatenar2+='</tr>';
                        contador2=0;

                        
                    }
                    
                   

                    


                }

                $("#cuerpo").html(concatenar2);


               

                



            }
        })



    }







    function cargarSelectMes() {
        var mensaje = "ok";

        var objData = new FormData();
        objData.append("cargarSelectMes", mensaje);

        $.ajax({
            url: "control/vendedorControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {

                var concatenar = "";

                respuesta.forEach(selectmes);
                function selectmes(item, index) {

                    concatenar += '<option value=' + item.idMes + '>' + item.nombreMes + '</option>';



                }


                $("#mes").html(concatenar);


            }








        })
    }

    function cargarSelectVendedor() {
        var mensaje = "ok";

        var objData = new FormData();
        objData.append("cargarSelectVendedor", mensaje);

        $.ajax({
            url: "control/vendedorControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {


                var concatenar = "";

                respuesta.forEach(selectmes);
                function selectmes(item, index) {

                    concatenar += '<option value=' + item.idVendedor + '>' + item.nombre + ' ' + item.apellidos + '</option>';



                }


                $("#vendedor").html(concatenar);




            }







        })
    }

    $("#guardar").click(function () {

        var idMes = $("#mes").val();
        var idVendedor = $("#vendedor").val();
        var valorVenta = Number($("#valorVenta").val());


        var objData = new FormData();

        objData.append("idMes", idMes);
        objData.append("idVendedor", idVendedor);
        objData.append("valorVenta", valorVenta);

        $.ajax({
            url: "control/vendedorControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function (respuesta) {




            }

        })







    })






})