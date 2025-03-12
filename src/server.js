const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001; // Use Render's assigned port or default to 3001

app.get("/", (req, res) => {
  res.send("Hello from Render!");
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
