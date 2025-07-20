import { useRef, useState, useEffect } from "react";
import axios from "axios";
import scannerGuideImage from "../assets/scanner-guide.png";
import guide2 from "../assets/guide2.png";

const Scanner = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [medicineFile, setMedicineFile] = useState(null);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [ocrResult, setOcrResult] = useState("");
  const [aiExplanation, setAiExplanation] = useState("");
  const [dietAdvice, setDietAdvice] = useState(null);
  const [recentIds, setRecentIds] = useState([]);
  const [allReminders, setAllReminders] = useState([]);
  const [error, setError] = useState("");

  const medicineInputRef = useRef();
  const prescriptionInputRef = useRef();
  const userId = "test-temp-user"; 

  //connect to backend server - used id
  useEffect(() => {
    axios.get("http://localhost:8080/api/med-info/recent")
      .then(res => setRecentIds(res.data.meds || []))
      .catch(err => console.error("Failed to fetch recent scans:", err));

    axios.get("http://localhost:8080/api/reminders/all", { params: { userId } })
      .then(res => {
        const patched = (res.data.reminders || []).map(r => {
          const hour = new Date(r.due).getHours();
          let timeOfDay = "Unscheduled";
          if (hour < 10) timeOfDay = "Morning";
          else if (hour < 14) timeOfDay = "Afternoon";
          else if (hour < 19) timeOfDay = "Evening";
          else timeOfDay = "Night";
          return { ...r, timeOfDay };
        });
        setAllReminders(patched);
      })
      .catch(err => console.error("Failed to fetch reminders:", err));
  }, []);

  const handleScan = async () => {
    if (!medicineFile) return setError("📸 Please select a medicine image first.");
    const formData = new FormData();
    formData.append("file", medicineFile);
    formData.append("userId", userId);

    try {
      const { data } = await axios.post("http://localhost:8080/api/med-info/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (!data.saved) throw new Error("Not saved.");
      fetchById(data.medicineId);
    } catch (err) {
      console.error("Scan failed:", err);
      setError("Scan failed. Please try again.");
    }
  };

  const fetchById = async (id) => {
    try {
      const { data } = await axios.get(`http://localhost:8080/api/med-info/${id}`);
      const med = Array.isArray(data.medicine) ? data.medicine[0] : data.medicine;

      setOcrResult(`Medicine: ${med.name}`);
      setAiExplanation(`Purpose: ${med.purpose}\nMechanism: ${med.mechanism}`);
      setDietAdvice(
        med.foodWarnings && med.foodWarnings.length > 0
          ? `Food Warnings:\n${med.foodWarnings.join(", ")}`
          : ""
      );
      setError("");
    } catch (err) {
      console.error("Fetch failed:", err);
      setError("Could not load scan. Check the ID and try again.");
    }
  };

  const handlePrescriptionUpload = async () => {
    if (!prescriptionFile) return setError("📋 Please select a prescription image first.");

    const formData = new FormData();
    formData.append("file", prescriptionFile);
    formData.append("userId", userId);

    try {
      const res = await axios.post("http://localhost:8080/api/prescription/analyze", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // alert(`Prescription extracted! ${res.data.inserted} reminders created.`);
      setError("");
    } catch (err) {
      console.error("Prescription analysis failed:", err);
      setError("Failed to extract prescription. Try again.");
    }
  };

  const acknowledgeReminder = async (id) => {
    try {
      await axios.post(`http://localhost:8080/api/reminders/${id}/ack`);
      setAllReminders((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Acknowledge failed:", err);
    }
  };

  const speakText = (text) => {
    if (!window.speechSynthesis) {
      alert("Text-to-speech not supported in this browser.");
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 1;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="font-sans text-gray-800">

      <main className="max-w-8xl mx-auto py-8 px-16 md:flex gap-6">
        {/* LEFT SECTION */}
        <div className="flex-1 space-y-6">
          {/* Medicine Upload */}
          <section className="border rounded-md p-4 mr-10 bg-white">
            <h3 className="text-lg font-semibold">💊 Upload Medicine Strip</h3>
            <p className="text-sm text-gray-500 mb-4">Click or drag an image to analyze.</p>

            <input
              ref={medicineInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setMedicineFile(e.target.files[0]);
                setError("");
              }}
            />

            <div
              onClick={() => medicineInputRef.current?.click()}
              onDrop={(e) => {
                e.preventDefault();
                setMedicineFile(e.dataTransfer.files[0]);
                setError("");
              }}
              onDragOver={(e) => e.preventDefault()}
              className="border border-dashed rounded-md h-60 flex items-center justify-center text-gray-400 text-sm bg-gray-50 cursor-pointer"
            >
              {medicineFile ? <span>✅ {medicineFile.name}</span> : <span>📷 Click or drag & drop image here</span>}
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              onClick={handleScan}
              className="bg-teal-600 text-white mt-4 px-6 py-2 rounded hover:bg-teal-800"
            >
              Scan Medicine →
            </button>
          </section>

          {/* Prescription Upload */}
          <section className="border rounded-md p-4 bg-white mr-10">
            <h4 className="text-md font-semibold mb-2">📋 Upload Prescription</h4>
            <p className="text-sm text-gray-500 mb-4">
              Upload your doctor's prescription to generate medicine reminders.
            </p>

            <input
              ref={prescriptionInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                setPrescriptionFile(e.target.files[0]);
                setError("");
              }}
            />

            <div
              onClick={() => prescriptionInputRef.current?.click()}
              onDrop={(e) => {
                e.preventDefault();
                setPrescriptionFile(e.dataTransfer.files[0]);
                setError("");
              }}
              onDragOver={(e) => e.preventDefault()}
              className="border border-dashed rounded-md h-40 flex items-center justify-center text-gray-400 text-sm bg-gray-50 cursor-pointer"
            >
              {prescriptionFile ? <span>✅ {prescriptionFile.name}</span> : <span>📄 Click or drag & drop prescription</span>}
            </div>

            <button
              onClick={handlePrescriptionUpload}
              className="bg-purple-600 text-white mt-4 px-6 py-2 text-sm rounded hover:bg-purple-700"
            >
              Upload Prescription →
            </button>
          </section>
        </div>

        {/* RIGHT SIDEBAR */}
        <aside className="w-full md:w-80 space-y-6 mt-6 md:mt-0">
          {/* Scan Details */}
          <section className="border rounded-md p-4 mt-3 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-semibold text-gray-800">🧪 Scanned Medicine Information</h4>
              {ocrResult && aiExplanation && (
                <button
                  onClick={() => speakText(`${ocrResult}. ${aiExplanation}`)}
                  className="text-sm font-medium text-purple-600 hover:text-white hover:bg-purple-600 px-2 py-1 rounded transition-all duration-200"
                >
                  🔊 Speak
                </button>
              )}
            </div>
            <div className="text-sm text-gray-700 mb-3">
              <strong>OCR Result:</strong><br />
              <span className="block mt-1">
                {ocrResult || <span className="text-gray-400">Upload a medicine strip image to get started.</span>}
              </span>
            </div>
            <div className="text-sm text-gray-700 whitespace-pre-line">
              <strong>AI Explanation:</strong><br />
              <span className="block mt-1">
                {aiExplanation || <span className="text-gray-400">No explanation yet. Once medicince strip is uploaded AI will explain the medicine’s purpose and mechanism here.</span>}
              </span>
            </div>
          </section>

          {/* Diet Advice */}
          <section className="border rounded-md p-4 bg-white shadow-sm">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-md font-semibold text-gray-800">🍽️ Dietary Advice</h4>
              {dietAdvice !== null && (
                <button
                  onClick={() => speakText(
                    dietAdvice || "No dietary precautions required for this medicine."
                  )}
                  className="text-sm font-medium text-purple-600 hover:text-white hover:bg-purple-600 px-2 py-1 rounded transition-all duration-200"
                >
                  🔊 Speak
                </button>
              )}
            </div>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              <strong>Advice:</strong><br />
              <span className="block mt-1">
                {dietAdvice === null
                  ? "⚠️ Upload a strip to receive dietary warnings or precautions."
                  : dietAdvice === ""
                  ? "✅ No dietary precautions required for this medicine."
                  : dietAdvice}
              </span>
            </p>
          </section>

          {/* Recent Uploads */}
          <section className="border rounded-md p-4 bg-white shadow-sm">
            <h4 className="text-md font-semibold mb-4">🕘 Recent Uploads</h4>
            {recentIds.length === 0 ? (
              <p className="text-sm text-gray-400">No recent uploads found.</p>
            ) : (
              <div className="max-h-64 overflow-y-auto pr-1 custom-scrollbar">
                <ul className="space-y-2 text-sm">
                  {recentIds.map((entry) => {
                    const date = new Date(entry.extractedAt);
                    return (
                      <li
                        key={entry._id}
                        className="flex justify-between items-center p-2 border border-gray-100 rounded hover:bg-gray-50 transition"
                      >
                        <button
                          onClick={() => fetchById(entry._id)}
                          className="text-purple-600 hover:text-blue-800 text-left"
                        >
                          ID #{entry._id.slice(-6)}
                        </button>
                        <div className="text-xs text-gray-500 text-right">
                          {date.toLocaleDateString()}<br />
                          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </section>

        </aside>
        
      </main>
        {/* Reminders*/}
        <section className="border rounded-md p-4 bg-white shadow-sm overflow-hidden mx-16 ">
        <h4 className="text-md font-semibold mb-4">🕒 Medicine Reminders</h4>

        {allReminders.length === 0 ? (
          <p className="text-sm text-gray-400">No reminders found.</p>
        ) : (
          <div className="space-y-8">
            {["Morning", "Afternoon", "Evening", "Night"].map((period) => {
              const reminders = allReminders.filter(r => (r.timeOfDay || "Unscheduled") === period);
              if (reminders.length === 0) return null;

              return (
                <div key={period}>
                  <h5 className="text-sm font-semibold text-gray-700 mb-2">{period}</h5>

                  {/* Scrollable horizontal row */}
                  <div className="relative">
                    <div className="overflow-x-auto custom-scrollbar">
                      <div className="flex gap-4 w-fit pr-2">
                        {reminders.map((r) => (
                          <div
                            key={r._id}
                            className="w-60 flex-shrink-0 p-4 border border-gray-200 rounded-md shadow-sm bg-gray-50"
                          >
                            <div className="font-medium text-gray-800 text-sm">{r.medName}</div>
                            <div className="text-xs text-gray-500">
                              🕓 {new Date(r.due).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                            </div>
                            {/* <div className="text-xs text-purple-700 mt-1">{r.mealInstruction}</div> */}
                            <div className="mt-2">
                              <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                r.remind ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
                              }`}>
                                {r.remind ? "Remind" : "No Reminder"}
                              </span>
                            </div>
                            <button
                              onClick={() => acknowledgeReminder(r._id)}
                              className="mt-2 text-xs bg-green-50 border border-green-300 text-green-700 px-3 py-1 rounded hover:bg-green-100 transition w-full"
                            >
                              Taken
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>
      {/* visual guide */}
      <div className="border rounded-md p-4 bg-white shadow-sm mt-10 mx-16">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">🔎 Visual Guide</h3>
        <p className="text-sm text-gray-700 leading-relaxed">
          Upload a medicine strip or prescription to extract text using OCR. AI then analyzes it to identify the medicine, its purpose, usage, and dietary warnings. Reminders are shown on the right to help you stay on track.
        </p>
      </div>

      <section className="bg-white py-6 px-4 md:px-16">
        <div className="flex flex-col md:flex-row justify-center items-start gap-6">
          
          {/* Left Image */}
          <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 rounded-md shadow-md p-4 hover:shadow-lg transition">
            <img
              src={scannerGuideImage}
              alt="How to use scanner"
              className="rounded-md object-cover w-full h-auto md:h-[280px]"
            />
            <p className="text-center text-sm text-gray-600 mt-2">📸 Scan a medicine strip</p>
          </div>

          {/* Right Image - Hindi */}
          <div className="w-full md:w-1/2 lg:w-1/3 bg-gray-50 rounded-md shadow-md p-4 hover:shadow-lg transition">
            <img
              src={guide2}
              alt="Scanner guide copy"
              className="rounded-md object-cover w-full h-auto md:h-[280px]"
            />
            <p className="text-center text-sm text-gray-600 mt-2">📸 दवा की पट्टी स्कैन करें</p>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Scanner;
