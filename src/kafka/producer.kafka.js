import { kafkaInstance } from "../config/kafka.config.js";

const producer = kafkaInstance.producer();
let isProducerConnected = false;

export const connectProducer = async () => {
    try {
        await producer.connect();
        isProducerConnected = true;
        console.log("Kafka Producer Running");
    } catch (error) {
        console.log("Error connecting Kafka Producer:", error);
    }
};

export const sendMessage = async (topic, message) => {
    try {
        if (!isProducerConnected) {
            await connectProducer();
        }
        // for(let i = 0; i<100; i++) {
        //     await producer.send({topic, messages: [{value: JSON.stringify(message)}]})
        //     console.log("done for : ", i);
        // }

        await producer.send({
            topic,
            messages: [{ value: JSON.stringify(message) }],
        });
        console.log(`Message sent to Kafka Topic: ${topic}`);
    } catch (error) {
        console.log("Error sending message to Kafka:", error);
    }
};

export const disconnectProducer = async () => {
    try {
        await producer.disconnect();
        isProducerConnected = false; // Update the flag
        console.log("Kafka Producer Disconnected");
    } catch (error) {
        console.log("Error disconnecting Kafka Producer:", error);
    }
};
