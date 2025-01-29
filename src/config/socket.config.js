import { Server } from "socket.io";

export const createSocketConnection = (server) => {
  const io = new Server(server, {
      cors: {
          origin: "*",
          methods: ["GET", "POST"]
      },
  });

  io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("disconnect", () => {
          console.log("Client disconnected:", socket.id);
      });
  });

  return io;
};
