import express from 'express';
import { connectDB } from './db/db.connection.js';
import dotenv from 'dotenv';
import poolRoute from './routes/poll.routes.js';
import voteRoute from './routes/vote.routes.js';
import runConsumer from './kafka/consumer.kafka.js';
import http from 'http';
import { createSocketConnection } from './config/socket.config.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);

const io = createSocketConnection(server);

runConsumer(io);

connectDB();


app.set("socket", io);

app.use(express.json());
app.use('/polls', poolRoute);
app.use('/', voteRoute);

// Start the server
server.listen(port, () => {
  console.log(`Server is running at Port: ${port}`);
});
