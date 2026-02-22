const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "article",
  password: "root",
  port: 5432,
});


app.post("/article", async (req, res) => {
  try {
    const { title, content } = req.body;

    const result = await pool.query(
      "INSERT INTO articles(title, content) VALUES($1,$2) RETURNING *",
      [title, content]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Insert failed");
  }
});

app.get("/articles", async (req, res) => {
  const result = await pool.query("SELECT * FROM articles");
  res.json(result.rows);
});

app.listen(3000, () => console.log("Server running on port 3000"));