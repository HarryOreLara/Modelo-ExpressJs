//Importaciones de ejecucion
require("dotenv").config();
//const { version } = require("./package.json")
//Importaciones de express
const express = require("express");
const cors = require("cors");




//para conectar con rabit
const amqp = require('amqplib');
const queueName = 'cola_prueba'; // Reemplaza 'nombre_de_la_cola' por el nombre de tu cola RabbitMQ




//CONFIGURACIONES de variables de entorno
const app = express();
const path = require("path");

const connecting = require("./src/consumer/smsConsumer");
const { error } = require("console");

app.use(cors());
app.use(express.json());


app.use("/", express.static(__dirname + "/src/public"));



function intensiveOperation(){//Prueba integrada
    let i = 1e0;
    while(i--){}
}



// async function connectToRabbitMQ() {
//     const connection = await amqp.connect(process.env.RABBIT_CONNECTION);
//     const channel = await connection.createChannel();

//     await channel.assertQueue(queueName);
//     channel.consume(queueName, message=>{
//         const content = JSON.parse(message.content.toString());

//         //intensiveOperation();

//         console.log(`Se encontro el mensaje de ${queueName}`);
//         console.log(content);

//         channel.ack(message);//Esto nos sirve para matar el mensaje luego de procesarlo


//     });
// }


// connectToRabbitMQ()
// .catch(error=>{
//     console.log(error);
//     process.exit(1);
// })



connecting(queueName)
.catch(error=>{
    console.log(error);
    process.exit(1);
})

//SERVER
app.listen(process.env.PORT, () => {
    console.log("Aplicacion corriendo en el puerto 3033");
})