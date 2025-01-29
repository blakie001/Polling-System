
Before running the project, make sure you have the following installed on your system:

- **Node.js**
- **Docker** (for containerizing Kafka, Zookeeper, and your application)
- **Docker Compose** (to manage multi-container Docker applications)
- **PostgreSQL** (for the database, set up in `Neon.tech` or locally)
- **Kafka** and **Zookeeper** (can be run using Docker)

## Project Structure

- `index.js`: The main entry point for the application, where the server is initialized.
- `socket.config.js`: Contains the Socket.IO WebSocket server configuration.
- `kafka/consumer.kafka.js`: Kafka consumer for processing messages.
- `db/queries.js`: SQL queries for interacting with the PostgreSQL database.
- `routes/poll.routes.js`: Routes related to polls.
- `routes/vote.routes.js`: Routes related to voting.

## Docker Setup

To get Kafka, Zookeeper, and your Node.js app up and running, Docker Compose is used to set up the necessary services.

### Step 1: Clone the repository


git clone https://github.com/yourusername/polling-system.git
cd polling-system

### Step 2: Install dependencies
Install Node.js dependencies for the backend:

npm install

### Step 3: Configure .env file

DATABASE_URL=postgresql://pollingDb_owner:npg_fH0z4oudnQBw@ep-ancient-snow-a50aegpo-pooler.us-east-2.aws.neon.tech/pollingDb?sslmode=require

Step 4: Docker Setup for Kafka and Zookeeper

docker-compose up -d
docker-compose ps

Step 5: Run the Application

npm start



For Step 7: Frontend Integration (only for real time leaderboard fetching) : 


save the file "test-socket.html" in your desktop

run this command in new terminal "/cd desktop"
http-server

then go to this link in your browser : "http://localhost:8080/test.html"
