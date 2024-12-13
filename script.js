const peer = new Peer(undefined, {
    host: 'localhost',
    port: 3000,
    path: '/peerjs'
  });
  
  let myStream;
  
  // Captura o vídeo e áudio do usuário
  navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      myStream = stream;
      const myVideo = document.getElementById('my-video');
      myVideo.srcObject = stream;
  
      // Quando alguém fizer uma chamada, você responde com o seu stream
      peer.on('call', (call) => {
        call.answer(stream);
        call.on('stream', (remoteStream) => {
          const remoteVideo = document.getElementById('remote-video');
          remoteVideo.srcObject = remoteStream;
        });
      });
    })
    .catch(err => {
      console.error('Erro ao acessar a câmera ou microfone: ', err);
    });
  
  // Conectar com outro peer
  document.getElementById('connectBtn').addEventListener('click', () => {
    const peerId = document.getElementById('peerId').value;
  
    if (peerId) {
      const call = peer.call(peerId, myStream); // Inicia a chamada de vídeo
      call.on('stream', (remoteStream) => {
        const remoteVideo = document.getElementById('remote-video');
        remoteVideo.srcObject = remoteStream;
      });
    } else {
      alert('Por favor, insira um ID válido!');
    }
  });
  
  // Quando o PeerJS estiver pronto, exibe o ID único
  peer.on('open', (id) => {
    console.log('Meu ID é: ' + id);
    document.getElementById('peerId').value = id; // Preenche o campo com o ID
  });
  