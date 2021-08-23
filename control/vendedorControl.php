<?php

include_once "../modelo/modeloVendedor.php";
class vendedorContro{


    public $idMes=0;
    public $idVendedor =0;
    public $valorVenta=0;
    public $idVenta =0;

    public  function cargarSelectMes()
    {
      
        $objRespuesta=modeloVendedor::mdlSelectMes();
        echo json_encode($objRespuesta);
    }
    public  function cargarSelectVendedor()
    {
      
        $objRespuesta=modeloVendedor::mdlSelectVendedor();
        echo json_encode($objRespuesta);
    }

    public function insertarVenta(){

        $objRespuesta=modeloVendedor::mdlInsertarVenta($this->idMes,$this->idVendedor,$this->valorVenta);
        echo json_encode($objRespuesta);

        
    }

   public function consultarMeses()
    {

        $objRespuesta=modeloVendedor::mdlConsultaMeses();
        echo json_encode($objRespuesta);
    }
    
    public function consultarDatos()
    {

        $objRespuesta=modeloVendedor::mdlConsultaDatos();
        echo json_encode($objRespuesta);
    }

    public function ctrlEliminarRegistros(){


        $objRespuesta=modeloVendedor::mdlEliminarRegistros($this->idVendedor);
        echo json_encode($objRespuesta);


    }

    public function ctrlConsultarValores(){
        $objRespuesta=modeloVendedor::mdlConsultarValores($this->idVendedor);
        echo json_encode($objRespuesta);



    }

    public function ctrlModificarValorMes(){
        $objRespuesta=modeloVendedor::mdlModificarValorMes($this->valorVenta,$this->idVenta);
        echo json_encode($objRespuesta);


    }




}

if(isset($_POST["cargarSelectMes"])){
    $objConsulta = new vendedorContro();
    $objConsulta->cargarSelectMes();



}
if(isset($_POST["cargarSelectVendedor"])){

    $objConsulta = new vendedorContro();
    $objConsulta->cargarSelectVendedor();



}
if(isset($_POST["idMes"]) &&isset($_POST["idVendedor"]) && isset($_POST["valorVenta"]) ){

    
$objConsulta = new vendedorContro();
$objConsulta->idMes=$_POST["idMes"];
$objConsulta->idVendedor=$_POST["idVendedor"];
$objConsulta->valorVenta=$_POST["valorVenta"];
$objConsulta->insertarVenta();







}
if(isset($_POST["consultaMeses"])){
    $objConsulta = new vendedorContro();
    $objConsulta->consultarMeses();


}

if(isset($_POST["consulatarDatos"])){
    $objConsulta = new vendedorContro();
    $objConsulta->consultarDatos();

}

if(isset($_POST["idEliminar"])){
    $objConsulta = new vendedorContro();
    $objConsulta->idVendedor=$_POST["idEliminar"];
    $objConsulta->ctrlEliminarRegistros();



}
if(isset($_POST["idPersonaMod"])){

    $objConsulta=new vendedorContro();
    $objConsulta->idVendedor=$_POST["idPersonaMod"];
    $objConsulta->ctrlConsultarValores();

}

if(isset($_POST["idVenta"]) && isset($_POST["total"])){
    $objConsulta=new vendedorContro();
    $objConsulta->idVenta=$_POST["idVenta"];
    $objConsulta->valorVenta=$_POST["total"];
    $objConsulta->ctrlModificarValorMes();



}