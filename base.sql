create table ventas;
use ventas;
create table vendedor(
idVendedor int not null auto_increment,
documento varchar(30),
nombre varchar(30),
apellidos varchar (30),
primary key(idVendedor));

create table mes(
idMes int not null auto_increment,
nombreMes varchar(30),
primary key(idMes)
);


create table ventasVendedor(
	idVentasVendedor int not null auto_increment,
	idVendedor int ,
	idMes int ,
	totalVendido float,
	primary key(idVentasVendedor)
);

alter table ventasVendedor add foreign key(idVendedor) references vendedor(idVendedor);
alter table ventasVendedor add foreign key(idMes) references mes(idMes);


insert into vendedor(nombre,apellidos) values('Ana','Perez');
insert into vendedor(nombre,apellidos) values('Luis','Perez');
insert into vendedor(nombre,apellidos) values('Jose','Perez');



create view pagos as (
select 
vendedor.nombre,    vendedor.idVendedor, ventasvendedor.idVentasVendedor,
CASE WHEN mes.nombreMes = 'Enero' THEN ventasVendedor.totalVendido ELSE 0 END AS Enero,
CASE WHEN mes.nombreMes = 'Febrero' THEN ventasVendedor.totalVendido ELSE 0 END AS Febrero,
CASE WHEN mes.nombreMes = 'Marzo' THEN ventasVendedor.totalVendido ELSE 0 END AS Marzo,
CASE WHEN mes.nombreMes = 'Abril' THEN ventasVendedor.totalVendido ELSE 0 END AS Abril,
CASE WHEN mes.nombreMes = 'Mayo ' THEN ventasVendedor.totalVendido ELSE 0 END AS Mayo,
CASE WHEN mes.nombreMes = 'Junio ' THEN ventasVendedor.totalVendido ELSE 0 END AS Junio,
CASE WHEN mes.nombreMes = 'Julio ' THEN ventasVendedor.totalVendido ELSE 0 END AS Julio,
CASE WHEN mes.nombreMes = 'Agosto ' THEN ventasVendedor.totalVendido ELSE 0 END AS Agosto,
CASE WHEN mes.nombreMes = 'Septiembre ' THEN ventasVendedor.totalVendido ELSE 0 END AS Septiembre,
CASE WHEN mes.nombreMes = 'Octubre ' THEN ventasVendedor.totalVendido ELSE 0 END AS Octubre,
CASE WHEN mes.nombreMes = 'Noviembre ' THEN ventasVendedor.totalVendido ELSE 0 END AS Noviembre,
CASE WHEN mes.nombreMes = 'Diciembre ' THEN ventasVendedor.totalVendido ELSE 0 END AS Diciembre


from ventasVendedor inner join vendedor on  vendedor.idVendedor=ventasVendedor.idVendedor inner join mes on mes.idMes =ventasVendedor.idMes ) ;




create view pagos3 as (
  select
    nombre,idVendedor,idVentasVendedor,
    sum(Enero) as Enero,
    sum(Febrero) as Febrero,
    sum(Marzo) as Marzo,
    sum(Abril) as Abril,
	sum(Mayo) as Mayo,
    sum(Junio) as Junio,
    sum(Julio) as Julio,
    sum(Agosto) as Agosto,
    sum(Septiembre) as Septiembre,
    sum(Octubre) as Octubre,
	sum(Noviembre) as Noviembre,
	sum(Diciembre) as Diciembre

  from pagos
  group by nombre
);

select * from pagos3;




select * from pagos3;

select * from ventasvendedor;



