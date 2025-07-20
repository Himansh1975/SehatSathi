
import 'dotenv/config';                  
import fs from 'fs';
import { tts } from './tts.js';
import { spawnSync } from 'child_process';
import ffmpegPath from 'ffmpeg-static';  

(async () => {
  const mp3 = await tts("Testing one two three");
  fs.writeFileSync("test.mp3", mp3);
  console.log("Wrote test.mp3");

  
  spawnSync(ffmpegPath, [
    '-y',
    '-i', 'test.mp3',
    '-ar', '16000',
    '-ac', '1',
    '-c:a', 'pcm_s16le',
    'test.wav'
  ], { stdio: 'inherit' });

  console.log("Converted to test.wav");
})().catch(err => {
  console.error(err);
  process.exit(1);
});
