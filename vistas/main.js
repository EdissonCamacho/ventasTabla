$(document).ready(function() {


    cargarSelectMes();
    cargarSelectVendedor();
    consultarMeses();


    var datos = [];


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
            success: function(respuesta) {
                var contador = 0;
                var ciclos = respuesta.length;

                // alert(ciclos);


                var concatenar = "";
                respuesta.forEach(cabecera);

                function cabecera(item, index) {

                    if (contador == 0) {
                        concatenar += '<tr>';
                        concatenar += '<th>Vendedor</th>';
                        concatenar += '<th>' + item.nombreMes + '</th>';


                    } else if (contador != 0) {
                        concatenar += '<th>' + item.nombreMes + '</th>';



                    }


                    if (contador == ciclos - 1) {
                        concatenar += '<th>T.Vendido</th>';
                        concatenar += '<th>Comision</th>';
                        concatenar += '<th>Acciones</th>';;



                        concatenar += '</tr>';


                    }

                    contador++;

                    // alert(contador);
                    //alert(concatenar);




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
            success: function(respuesta) {

                var vendedorAnterio = 0;
                var vendedorActual = 0;
                var contador2 = 0;
                var concatenar2 = "";

                console.log(respuesta);
                respuesta.forEach(cuerpo);







                console.log(respuesta);

                function cuerpo(item, index) {
                    var totalVendido = Number(item.Enero) + Number(item.Febrero) + Number(item.Marzo) + Number(item.Abril) + Number(item.Mayo) + Number(item.Junio) + Number(item.Julio) + Number(item.Agosto) + Number(item.Septiembre) + Number(item.Octubre) + Number(item.Noviembre) + Number(item.Diciembre);
                    var Comision = parseInt(totalVendido * 0.12);


                    concatenar2 += '<tr>';
                    concatenar2 += '<td>' + item.nombre + '</td>';
                    concatenar2 += '<td>' + item.Enero + '</td>';
                    concatenar2 += '<td>' + item.Febrero + '</td>';
                    concatenar2 += '<td>' + item.Marzo + '</td>';
                    concatenar2 += '<td>' + item.Abril + '</td>';
                    concatenar2 += '<td>' + item.Mayo + '</td>';
                    concatenar2 += '<td>' + item.Junio + '</td>';
                    concatenar2 += '<td>' + item.Julio + '</td>';
                    concatenar2 += '<td>' + item.Agosto + '</td>';
                    concatenar2 += '<td>' + item.Septiembre + '</td>';
                    concatenar2 += '<td>' + item.Octubre + '</td>';
                    concatenar2 += '<td>' + item.Noviembre + '</td>';
                    concatenar2 += '<td>' + item.Diciembre + '</td>';












                    concatenar2 += '<td>$' + totalVendido + '</td>';
                    concatenar2 += '<td>$' + Comision + '</td>';
                    concatenar2 += '<td>';
                    concatenar2 += '<div class="btn-group-vertical">';
                    concatenar2 += '<button type="button" id="mod" class="btn btn-primary"data-toggle="modal"  idVendedor=' + item.idVendedor + ' data-target="#modRegistro">Modificar</button>';
                    concatenar2 += '<button type="button" id="eliminar"  class="btn btn-danger" idVendedor=' + item.idVendedor + '>Eliminar</button>';


                    concatenar2 += '</div>';
                    concatenar2 += '</td>';








                    concatenar2 += '</tr>';










                }

                // alert(concatenar2);
                $("#cuerpo").html(concatenar2);











            }
        })



    }
    $("#tabla").on("click", "#mod", function() {

        var modPersona = $(this).attr("idVendedor");
        var objData = new FormData();
        objData.append("idPersonaMod", modPersona);

        $.ajax({
            url: "control/vendedorControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(respuesta) {

                var concatenar = "";

                datos = respuesta;

                respuesta.forEach(insertarMeses);

                function insertarMeses(item, index) {

                    concatenar += '<option id="opcion"    value=' + item.idVentasVendedor + ' >' + item.nombreMes + '</option>';

                }

                $("#Modmes").html(concatenar);







            }








        })







    })

    function retornaValorMes(idVentas) {

        console.log(datos);
        var valor = 0;

        datos.forEach(cargarDatos4);

        function cargarDatos4(item, index) {
            var idVentasVendedorComprobar = Number(item.idVentasVendedor);

            if (Number(idVentas) == idVentasVendedorComprobar) {

                valor = Number(item.totalVendido);




            }





        }
        alert(valor);

        return valor;

    }

    $("#Modmes").change(function() {

        var valorTotal2 = document.getElementById("Modmes").value;
        var datoPago = retornaValorMes(valorTotal2);
        $("#ModvalorVenta").val(datoPago);










    })

    $("#modGuardar").click(function() {
        var valorTotal2 = document.getElementById("Modmes").value;
        var totalVendido = $("#ModvalorVenta").val();
        var objData = new FormData();
        objData.append("idVenta", valorTotal2);
        objData.append("total", totalVendido);


        $.ajax({
            url: "control/vendedorControl.php",
            type: "post",
            dataType: "json",
            data: objData,
            cache: false,
            contentType: false,
            processData: false,
            success: function(respuesta) {

                if (respuesta == "ok") {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Your work has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })

                    cargarDatos();
                    limpiarCampos();

                }







            }








        })





    })



    $("#tabla").on("click", "#eliminar", function() {

        var idVendedor = $(this).attr("idVendedor");

        alert(idVendedor);

        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {

                var objData = new FormData();
                objData.append("idEliminar", idVendedor);


                $.ajax({
                    url: "control/vendedorControl.php",
                    type: "post",
                    dataType: "json",
                    data: objData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function(respuesta) {
                        if (respuesta == "ok") {
                            Swal.fire(
                                'Deleted!',
                                'Your file has been deleted.',
                                'success'
                            )
                            cargarDatos();


                        } else {
                            alert(respuesta);
                        }






                    }








                })








            }
        })


    })







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
            success: function(respuesta) {

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
            success: function(respuesta) {


                var concatenar = "";

                respuesta.forEach(selectmes);

                function selectmes(item, index) {

                    concatenar += '<option value=' + item.idVendedor + '>' + item.nombre + ' ' + item.apellidos + '</option>';



                }


                $("#vendedor").html(concatenar);




            }







        })
    }

    $("#guardar").click(function() {

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
            success: function(respuesta) {

                if (respuesta == "ok") {
                    Swal.fire({
                        position: 'top-end',
                        icon: 'success',
                        title: 'Registrado Exitosamente',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    cargarDatos();
                    limpiarCampos();
                }




            }

        })







    })


    function limpiarCampos() {
        $("#ModvalorVenta").val("");
        $("#valorVenta").val("");

    }






})