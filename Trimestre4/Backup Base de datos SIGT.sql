CREATE DATABASE  IF NOT EXISTS `sigt` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci */;
USE `sigt`;
-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: sigt
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.32-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `asistencias`
--

DROP TABLE IF EXISTS `asistencias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `asistencias` (
  `id_Asistencia` int(11) NOT NULL COMMENT 'Identificador unico de la asistencia',
  `Fecha` date NOT NULL COMMENT 'Fecha de la asistencia',
  `Hora_Entrada` time NOT NULL COMMENT 'Hora de entrada',
  `Hora_Salida` time DEFAULT NULL COMMENT 'Hora de salida',
  `Incapacidad` tinyint(4) DEFAULT 0 COMMENT 'Indicador de si hubo incapacidad',
  `Persona_NumeroDocumento` int(11) NOT NULL COMMENT 'Clave foranea a la persona'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Registra las asistencias diarias del personal con hora de entrada y salida y si llegan a tener incapacidad.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `asistencias`
--

LOCK TABLES `asistencias` WRITE;
/*!40000 ALTER TABLE `asistencias` DISABLE KEYS */;
INSERT INTO `asistencias` VALUES (1,'2025-06-03','07:45:00','13:00:00',0,1028662069),(2,'2025-06-04','08:10:00','14:30:00',1,1028662070),(3,'2025-06-05','07:30:00','12:45:00',0,52825476),(4,'2025-06-06','08:00:00','15:10:00',1,1000614667),(5,'2025-06-07','07:50:00','13:45:00',0,51763011),(6,'2025-06-08','08:20:00','14:00:00',0,1000619238),(7,'2025-06-09','08:00:00','16:00:00',1,41754180);
/*!40000 ALTER TABLE `asistencias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `detalleventas`
--

DROP TABLE IF EXISTS `detalleventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `detalleventas` (
  `Venta_idVenta` int(11) NOT NULL COMMENT 'Clave foranea a la venta',
  `Productos_idProducto` int(11) NOT NULL COMMENT 'Clave foranea al producto vendido'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Relaciona productos con cada venta realizada (detalle por producto).';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `detalleventas`
--

LOCK TABLES `detalleventas` WRITE;
/*!40000 ALTER TABLE `detalleventas` DISABLE KEYS */;
INSERT INTO `detalleventas` VALUES (1,1167),(2,1859),(3,3047),(4,3346),(5,3953),(6,5468),(7,5481),(8,5789),(9,6409),(10,6534),(11,6562),(12,6694),(13,6701),(14,8637),(15,9663);
/*!40000 ALTER TABLE `detalleventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `diseños`
--

