const express = require("express");
const app = express();

app.use(express.json());


let articles = [
  { id: 1, title: "Node JS", content: "Intro to Node" },
  { id: 2, title: "Express JS", content: "Intro to Express" }
];


app.get("/articles/:id", (req, res) => {
  const article = articles.find(a => a.id == req.params.id);
  if (!article) return res.status(404).json({ error: "Not found" });
  res.json(article);
});


app.put("/articles/:id", (req, res) => {
  const index = articles.findIndex(a => a.id == req.params.id);
  if (index === -1) return res.status(404).json({ error: "Not found" });

  const { title, content } = req.body;
  if (!title || !content)
    return res.status(400).json({ error: "title & content required" });

  articles[index] = { id: +req.params.id, title, content };
  res.json(articles[index]);
});


app.patch("/articles/:id", (req, res) => {
  const article = articles.find(a => a.id == req.params.id);
  if (!article) return res.status(404).json({ error: "Not found" });

  if (req.body.title) article.title = req.body.title;
  if (req.body.content) article.content = req.body.content;

  res.json(article);
});

app.listen(3000, () => console.log("Server running on port 3000"));
//put http://localhost:3000/articles/1   body/json/  { "title": "Java", "content": "Intro to Java" }

//patch  http://localhost:3000/articles/1   body/json/  { "title": "Java" }
