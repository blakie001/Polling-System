import { Kafka } from 'kafkajs';


export const kafkaInstance = new Kafka({
    clientId: "polling-system",
    brokers: ["localhost:9092"],
})
