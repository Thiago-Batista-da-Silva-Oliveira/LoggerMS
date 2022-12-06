import amqp from 'amqplib'
import { rabbitMQ } from './config.js';

export class Producer {
    channel;

    async createChannel () {
        const connection = await amqp.connect(rabbitMQ.url)
        this.channel = await connection.createChannel()
    }

    async publishMessage(routingKey, message) {
        if(!this.channel) {
            await this.createChannel()
        }

        await this.channel.assertExchange(rabbitMQ.exchangeName, 'direct')
        const logDeatils = {
                logType: routingKey,
                mesage: message,
                dateTime: new Date(),
        }
        await this.channel.publish(
            exchangeName,
            routingKey,
            Buffer.from(
                JSON.stringify(logDeatils)
            )
        )

        console.log(`The message ${message} is sent to exchange ${rabbitMQ.exchangeName}`)
    }
}
