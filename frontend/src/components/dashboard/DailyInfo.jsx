import { useNavigate } from "react-router-dom";

const DailyInfo = () => {
  const navigate = useNavigate();
  const handleGoToScanner = () => {
    navigate("/scanner"); 
  };
  return (
    <div id="daily-info" className=" bg-gray-50 p-6 pt-6 pb-10">
      {/* <h1 className="text-3xl font-semibold text-center text-gray-800 mb-10">
        Daily Info
      </h1> */}

      <div className="flex flex-wrap gap-8 justify-center">

        {/* Medicine Info Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 w-80 max-h-96 overflow-y-auto flex flex-col">
          <h2 className="text-xl font-bold text-gray-800 mb-1">💊 Medicine Info</h2>
          <p className="text-sm text-gray-500 mb-4">Today’s schedule & search tool</p>

          <div className="space-y-4 text-sm text-gray-700">
            {[
              { name: "Metformin", dose: "1 tablet", time: "8:00 AM" },
              { name: "Amlodipine", dose: "½ tablet", time: "9:00 AM" },
              { name: "Multivitamin", dose: "1 tablet", time: "9:00 PM" },
            ].map((med, idx) => (
              <div key={idx} className="flex justify-between">
                <div>
                  <p className="font-medium">{med.name}</p>
                  <p className="text-xs text-gray-500">{med.dose}</p>
                </div>
                <p className="text-sm">{med.time}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 space-y-2">
            <input
              type="text"
              placeholder="Search medicine..."
              className="w-full border rounded px-3 py-2 text-sm focus:outline-teal-500"
            />
            <button
              onClick={handleGoToScanner}
              className="w-full border rounded px-3 py-2 text-sm flex items-center justify-center gap-2 bg-gray-50 hover:bg-gray-100 transition cursor-pointer"
            >
              <span>📷 Scan Medicine</span> 
            </button>

          </div>
        </div>

        {/* Mood Trends Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 w-80">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-1">😊 Mood Trends</h2>
          <p className="text-sm text-center text-gray-500 mb-4">(1–5 scale)</p>

          <div className="text-center text-2xl mb-4">🙂 Happy</div>

          <div className="flex items-end justify-between h-32">
            {[3, 4, 3, 5, 4, 4, 5].map((val, idx) => (
              <div
                key={idx}
                className="w-6 bg-teal-600 rounded"
                style={{ height: `${val * 20}px` }}
              ></div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        {/* Sleep Overview Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 w-80">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-1">🌙 Sleep Overview</h2>
          <p className="text-sm text-center text-gray-500 mb-4">Hours per night</p>

          <div className="flex items-end justify-between h-32">
            {[6, 6.5, 7, 7.2, 7.5, 7, 8].map((val, idx) => (
              <div
                key={idx}
                className="w-6 bg-purple-400 rounded"
                style={{ height: `${val * 10}px` }}
              ></div>
            ))}
          </div>

          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
          </div>
        </div>

        <div className="w-full max-w-5xl bg-white rounded-xl shadow-inner px-6 py-5 text-center mt-8 border border-dashed border-teal-300">
          <h2 className="text-xl font-semibold text-red-800 mb-2">🚧 More Daily Updates Coming Soon</h2>
          <p className="text-sm text-gray-600">
            Stay tuned for features like Vitals Summary, Meal Tracker, Step Counter, and more SehatSathi wellness insights. Your care, continuously evolving.
          </p>
        </div>

        {/* Vitals Summary Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 w-80">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-1">🩺 Vitals Summary</h2>
          <p className="text-sm text-center text-gray-500 mb-4">Latest self-monitor logs</p>

          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span className="font-medium">Blood Pressure</span>
              <span>124/82 mmHg</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Pulse</span>
              <span>76 bpm</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Blood Sugar</span>
              <span>92 mg/dL</span>
            </div>
          </div>
        </div>

        {/* Meal Tracker Card */}
        <div className="bg-white shadow-md rounded-2xl p-6 w-80">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-1">🍽️ Meal Tracker</h2>
          <p className="text-sm text-center text-gray-500 mb-4">Meals logged today</p>

          <ul className="space-y-2 text-sm text-gray-700">
            <li><span className="font-medium">Breakfast:</span> Poha & Banana</li>
            <li><span className="font-medium">Lunch:</span> Dal, Rice, Curd</li>
            <li><span className="font-medium">Dinner:</span> Khichdi & Papad</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default DailyInfo;
