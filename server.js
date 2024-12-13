const express = require('express');
const path = require('path');
const { PeerServer } = require('peer'); // Corrigido para importar corretamente o PeerServer

const app = express();
const port = process.env.PORT || 3000;  // Usa a variável de ambiente PORT para o Express

// Servir arquivos estáticos (como index.html)
app.use(express.static(path.join(__dirname, 'public')));

// Inicializar o servidor PeerJS com a variável de ambiente PORT para garantir compatibilidade no Railway
const peerServer = PeerServer({
  port: process.env.PEER_PORT || 3001,  // Usa a variável de ambiente PEER_PORT ou uma porta padrão
  path: '/peerjs',
  secure: true,  // Adiciona o protocolo seguro para HTTPS (importante em produção)
  proxied: true  // Isso é importante se você estiver atrás de um proxy reverso (como no Railway)
});

// Iniciar o servidor Express
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
