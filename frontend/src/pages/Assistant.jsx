import { useState, useRef, useEffect } from "react";
import { FiMic, FiSend, FiAlertCircle } from "react-icons/fi";
import { BsCapsule, BsPhone, BsFlower1, BsPlusCircle } from "react-icons/bs";
import { FaRegClock, FaBed, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const Assistant = () => {
  //for navigation
  const navigate = useNavigate();
  const handleGoToDailyInfo = () => {
    navigate("/dashboard#daily-info"); 
  };

  // Default Message at first
  const [messages, setMessages] = useState([
    { from: "bot", text: "Namaste! SehatSathi here. How can I help you manage your health today?" }
  ]);
  
  //connect to websocket stt_server audio

  const [partial, setPartial] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [inputText, setInputText] = useState("");

  const audioContextRef = useRef(null);
  const micStreamRef = useRef(null);
  const workletNodeRef = useRef(null);
  const sttWsRef = useRef(null);

  useEffect(() => () => stopRecording(), []);

  const [sttLang, setSttLang] = useState('en'); // 'en' or 'hi'
  const [useBrowserSTT, setUseBrowserSTT] = useState(false);
  const recognitionRef = useRef(null);
  
  const startRecording = async () => {
    // Try browser Web Speech API first (works in production)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      return startBrowserSTT();
    }
    
    // Fallback to WebSocket STT (development only)
    try {
      const audioContext = new AudioContext({ sampleRate: 16000 });
      await audioContext.audioWorklet.addModule("/worklets/pcm-processor.js");

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const micSource = audioContext.createMediaStreamSource(stream);
      const worklet = new AudioWorkletNode(audioContext, "pcm-processor");

      const ws = new WebSocket(
        import.meta.env.PROD 
          ? `wss://${window.location.host}/ws/stt`
          : "ws://localhost:8080/ws/stt"
      );

      ws.binaryType = "arraybuffer";

      ws.onopen = () => {
        ws.send(JSON.stringify({ lang: sttLang }));

        worklet.port.onmessage = (e) => {
          if (ws.readyState === WebSocket.OPEN) ws.send(e.data);
        };
        micSource.connect(worklet);
        audioContextRef.current = audioContext;
        micStreamRef.current = stream;
        workletNodeRef.current = worklet;
        sttWsRef.current = ws;
        setIsRecording(true);
      };

      ws.onerror = () => {
        console.log("WebSocket STT failed, falling back to browser STT");
        startBrowserSTT();
      };

      ws.onmessage = (event) => {
        const { text, final } = JSON.parse(event.data);

        console.log("STT raw:", text); 
       
        const output = text; // Browser STT already provides correct script  

        console.log("STT converted:", output); 

        if (!final) setPartial(output);
        else {
          setPartial('');
          stopRecording();
          sendToChat(output);
        }
      };
    } catch (err) {
      console.log("Audio worklet failed, using browser STT");
      startBrowserSTT();
    }
  };

  const startBrowserSTT = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = sttLang === 'hi' ? 'hi-IN' : 'en-US';
    
    recognition.onstart = () => {
      setIsRecording(true);
      setUseBrowserSTT(true);
      console.log('Browser STT started');
    };
    
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
      
      setPartial(interimTranscript);
      
      if (finalTranscript) {
        setPartial('');
        stopRecording();
        sendToChat(finalTranscript);
      }
    };
    
    recognition.onerror = (event) => {
      console.error('Browser STT error:', event.error);
      stopRecording();
    };
    
    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecording = () => {
    setIsRecording(false);
    setPartial("");
    setUseBrowserSTT(false);
    
    // Stop browser STT
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }
    
    // Stop WebSocket STT
    workletNodeRef.current?.disconnect();
    audioContextRef.current?.close();
    micStreamRef.current?.getTracks()?.forEach(t => t.stop());
    sttWsRef.current?.close();
    audioContextRef.current = null;
    micStreamRef.current = null;
    workletNodeRef.current = null;
    sttWsRef.current = null;
  };

  const sendToChat = async (text) => {
    setMessages(prev => [...prev, { from: "user", text }]);
    setInputText("");
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const res = await fetch(`${apiBase}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });
      const { answer, lang } = await res.json();
      setMessages(prev => [...prev, { from: "bot", text: answer }]);
      playTTS(answer, lang); 
    } catch (err) {
      console.error("Chat error:", err.message);
      setMessages(prev => [...prev, { from: "bot", text: "Sorry, I'm having trouble connecting. Please try again." }]);
    }
  };

  const playTTS = async (text, lang = "en") => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
      const res = await fetch(`${apiBase}/tts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text, lang }) 
      });
      const audioBlob = await res.blob();
      const audioURL = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioURL);
      audio.onended = () => URL.revokeObjectURL(audioURL);
      audio.play();
    } catch (err) {
      console.error("TTS fetch failed:", err);
    }
  };

   const chatRef = useRef(null);
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);


  return (
    <div className="min-h-50 bg-gray-50 text-gray-900 font-sans p-6 flex flex-col md:flex-row gap-6">
      {/* Left Part: Chat Area  */}
      <div className="flex-1 bg-white rounded-xl shadow-md p-6 flex flex-col">
        <h2 className="text-xl font-bold mb-4">💬 SehatSathi Assistant</h2>
        <div ref={chatRef} className="flex-1 overflow-y-auto space-y-4 pr-2 max-h-[400px]">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.from === "bot" ? "justify-start" : "justify-end"}`}>
              <div className={`max-w-[75%] px-4 py-2 rounded-lg ${msg.from === "bot" ? "bg-gray-100" : "bg-blue-100 text-right"}`}>
                <p className="text-sm">{msg.text}</p>
              </div>
            </div>
          ))}
          {partial && (
            <div className="text-sm italic text-gray-500">{partial}</div>
          )}
        </div>
        
        <div className="mt-4 flex gap-2">
          <button
            onClick={() => (isRecording ? stopRecording() : startRecording())}
            className={`p-3 rounded-full shadow-md ${isRecording ? "bg-red-500 animate-pulse" : "bg-teal-600"} text-white relative`}
            title={isRecording ? "Stop Recording" : "Start Voice"}
          >
            <FiMic />
            {useBrowserSTT && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
            )}
          </button>

          <input
            value={inputText}
            onChange={e => setInputText(e.target.value)}
            onKeyDown={e => e.key === "Enter" && sendToChat(inputText)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-md"
          />
          

          <button
            onClick={() => sendToChat(inputText)}
            className="bg-blue-600 text-white p-3 rounded-full shadow-md"
            title="Send"
          >
            <FiSend />
          </button>

        </div>
        <div className="flex items-center gap-2 mb-4 mt-2">
            <label className="text-sm font-medium"> 🗣️ Choose How Your Saathi Speaks:</label>
            <select
              value={sttLang}
              onChange={e => setSttLang(e.target.value)}
              className="border px-2 py-1 rounded text-sm"
            >
              <option value="en">English</option>
              <option value="hi">हिन्दी</option>
            </select>
          </div>
      </div>

      {/* Right Part: Sidebars */}
      <aside className="w-full md:w-80 space-y-6">
        <div
        onClick={handleGoToDailyInfo}
        className="cursor-pointer bg-white border rounded-xl shadow p-4 hover:shadow-lg transition"
        >
          <h3 className="text-lg font-semibold mb-4">📊 Daily Health Timeline</h3>
          <ul className="space-y-3 text-sm">
            <li className="flex items-start gap-2">
              <BsCapsule className="mt-1 text-teal-600" />
              <div>
                <p className="font-medium">Medicine Logged</p>
                <p className="text-gray-500 text-xs">Dolo 650 (morning dose) • 10:03 AM</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <FaUtensils className="mt-1 text-yellow-600" />
              <div>
                <p className="font-medium">Meal Recorded</p>
                <p className="text-gray-500 text-xs">Lunch: Rice, Dal, Sabzi • 12:45 PM</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <FaBed className="mt-1 text-blue-500" />
              <div>
                <p className="font-medium">Sleep Goal</p>
                <p className="text-gray-500 text-xs">7.5 hours • 07:00 AM</p>
              </div>
            </li>
            <li className="flex items-start gap-2">
              <FaRegClock className="mt-1 text-orange-500" />
              <div>
                <p className="font-medium">Next Medicine Due</p>
                <p className="text-gray-500 text-xs">Multivitamin (evening dose) • 08:00 PM</p>
              </div>
            </li>
          </ul>
        </div>

        <div className="bg-white border rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold mb-3">⚡ Quick Actions</h3>
          <div className="flex flex-wrap gap-2 text-sm">
            <button className="border px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
              <BsCapsule /> Ask About Meds Info
            </button>
            <button className="border px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
              <FaUtensils /> Diet Info
            </button>
            <button className="border px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
              <BsPhone /> Share Your Thoughts
            </button>
            <button className="border px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
              <BsPlusCircle /> New Chat
            </button>
            <button className="border px-3 py-1 rounded hover:bg-gray-100 flex items-center gap-1">
              <BsFlower1 />	 Talk Mental & Physical Wellbeing
            </button>
          </div>
        </div>

        <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 text-sm text-yellow-800 rounded-md flex items-start gap-2">
          <FiAlertCircle className="mt-0.5" />
          <span>
            <strong>Alert:</strong> Ramu Kaka missed his evening medicine. Alert sent to Amit.
          </span>
        </div>
      </aside>

    </div>
    
  );
};

export default Assistant;
