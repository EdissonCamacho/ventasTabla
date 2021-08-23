<?php
require_once "conexion.php";

class modeloVendedor{


    public static function mdlSelectMes(){

        $objConsulta=conexion::conectar()->prepare("Select * from mes");
        $objConsulta->execute();
        $objLista= $objConsulta->fetchAll();
        return $objLista;


    }

    public static function mdlSelectVendedor(){
        $objConsulta=conexion::conectar()->prepare("Select * from  vendedor");
        $objConsulta->execute();
        $objLista= $objConsulta->fetchAll();
        return $objLista;


    }

    public static function mdlConsultaMeses(){
        $objConsulta=conexion::conectar()->prepare("select * from mes");
        $objConsulta->execute();
        $objLista= $objConsulta->fetchAll();
        return $objLista;


    }
    public static function mdlConsultaDatos(){
        $objConsulta=conexion::conectar()->prepare("select * from pagos3");
        $objConsulta->execute();
        $objLista= $objConsulta->fetchAll();
        return $objLista;


    }


    public static function mdlInsertarVenta($idMes,$idVendedor,$valorVenta){
        $mensaje="";

        $objConsulta=conexion::conectar()->prepare("Insert into ventasVendedor(idVendedor,idMes,totalVendido) values(".$idVendedor.",".$idMes.",".$valorVenta.")");

        if($objConsulta->execute()){
            $mensaje="ok";
        }else{
            $mensaje="error";
        }

        return $mensaje;








    }


    public static function mdlEliminarRegistros($idVendedor){
        $mensaje="";

        $objConsulta=conexion::conectar()->prepare("Delete from ventasVendedor where idVendedor=".$idVendedor."");

        if($objConsulta->execute()){

            $mensaje="ok";

        }
        else{
            $mensaje="";

        }

        $objConsulta=null;
        return $mensaje;



    }

    public static function mdlConsultarValores($idPersonal){


        $objConsulta=conexion::conectar()->prepare("select ventasVendedor.idMes,mes.nombreMes,totalVendido,ventasVendedor.idVendedor,idVentasVendedor, nombre,apellidos from ventasVendedor inner join mes on mes.idMes=ventasVendedor.idMes inner join vendedor on ventasVendedor.idVendedor=vendedor.idVendedor where ventasVendedor.idVendedor=".$idPersonal."");
        $objConsulta->execute();
        $lista= $objConsulta->fetchAll();
        $objConsulta=null;
        return $lista;

    }

    public static function mdlModificarValorMes($total,$idVenta){

        $mensaje="";

        $objConsulta=conexion::conectar()->prepare("Update ventasVendedor set totalVendido=".$total." where idVentasVendedor=".$idVenta."");

        if($objConsulta->execute()){

            $mensaje="ok";

        }
        else{
            $mensaje="";

        }

        $objConsulta=null;
        return $mensaje;




    }





}