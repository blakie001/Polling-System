import express from 'express';
import { createPoll , getPollResults} from "../controllers/poll.controller.js";

const router = express.Router();

router.post('/', createPoll);

router.get('/:id', getPollResults);

export default router;