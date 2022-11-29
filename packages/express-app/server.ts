import express from 'express';
const app = express();
const port = 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.get("/", (req, res) => {
  res.json({ foo: "bar" });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
