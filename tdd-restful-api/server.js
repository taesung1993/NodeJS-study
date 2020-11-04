import express from "express";
import bodyParser from "body-parser";
import apiRouter from "./Routers/apiRouter";

const app = express();

app.use(bodyParser.json());
app.use("/", apiRouter);

app.get("/", (req, res) => {
  res.send("TEST DRIVEN DEVELOPMENT USING RESTFUL API");
});

app.listen(3000, () => console.log("✅Listening On: http://localhost:3000"));

export default app;
