import { Kafka } from "kafkajs";

const kafka = new Kafka({
    brokers: ['localhost:9193']
})

const consumer = kafka.consumer({
    groupId: 'group3',
    allowAutoTopicCreation: true,
})

const connectConsumer = async () => {
    try {
        await consumer.connect()

        console.log(`consumer connected`)

        await consumer.subscribe({ topic: 'test', fromBeginning: true })
    } catch (e) {
        console.error(`consumer disconnected`)
        throw e
    }
}

const start = async () => {
    try {
        await connectConsumer()

        await consumer.run({
            eachMessage: async (payload) => {
                try {
                    // console.log({ payload });
                    const message = payload.message.value?.toString('utf-8')
                    console.log({ message });
                } catch (e) {
                    throw e
                }
            }
        })

    } catch (e) {
        throw e
    }
}

start()