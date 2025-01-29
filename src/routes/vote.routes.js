import express from "express";
import { newVote , getLeaderboardData} from "../controllers/vote.controller.js";

const router = express.Router();

router.post("/polls/:id/vote", newVote);

router.get("/leaderboard", getLeaderboardData);

export default router;