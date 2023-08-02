require("dotenv").config();
//para conectar con rabit
const amqp = require('amqplib');


async function connecting (queueName) {
    const conex = await amqp.connect('amqp://harry_manager:orelara@localhost:5672/');
    const channel = await conex.createChannel();
    await channel.assertQueue(queueName);
    channel.consume(queueName, message=>{
        const content = JSON.parse(message.content.toString());
        console.log(`Se encontro el mensaje de ${queueName}`);
        console.log(content);
        channel.ack(message);
    });
}


module.exports = connecting;

