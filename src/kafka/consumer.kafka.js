import { kafkaInstance } from "../config/kafka.config.js";
import { addNewVote, getLeaderboard} from "../db/queries.js";
import { pool } from "../db/db.connection.js";
import { createSocketConnection } from "../config/socket.config.js";

let io;

const runConsumer = async (server) => {
  try {
    io = createSocketConnection(server);

    const consumer = kafkaInstance.consumer({ groupId: "polls-group" });
    await consumer.connect();
    console.log("Consumer connected to Kafka");

    await consumer.subscribe({ topic: "poll_votes", fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        try {
          const { pollId, optionId } = JSON.parse(message.value.toString());
          console.log(`Received Vote for Poll ID: ${pollId}, Option ID: ${optionId}`);

          await pool.query(
            addNewVote,
            [pollId, optionId]
          );

          console.log(`Vote proCessed for Poll ID: ${pollId}, Option ID: ${optionId}`);

          io.emit("vote-update", { pollId, optionId });

          const { rows: leaderboard } = await pool.query(getLeaderboard);
          console.log("Updated Leaderboard:", leaderboard);

        } catch (error) {
          console.log("Error processing poll in consumer", error);
        }
      },
    });
  } catch (error) {
    console.log("Error running Kafka consumer", error);
  }
};

export default runConsumer;
