import { pool } from "../db/db.connection.js";
import { createNewPoll, createNewPollOptions, fetchPollQues, fetchPollOptions} from "../db/queries.js";

export const createPoll = async(req, res) =>{
    try {
        const { question, options } = req.body;

        if(!question) {
            return res.status(400).json("Please Enter Question");
        }
        if(options.length < 2) {
            return res.status(400).json("Please Enter Atleast two or more options");
        }
        if(!Array.isArray(options)) {
            return res.status(400).json("Invalid Input");
        }

        const newPool = await pool.query(
            createNewPoll,
            [question]
        );

        const pollId = newPool.rows[0].id;

        const optionPromises = options.map((option) =>{
            pool.query( createNewPollOptions,
                [pollId, option]
            )
        })

        await Promise.all(optionPromises);

        return res.status(200).json({
            message: "Poll created successfully",
            pollId,
            question,
            options
        });

    } catch (error) {
        console.error(error);
        res.status(500).json("Failed to create poll");
    }
}

export const getPollResults = async(req, res) =>{
    try {
        const { id } = req.params;
        if(!id) {
            return res.status(404).json("Id Not found");
        }
        const pollResult = await pool.query(
            fetchPollQues,
            [id]
        );
        if(pollResult.rows.length === 0) {
            return res.status(404).json("Poll Not Found");
        }

        const poll = pollResult.rows[0];

        const optionsResult = await pool.query(
            fetchPollOptions,
            [id]
        )
        poll.options = optionsResult.rows;

        return res.status(200).json(poll);
    } catch (error) {
        console.error(error);
        return res.status(500).json("An error occurred while fetching the poll");
    }
}