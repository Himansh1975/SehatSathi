import WebSocket from 'ws';

const PY_WS_URL = 'ws://localhost:2700';

export function initSTT(wss) {
  wss.on('connection', (clientWs) => {
    console.log('STT WebSocket connection established');
    
    // For now, send a mock response since Python STT is not available in production
    clientWs.on('message', (audioChunk) => {
      // Mock STT response for demo purposes
      setTimeout(() => {
        clientWs.send(JSON.stringify({
          text: "STT service temporarily unavailable in production. Please use text chat.",
          final: true
        }));
      }, 1000);
    });

    clientWs.on('close', () => console.log('STT client disconnected'));
    clientWs.on('error', (err) => console.error('STT WebSocket error:', err));
  });

  console.log('STT service initialized (mock mode for production)');
}
