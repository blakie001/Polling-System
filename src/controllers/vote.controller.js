import { pool } from "../db/db.connection.js";
import { fetchPollQues, fetchPollOptionsWithPollId, getLeaderboard} from "../db/queries.js";
import { sendMessage } from "../kafka/producer.kafka.js";
import { io } from "socket.io-client";

export const newVote = async (req, res) => {
    try {
        const { id } = req.params;
        const { optionId } = req.body;

        if (!id || !optionId || isNaN(Number(id)) || isNaN(Number(optionId))) {
            return res.status(400).json("Invalid Poll ID or Option ID");
        }

        const isPoll = await pool.query(fetchPollQues, [id]);
        if (isPoll.rows.length === 0) {
            return res.status(404).json("Poll Not Found");
        }

        const isOptions = await pool.query(fetchPollOptionsWithPollId, [optionId, id]);
        if (isOptions.rows.length === 0) {
            return res.status(404).json("Option not found for the given Poll");
        }

        const voteMessage = { pollId: id, optionId };
        await sendMessage("poll_votes", voteMessage);

        const { rows: updatedLeaderboard } = await pool.query(getLeaderboard);
        req.app.get("socket").emit("leaderboard-update", updatedLeaderboard);

        return res.status(200).json("Vote submitted successfully");
    } catch (error) {
        console.log("Error Voting", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getLeaderboardData = async(req, res) =>{
    try {
        const { rows: leaderboard } = await pool.query(getLeaderboard);
        req.app.get("socket").emit("leaderboard-update", leaderboard);
        // io.emit("leaderboard-update", leaderboard);

        return res.status(200).json({ data: leaderboard });
    } catch (error) {
        console.log("Error fetching leaderboard:", error);
        return res.status(500).json("Interval Server Error");
    }
}