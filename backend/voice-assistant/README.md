Voice Assistant Backend API

This service provides three core interfaces—chat, text-to-speech, and streaming speech-to-text—wrapped in a single Express + WebSocket server.

---

**Getting Started**

1. **Clone and install**

   ```bash
   git clone <your-fork>/SehatSathi.git
   cd SehatSathi/backend/voice-assistant
   npm install
   ```

2. **Configure environment**
   Create a file named `.env` in the `backend/voice-assistant` folder with:

   ```ini
   GEMINI_API_KEY=your_gemini_key_here
   PORT=8080    # optional; defaults to 8080 if omitted
   ```

3. **Run the server**

   ```bash
   npm start
   ```

   You should see a log message indicating the server is running on `http://localhost:8080`.

---

**Endpoints**

1. **POST** `/chat`

   * Purpose: Send user text to the AI chat model and receive a reply.
   * Request:

     ```http
     POST /chat
     Content-Type: application/json

     { "text": "Hello, how are you?" }
     ```
   * Response:

     ```json
     { "answer": "I’m doing great—how can I help you today?" }
     ```

2. **POST** `/tts`

   * Purpose: Convert plaintext into an MP3 audio stream.
   * Request:

     ```http
     POST /tts
     Content-Type: application/json

     { "text": "Your appointment is at 3 PM." }
     ```
   * Response:

     * Headers: `Content-Type: audio/mpeg`
     * Body: raw MP3 binary

3. **WebSocket** `/ws/stt`

   * Purpose: Stream audio chunks to the server and receive live speech-to-text transcripts.
   * How to connect:

     ```js
     const ws = new WebSocket("ws://localhost:8080/ws/stt");
     ws.onmessage = (evt) => console.log("Transcript:", evt.data);
     // send ArrayBuffer audio frames via ws.send(...)
     ```

---

**Testing and Usage Examples**

* **cURL Chat**

  ```bash
  curl -X POST http://localhost:8080/chat \
    -H "Content-Type: application/json" \
    -d '{"text":"What’s the weather today?"}'
  ```

* **cURL TTS**

  ```bash
  curl -X POST http://localhost:8080/tts \
    -H "Content-Type: application/json" \
    -o response.mp3 \
    -d '{"text":"Reminder: Meeting at 10 AM."}'
  ```

* **WebSocket STT**
  In Node.js or the browser, open a WebSocket connection to `ws://localhost:8080/ws/stt` and send raw audio frames; transcripts arrive as text messages.

---

**Note:** Make sure `GEMINI_API_KEY` is set in your environment. Without it, the chat and TTS modules will fail to authenticate.
