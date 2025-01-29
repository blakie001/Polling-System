export const createNewPoll = "INSERT INTO polls (question) VALUES ($1) RETURNING id"

export const createNewPollOptions = "INSERT INTO poll_options (poll_id, option_text) VALUES ($1, $2)"

export const fetchPollQues = "SELECT * FROM polls WHERE id = $1"

export const fetchPollOptions = "SELECT id, option_text, votes FROM poll_options WHERE poll_id = $1"

export const fetchPollOptionsWithPollId = "SELECT * FROM poll_options WHERE id = $1 AND poll_id = $2"

export const addNewVote = "UPDATE poll_options SET votes = votes + 1 WHERE poll_id = $1 AND id = $2"

export const getLeaderboard = "SELECT poll_options.poll_id, poll_options.id AS option_id, poll_options.option_text, poll_options.votes FROM poll_options ORDER BY votes DESC LIMIT 10;"