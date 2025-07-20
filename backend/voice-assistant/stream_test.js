import Mic from 'mic';
import WebSocket from 'ws';

const WS_URL = 'ws://localhost:2700';
const SOX_PATH = 'C:/Program Files (x86)/sox-14-4-2/sox.exe';

let micInstance;

const ws = new WebSocket(WS_URL);
ws.on('open', () => {
  micInstance = Mic({
    rate: '16000',
    channels: '1',
    bitwidth: '16',
    encoding: 'signed-integer',
    endian: 'little',
    device: 'default',
    soxPath: SOX_PATH    
  });
  const micStream = micInstance.getAudioStream();
  micStream.on('data', chunk => ws.send(chunk));
  micStream.on('error', err => console.error('Mic error:', err));
  micInstance.start();
  console.log('Listening—start speaking…');
});

ws.on('message', msg => console.log('STT Response:', msg.toString()));
ws.on('close', () => console.log('WebSocket closed'));
ws.on('error', err => console.error('WebSocket error:', err));

process.on('SIGINT', () => {
  micInstance?.stop();
  ws.close();
  process.exit();
});
