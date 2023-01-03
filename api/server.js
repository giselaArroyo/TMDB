const express = require("express");
const app = express();
const db = require("./db");
const routes = require("./routes/index.js");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

const PORT = 3001;

db.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server listening on http://localhost:${PORT}`);
  });
});
