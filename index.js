const express = require("express");

// Get routes to the variabel
const router = require("./src/routes");

const app = express();

const port = 3000;

app.use(express.json());

// Add endpoint grouping and router
app.use("/api/v1/", router);

const server = app.listen(port, () => console.log(`Listening on port ${port}!`));

server.on("SIGTERM", () => {
  server.close(() => {
    console.log("server closed");
  });
});
