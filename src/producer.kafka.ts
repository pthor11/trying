import { Kafka } from "kafkajs";

const kafka = new Kafka({
    clientId: 'test',
    brokers: ['localhost:9293'],
    ssl: false,
    sasl: undefined,
    connectionTimeout: 5000,
    requestTimeout: 60000,
})

const producer = kafka.producer({ allowAutoTopicCreation: true })

const connectProducer = async () => {
    try {
        await producer.connect()

        console.log(`producer connected`)
    } catch (e) {
        console.error(`producer disconnected`)
        throw e
    }
}

const start = async () => {
    try {
        await connectProducer()
        const record = await producer.send({ topic: 'test', messages: [{ value: 'world5' }] })
        
        console.log({ record });

    } catch (e) {
        throw e
    }
}

start()