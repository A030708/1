const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json());

// PostgreSQL connection
const db = new Pool({
  user: "postgres",
  host: "localhost",
  database: "art",      
  password: "root",
  port: 5432,
});

// CREATE article
app.post("/article", async (req, res) => {
  const { title, content } = req.body;
  const result = await db.query(
    "INSERT INTO articles(title,content) VALUES($1,$2) RETURNING *",
    [title, content]
  );
  res.json(result.rows[0]);
});

// GET all articles
app.get("/articles", async (req, res) => {
  const result = await db.query("SELECT * FROM articles ORDER BY id");
  res.json(result.rows);
});

// DELETE one article
app.delete("/article/:id", async (req, res) => {
  const result = await db.query(
    "DELETE FROM articles WHERE id=$1 RETURNING *",
    [req.params.id]
  );

  if (result.rowCount === 0)
    return res.status(404).json({ message: "Article not found" });

  res.json({ message: "Deleted", article: result.rows[0] });
});

// DELETE all articles
app.delete("/articles", async (req, res) => {
  await db.query("DELETE FROM articles");
  res.json({ message: "All deleted" });
});

app.listen(3000, () => console.log("Server running on port 3000"));