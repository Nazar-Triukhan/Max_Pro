const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/api/renovation-request", (req, res) => {
  console.log("Дані з форми:", req.body);

  res.status(200).json({
    success: true,
    message: "Дані отримано",
    data: req.body,
  });
});

app.get("/", (req, res) => {
  res.send("Server is running");
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});