DROP TABLE IF EXISTS `diseños`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `diseños` (
  `idDiseño` int(11) NOT NULL COMMENT 'Identificador del diseño',
  `TipoDiseño` varchar(45) NOT NULL COMMENT 'Tipo o categoria de diseño',
  PRIMARY KEY (`idDiseño`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contiene los tipos de diseño asociados a los productos.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `diseños`
--

LOCK TABLES `diseños` WRITE;
/*!40000 ALTER TABLE `diseños` DISABLE KEYS */;
INSERT INTO `diseños` VALUES (119,'Jovenes Titanes'),(138,'Buzz light year'),(145,'Picachu'),(159,'Bob Esponja'),(174,'Tom y Jerry'),(176,'Naruto'),(198,'Simpson'),(213,'Princesas'),(218,'Transformers'),(229,'Bicicletas'),(250,'Garfield'),(321,'Mohana'),(328,'Mickey Mouse'),(334,'Pantera Rosa'),(369,'Lilo y Stich'),(386,'Calaveras/Catrinas'),(401,'Toy Story'),(402,'Super héroes'),(452,'Popeye'),(457,'Come galletas'),(471,'Osos escandalosos'),(490,'PICA PIEDRAS'),(503,'Minions'),(508,'Frida'),(527,'Batman'),(594,'PHINEAS Y FERB'),(618,'Baby Yoda'),(632,'Plumas'),(645,'Looney Tunes'),(653,'Vegeta'),(672,'Mario y Luigi'),(673,'Mafalda'),(684,'Frozen'),(711,'Rugrats'),(726,'Patrulla Canina'),(737,'Sonic'),(748,'Muñeca LOL'),(773,'Unicornio'),(785,'Cerditos'),(824,'Dragon Ball'),(845,'Cars'),(857,'Doctora Juguetes'),(869,'Monsters INC'),(908,'Pizza'),(912,'Atrapasueños'),(936,'Dinosaurios'),(964,'Aguacates'),(967,'Coco'),(980,'Avengers'),(982,'Elmo');
/*!40000 ALTER TABLE `diseños` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `horarios`
--

DROP TABLE IF EXISTS `horarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `horarios` (
  `id_Horario` int(11) NOT NULL COMMENT 'Identificador unico del horario',
  `Dia` int(11) NOT NULL COMMENT 'Dia de la semana',
  `Hora_Inicio` time NOT NULL COMMENT 'Hora de inicio del turno',
  `Hora_Fin` time NOT NULL COMMENT 'Hora de fin del turno',
  `Persona_NumeroDocumento` int(11) NOT NULL COMMENT 'Clave foranea a persona',
  PRIMARY KEY (`id_Horario`),
  KEY `Persona_NumeroDocumento` (`Persona_NumeroDocumento`),
  CONSTRAINT `horarios_ibfk_1` FOREIGN KEY (`Persona_NumeroDocumento`) REFERENCES `persona` (`NumeroDocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Define los horarios laborales asignados a cada persona.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `horarios`
--

LOCK TABLES `horarios` WRITE;
/*!40000 ALTER TABLE `horarios` DISABLE KEYS */;
INSERT INTO `horarios` VALUES (1,2,'07:45:00','13:00:00',1028662069),(2,3,'08:10:00','14:30:00',1028662070),(3,4,'07:30:00','12:45:00',52825476),(4,5,'08:00:00','15:10:00',1000614667),(5,6,'07:50:00','13:45:00',51763011),(6,7,'08:20:00','14:00:00',1000619238),(7,1,'08:00:00','16:00:00',41754180);
/*!40000 ALTER TABLE `horarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `persona`
--

DROP TABLE IF EXISTS `persona`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `persona` (
  `NumeroDocumento` int(11) NOT NULL COMMENT 'Identificador unico de la persona',
  `TipoDocumento` varchar(45) NOT NULL COMMENT 'Tipo de documento (CC, TI, etc.)',
  `Primer_Nombre` varchar(45) NOT NULL COMMENT 'Primer nombre de la persona',
  `Segundo_Nombre` varchar(45) DEFAULT NULL COMMENT 'Segundo nombre de la persona',
  `Primer_Apellido` varchar(45) NOT NULL COMMENT 'Primer apellido de la persona',
  `Segundo_Apellido` varchar(45) DEFAULT NULL COMMENT 'Segundo apellido de la persona',
  `rolPersona` varchar(45) NOT NULL COMMENT 'Rol general de la persona',
  `Correo` varchar(45) NOT NULL COMMENT 'Correo electronico de la persona',
  `Telefono` varchar(20) NOT NULL COMMENT 'Numero de telefono de la persona',
  `Contrasena` varchar(255) NOT NULL COMMENT 'Contrasena de acceso',
  PRIMARY KEY (`NumeroDocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Almacena los datos personales de todos los usuarios del sistema.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `persona`
--

LOCK TABLES `persona` WRITE;
/*!40000 ALTER TABLE `persona` DISABLE KEYS */;
INSERT INTO `persona` VALUES (41754180,'CC','Concepcion',NULL,'Rodríguez',NULL,'Empleado','concharodriguez1359@gmail.com','3213664955','70ccab8935fb0d039fecc018ec88bb13a76a7124fdfc5'),(51763011,'CC','Gladys',NULL,'Rodríguez',NULL,'Empleado','qgla06@gmail.com','300 2599802','d96d9ea5fd3ddc92ac23b61dd12b0d08756c12bce98d8'),(52825476,'CC','Yerly','Maritza','Cruz','Rodríguez','Administrador','yerly0718@hotmail.com','305 7291000','4f86adfff146925f366d6a65cb8c1cbd9f05dff0152b9'),(1000614667,'CC','Lina','Paola','Hernández','Cruz','Administrador','linaphernandez21@gmail.com','304 6005887','6bd9b94ad637c13b6e116bd03fa2b5506be46cfd2c750'),(1000619238,'CC','Javier','David','Hernández','Cruz','Empleado','mipez0120@gmail.com','3058758337','6d59f40a462b4453089276b443913764d16f5a4dd1db0'),(1000729832,'CC','Sandra',NULL,'Cruz',NULL,'Empleado','sandracruzc123@gmail.com','3124567890','297289b00361bb6e7947a0f2401ca1fc4b3c7eed805ac'),(1001001001,'CC','Camila','Sofía','Martínez','López','Empleado','camila.martinez@example.com','3101234567','8549e7e0a5c6b3addd9b815bc49d127f1f039523830e2'),(1002002002,'CC','Juan','Sebastián','García','Morales','Cliente','juan.sebastian@example.com','3119876543','be70a17a7d599ad0d202fdec7780295ccaab3be69b107'),(1003003003,'CC','Valentina','Isabel','Rodríguez','Pérez','Cliente','valen.isabel@example.com','3124567890','b51fd22915dab2da852f75e8ba7149e3e71c3d9aa1844'),(1004004004,'CC','Mateo','Andrés','Ramírez','Gómez','Cliente','mateo.ramirez@example.com','3137890123','7a86a2960e24cbe769e105d3e7aebdadf40b94f5244ba'),(1005005005,'CC','Daniela','María','Ruiz','Torres','Cliente','daniruiz@example.com','3142345678','e9e0de5b02bd6e98a927c0c97f80168b96a4831a759e9'),(1006006006,'CC','Santiago','Iván','Ortiz','Navarro','Cliente','santiago.ortiz@example.com','3158765432','54ce49e3b13619de6e7115945a227b20acbc45f811679'),(1007007007,'CC','Isabella','Fernanda','Castro','Díaz','Cliente','isa.castro@example.com','3163456789','4bcce151e61061701cc8c513f5781b1c2521823fc5cbf'),(1008008008,'CC','Tomás','Emilio','Mejía','Salazar','Cliente','tomas.mejia@example.com','3179012345','2014b55bd4fa0679af85049c8d01d7caf47a178258c21'),(1009009009,'CC','Luciana','Gabriela','Suárez','Cano','Cliente','luciana.suarez@example.com','3187654321','152799449a7767ba48d490b978b54d712c1226a619112'),(1010010010,'CC','Emilio','Ricardo','Vega','Padilla','Cliente','emilio.vega@example.com','3191122334','4694349b720866611a73f8b349d8f3a50d57375855d49'),(1028662069,'CC','Juan','Camilo','Cruz','Borja','Empleado','camilocruz2018@gmail.com','3204244741','a16fbb5303a0404efcecb954aa02ed6dfaed1f5109e1d'),(1028662070,'CC','Juan','Esteban','Cruz','Borja','Empleado','juancruzborja7892@gmail.com','3123198280','8794fac86b0c4cfae1b321ac9d75414d44345096afbc0'),(1029384756,'CC','Carlos','Mario','Gómez','López','Cliente','carlosgomez98@gmail.com','3007894561','24d9cf486f840b8efa9994fae6a3fbcb6f158d804a142'),(1088007221,'CC','Luis','Alberto','Mendoza','Cruz','Cliente','luismendoza343@gmail.com','3013215400','a48377abbaba0294a8599ae8dde94aa6a19f87a390d82'),(1098765432,'CC','Andrea','Lucía','Pérez','Torres','Cliente','andrealu23@gmail.com','3123456789','ca699bc47a82438ab31595a12375fb9991776d0f84e22'),(1192809495,'CC','Paula','Andrea','Hernández','Rodríguez','Cliente','pauhernandez1192@gmail.com','3106219870','ca699bc47a82438ab31595a12375fb9991776d0f84e22');
/*!40000 ALTER TABLE `persona` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `productos`
--

DROP TABLE IF EXISTS `productos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `productos` (
  `idProducto` int(11) NOT NULL COMMENT 'Identificador del producto',
  `NombreProducto` varchar(45) NOT NULL COMMENT 'Nombre del producto',
  `Precio` varchar(45) NOT NULL COMMENT 'Precio del producto',
  PRIMARY KEY (`idProducto`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Guarda el listado de productos disponibles para la venta.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `productos`
--

LOCK TABLES `productos` WRITE;
/*!40000 ALTER TABLE `productos` DISABLE KEYS */;
INSERT INTO `productos` VALUES (1167,'PIJAMA CON BUSO CUELLO REDONDO NIÑOS','50000'),(1859,'PIJAMA NIÑOS TALLA (2-8)','40000'),(3047,'PIJAMA MUJER PANTALONETA + CAMISETA MANGA LAR','40000'),(3346,'SOLO PANTALÓN NIÑO','25000'),(3953,'PIJAMA HOMBRE PANTALON + CAMISETA MANGA LARGA','60000'),(5468,'SOLO PANTALON HOMBRE','40000'),(5481,'PIJAMA NIÑOS TALLA (10-16)','45000'),(5789,'SOLO PANTALON MUJER','35000'),(6409,'PIJAMA CON BUSO CON CAPOTA NIÑOS','55000'),(6534,'PIJAMA BATOLA','40000'),(6562,'PIJAMA CON BUSO CUELLO REDONDO ADULTO','70000'),(6694,'PIJAMA HOMBRE PANTALONETA  + CAMISETA MANGA L','50000'),(6701,'PIJAMA MUJER PANTALON + CAMISETA MANGA LARGA ','50000'),(8637,'SOLO PANTALON NIÑO PEQUEÑO','20000'),(9663,'PIJAMA CON BUSO CON CAPOTA ADULTO','75000');
/*!40000 ALTER TABLE `productos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tareas`
--

DROP TABLE IF EXISTS `tareas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tareas` (
  `idTarea` int(11) NOT NULL COMMENT 'Identificador unico de la tarea',
  `Descripcion` varchar(100) NOT NULL COMMENT 'Descripcion general de la tarea',
  `FechaAsignacion` datetime NOT NULL COMMENT 'Fecha y hora de asignacion',
  `FechaLimite` datetime NOT NULL COMMENT 'Fecha y hora limite para entrega',
  `EstadoTarea` varchar(45) NOT NULL COMMENT 'Estado actual de la tarea (pendiente, etc.)',
  `Prioridad` varchar(45) NOT NULL COMMENT 'Prioridad de la tarea',
  `TipoDePersona_Persona_NumeroDocumento` int(11) NOT NULL COMMENT 'Clave foranea a tipo de persona',
  PRIMARY KEY (`idTarea`),
  KEY `TipoDePersona_Persona_NumeroDocumento` (`TipoDePersona_Persona_NumeroDocumento`),
  CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`TipoDePersona_Persona_NumeroDocumento`) REFERENCES `tipodepersonas` (`Persona_NumeroDocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Contiene las tareas asignadas a los diferentes roles del personal.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tareas`
--

LOCK TABLES `tareas` WRITE;
/*!40000 ALTER TABLE `tareas` DISABLE KEYS */;
INSERT INTO `tareas` VALUES (157,'Publica y gestiona contenido en redes.','2025-06-29 00:00:00','2025-07-05 00:00:00','terminada','Media',1028662069),(258,'Recibe y anota los pedidos','2025-06-30 00:00:00','2025-07-04 00:00:00','terminada','Alta',1000619238),(264,'Haz los dobladillos con la collarín.','2025-06-28 00:00:00','2025-07-01 00:00:00','Sin terminar','Alta',51763011),(369,'Cose y ensambla las prendas.','2025-06-29 00:00:00','2025-07-02 00:00:00','sin Terminar','Media',1000614667),(751,'Responde dudas y atiende quejas.','2025-06-28 00:00:00','2025-07-03 00:00:00','terminada','Media',41754180),(852,'Atiende y vende a los clientes.','2025-06-28 00:00:00','2025-07-01 00:00:00','terminada','Alta',51763011),(867,'Entrega los pedidos a domicilio.','2025-06-29 00:00:00','2025-07-04 00:00:00','Sin terminar','Alta',1028662070),(953,'Filetea los bordes de las prendas.','2025-06-30 00:00:00','2025-07-03 00:00:00','terminada','Media',1028662070),(963,'Corta la tela según los moldes.','2025-06-28 00:00:00','2025-06-30 00:00:00','terminada','Media',1028662070);
/*!40000 ALTER TABLE `tareas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipodepersonas`
--

DROP TABLE IF EXISTS `tipodepersonas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipodepersonas` (
  `Persona_NumeroDocumento` int(11) NOT NULL COMMENT 'Clave foranea a personas',
  `RolPersona` varchar(45) NOT NULL COMMENT 'Rol especifico asignado a esa persona',
  PRIMARY KEY (`Persona_NumeroDocumento`),
  CONSTRAINT `tipodepersonas_ibfk_1` FOREIGN KEY (`Persona_NumeroDocumento`) REFERENCES `persona` (`NumeroDocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Define los roles o tipos asociados a cada persona (ej. cliente, empleado).';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipodepersonas`
--

LOCK TABLES `tipodepersonas` WRITE;
/*!40000 ALTER TABLE `tipodepersonas` DISABLE KEYS */;
INSERT INTO `tipodepersonas` VALUES (41754180,'empleado'),(51763011,'empleado'),(52825476,'administrador'),(1000614667,'empleado'),(1000619238,'empleado'),(1000729832,'cliente'),(1001001001,'cliente'),(1002002002,'cliente'),(1003003003,'cliente'),(1004004004,'cliente'),(1005005005,'cliente'),(1006006006,'cliente'),(1007007007,'cliente'),(1008008008,'cliente'),(1009009009,'cliente'),(1010010010,'cliente'),(1028662069,'empleado'),(1028662070,'empleado'),(1029384756,'cliente'),(1088007221,'cliente'),(1098765432,'cliente'),(1192809495,'cliente');
/*!40000 ALTER TABLE `tipodepersonas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ventas`
--

DROP TABLE IF EXISTS `ventas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ventas` (
  `idVenta` int(11) NOT NULL COMMENT 'Identificador unico de la venta',
  `total` varchar(45) NOT NULL COMMENT 'Total en dinero de la venta',
  `fecha` datetime NOT NULL COMMENT 'Fecha y hora de la venta',
  `Productos_idProducto` int(11) NOT NULL COMMENT 'Clave foranea a productos',
  `Diseño_idDiseño` int(11) NOT NULL COMMENT 'Clave foranea a disenos',
  `TipoDePersona_Persona_NumeroDocumento1` int(11) NOT NULL COMMENT 'Clave foranea a tipo de persona',
  PRIMARY KEY (`idVenta`),
  KEY `Diseño_idDiseño` (`Diseño_idDiseño`),
  KEY `TipoDePersona_Persona_NumeroDocumento1` (`TipoDePersona_Persona_NumeroDocumento1`),
  CONSTRAINT `ventas_ibfk_1` FOREIGN KEY (`Diseño_idDiseño`) REFERENCES `diseños` (`idDiseño`),
  CONSTRAINT `ventas_ibfk_2` FOREIGN KEY (`TipoDePersona_Persona_NumeroDocumento1`) REFERENCES `tipodepersonas` (`Persona_NumeroDocumento`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci COMMENT='Registra las ventas realizadas, incluyendo diseño y producto.';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ventas`
--

LOCK TABLES `ventas` WRITE;
/*!40000 ALTER TABLE `ventas` DISABLE KEYS */;
INSERT INTO `ventas` VALUES (1,'60000','2025-06-27 10:00:00',0,527,1000729832),(2,'50000','2025-06-27 11:30:00',0,145,1001001001),(3,'40000','2025-06-28 09:20:00',0,908,1002002002),(4,'50000','2025-06-28 13:15:00',0,632,1003003003),(5,'45000','2025-06-29 16:00:00',0,401,1004004004),(6,'40000','2025-06-29 14:40:00',0,773,1005005005),(7,'50000','2025-06-30 08:30:00',0,594,1006006006),(8,'55000','2025-06-30 10:45:00',0,869,1007007007),(9,'35000','2025-07-01 15:10:00',0,321,1008008008),(10,'25000','2025-07-01 11:00:00',0,748,1009009009),(11,'20000','2025-07-02 09:45:00',0,119,1010010010),(12,'40000','2025-07-02 14:20:00',0,684,1028662069),(13,'40000','2025-07-03 12:30:00',0,857,1028662070),(14,'50000','2025-07-03 16:10:00',0,213,1029384756),(15,'55000','2025-07-04 10:50:00',0,936,1088007221),(16,'60000','2025-07-04 13:30:00',0,726,1098765432);
/*!40000 ALTER TABLE `ventas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'sigt'
--
/*!50003 DROP FUNCTION IF EXISTS `calcularHoras` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `calcularHoras`(`hora_inicio` TIME, `hora_fin` TIME) RETURNS decimal(5,2)
    DETERMINISTIC
BEGIN
RETURN TIME_TO_SEC(TIMEDIFF(hora_fin, hora_inicio)) / 3600;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `diaSemana` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `diaSemana`(`fecha` DATE) RETURNS varchar(10) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
    DETERMINISTIC
BEGIN
RETURN DAYNAME(fecha);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `encriptarContrasena` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `encriptarContrasena`(`p_contrasena` VARCHAR(255)) RETURNS varchar(64) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
    DETERMINISTIC
BEGIN
    RETURN SHA2(p_contrasena, 256);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `encriptar_contraseña` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `encriptar_contraseña`(`p_contrasena` VARCHAR(255)) RETURNS varchar(64) CHARSET utf8mb4 COLLATE utf8mb4_general_ci
    DETERMINISTIC
BEGIN
    RETURN SHA2(p_contrasena, 256);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `actualizar_persona` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `actualizar_persona`(IN `doc` INT, IN `nuevo_nombre1` VARCHAR(45), IN `nuevo_nombre2` VARCHAR(45), IN `nuevo_apellido1` VARCHAR(45), IN `nuevo_apellido2` VARCHAR(45), IN `nuevo_rol` VARCHAR(45), IN `nuevo_correo` VARCHAR(45), IN `nuevo_telefono` VARCHAR(20), IN `nueva_contrasena` VARCHAR(255))
BEGIN
    UPDATE persona SET
        Primer_Nombre = nuevo_nombre1,
        Segundo_Nombre = nuevo_nombre2,
        Primer_Apellido = nuevo_apellido1,
        Segundo_Apellido = nuevo_apellido2,
        rolPersona = nuevo_rol,
        Correo = nuevo_correo,
        Telefono = nuevo_telefono,
        Contrasena = encriptarContrasena(nueva_contrasena)
    WHERE numeroDocumento = doc;
    end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `eliminar_persona` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `eliminar_persona`(IN `doc` INT)
BEGIN
DELETE FROM persona
WHERE NumeroDocumento = doc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `encriptarContraseña` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `encriptarContraseña`(IN `p_numero_documento` INT, IN `p_contraseña_plain` VARCHAR(255))
BEGIN
    UPDATE persona
    SET Contrasena = encriptar_contraseña(p_contraseña_plain)
    WHERE NumeroDocumento = p_numero_documento;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `insertar_persona` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertar_persona`(IN `doc` INT, IN `tipo_doc` VARCHAR(45), IN `nombre1` VARCHAR(45), IN `nombre2` VARCHAR(45), IN `apellido1` VARCHAR(45), IN `apellido2` VARCHAR(45), IN `rol` VARCHAR(45), IN `correo` VARCHAR(45), IN `telefono` VARCHAR(20), IN `contrasena_plana` VARCHAR(255))
BEGIN
IF NOT EXISTS (SELECT 1 FROM persona WHERE NumeroDocumento = doc) THEN
INSERT INTO persona (NumeroDocumento, TipoDocumento, Primer_Nombre, Segundo_Nombre, Primer_Apellido, Segundo_Apellido, rolPersona, Correo, Telefono, Contrasena)
VALUES (doc, tipo_doc, nombre1, nombre2, apellido1, apellido2, rol, correo, telefono, encriptarContrasena(contrasena_plana));
END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `obtener_persona` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `obtener_persona`(IN `doc` INT)
BEGIN
SELECT * FROM persona
WHERE NumeroDocumento = doc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-08 21:05:12
