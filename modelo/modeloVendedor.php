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
        $objConsulta=conexion::conectar()->prepare("select distinct(mes.nombreMes)from ventasVendedor inner join vendedor on  vendedor.idVendedor=ventasVendedor.idVendedor inner join mes on mes.idMes =ventasVendedor.idMes");
        $objConsulta->execute();
        $objLista= $objConsulta->fetchAll();
        return $objLista;


    }
    public static function mdlConsultaDatos(){
        $objConsulta=conexion::conectar()->prepare(" select * from ventasVendedor inner join vendedor on  vendedor.idVendedor=ventasVendedor.idVendedor inner join mes on mes.idMes =ventasVendedor.idMes order by vendedor.idVendedor asc");
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





}