import { kafkaInstance } from "../config/kafka.config";

const admin = kafkaInstance.admin();

// call carefully
export const createTopic = async (topicName) => {
  try {
    await admin.connect();
    console.log("Connected to Kafka admin");

    // Check if the topic already exists
    const topics = await admin.listTopics();
    if (topics.includes(topicName)) {
      console.log(`Topic "${topicName}" already exists`);
    } else {
      await admin.createTopics({
        topics: [
          {
            topic: topicName,
            numPartitions: 1,
            replicationFactor: 1,
          },
        ],
      });
      console.log(`Topic "${topicName}" created successfully`);
    }
    admin.disconnect();
  } catch (err) {
    console.error("Error creating topic:", err);
  } finally {
    await admin.disconnect();
  }
};
