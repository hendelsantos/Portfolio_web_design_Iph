const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware para servir arquivos estáticos
app.use(express.static(path.join(__dirname)));

// Rota principal
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// Rota para CSS
app.get("/css/:file", (req, res) => {
  res.sendFile(path.join(__dirname, "css", req.params.file));
});

// Rota para JS
app.get("/js/:file", (req, res) => {
  res.sendFile(path.join(__dirname, "js", req.params.file));
});

// Rota para imagens (se houver)
app.get("/images/:file", (req, res) => {
  res.sendFile(path.join(__dirname, "images", req.params.file));
});

// Middleware para SPA (Single Page Application)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  console.log(`🚀 Tudo Cell iPhone Store rodando na porta ${PORT}`);
  console.log(`📱 Acesse: http://localhost:${PORT}`);
});
