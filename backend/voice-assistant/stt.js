import WebSocket from 'ws';

export function initSTT(wss) {
  wss.on('connection', (clientWs) => {
    console.log('STT WebSocket connection established');
    
    // Send instructions for browser-based STT
    clientWs.send(JSON.stringify({
      type: 'config',
      message: 'Use browser Web Speech API for speech recognition',
      supportsBrowserSTT: true
    }));

    clientWs.on('message', (message) => {
      try {
        const data = JSON.parse(message);
        // Echo back any text received from browser STT
        if (data.text) {
          clientWs.send(JSON.stringify({
            text: data.text,
            final: data.final || true,
            source: 'browser'
          }));
        }
      } catch (err) {
        console.log('Non-JSON message received:', message.toString().slice(0, 50));
      }
    });

    clientWs.on('close', () => console.log('STT client disconnected'));
    clientWs.on('error', (err) => console.error('STT WebSocket error:', err));
  });

  console.log('STT service initialized (browser-based mode)');
}
