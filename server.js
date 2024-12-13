const express = require('express');
const path = require('path');
const PeerServer = require('peer').PeerServer;

const app = express();
const port = 3000;

// Servir arquivos estáticos (como index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar o servidor PeerJS
const peerServer = PeerServer({ 
  port: 3001, 
  path: '/peerjs' 
});

// Iniciar o servidor Express
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
