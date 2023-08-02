//Importaciones de ejecucion
require("dotenv").config();


//Importaciones de express
const express = require("express");
const cors = require("cors");


//para conectar con rabit
const amqp = require('amqplib');
const queueName = 'cola_prueba'; // Reemplaza 'nombre_de_la_cola' por el nombre de tu cola RabbitMQ


//CONFIGURACIONES de variables de entorno
const app = express();

const connecting = require("./src/consumer/smsConsumer");

app.use(cors());
app.use(express.json());


app.use("/", express.static(__dirname + "/src/public"));



function intensiveOperation(){//Prueba integrada
    let i = 1e0;
    while(i--){}
}




connecting(queueName)
.catch(error=>{
    console.log(error);
    process.exit(1);
})





//SERVER
app.listen(process.env.PORT, () => {
    console.log("Aplicacion corriendo en el puerto 3033");
})