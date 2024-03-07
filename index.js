const express = require("express");
const path = require("path");
const { getCached, setCache } = require("./redis");

const app = express();

app.use(express.static(path.join(__dirname, "static")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "static", "index.html"));
});

app.get("/hostname", (req, res) => {
  return res.json({ data: process.env.HOSTNAME });
});

app.get("/simulate-crash", (req, res) => {
  res.send("Simulating Server Crash!");
  console.log(`Oops Error. something went wrong! Crashing...`);
  process.exit(1);
});

app.get("/version", (req, res) => {
  res.json({ data: "1.0" });
});

app.get("/votes", async (req, res) => {
  res.json({
    data: [
      { name: "Senegal", votes: (await getCached("Senegal")) || 0 },
      { name: "Congo", votes: (await getCached("Congo")) || 0 },
    ],
  });
});

app.get("/vote/:country", async (req, res) => {
  const country = req.params.country;
  const votes = (await getCached(country)) || 0;
  await setCache(country, votes + 1);
  res.json({ data: "Voted!" });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`Application running on 0.0.0.0:${PORT}`));
