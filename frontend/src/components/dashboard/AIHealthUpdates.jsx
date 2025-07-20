
import { useState } from "react";

const AIHealthUpdate = () => {
  const [openSection, setOpenSection] = useState(["health", "mood"]);
  const [dateFilter, setDateFilter] = useState("today");
  const [typeFilter, setTypeFilter] = useState("all");

  const toggleSection = (section) => {
    setOpenSection((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const Section = ({ id, title, children }) => (
    <div className="bg-white border rounded-md shadow-sm last:mb-0 mb-4 overflow-hidden">
      <button
        onClick={() => toggleSection(id)}
        aria-expanded={openSection.includes(id)}
        className="w-full flex justify-between items-center text-left px-5 py-3 bg-gray-100 hover:bg-gray-200 transition-colors"
      >
        <span className="font-semibold text-gray-800 text-base">{title}</span>
        <span className="text-xl text-gray-600">
          {openSection.includes(id) ? "−" : "+"}
        </span>
      </button>

      {openSection.includes(id) && (
        <div className="px-5 py-4 text-sm text-gray-700 bg-gray-50 space-y-2">
          {children}
        </div>
      )}
    </div>
  );

  return (
    <div className="px-4 md:px-8 pt-6 pb-0">
      {/* 🔍 Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-600">Date</label>
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm bg-white focus:outline-none"
          >
            <option value="today">Today</option>
            <option value="week">Past 7 Days</option>
            <option value="month">This Month</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium mb-1 text-gray-600">Alert Type</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border rounded px-3 py-2 text-sm bg-white focus:outline-none"
          >
            <option value="all">All</option>
            <option value="health">Health</option>
            <option value="mood">Mood</option>
            <option value="proactive">Proactive</option>
          </select>
        </div>
      </div>

      {/* Sections (Filter logic not applied to content yet) */}
      <Section id="health" title="Health Snapshot">
        <p>💊 २ में से ३ दवाइयाँ ली गई — Calpol 8 बजे लेना बाकी है</p>
        <p>🩺 AI सुझाव: गर्मी ज़्यादा है, दिन में 3 बार पानी ज़रूर पिएं</p>
        <p>📍 आपके शरीर में 38°C तापमान है – धूप से बचें</p>
        <p>
          👥 आपने वही बात 3 बार दोहराई – डॉक्टर से मिलना चाहिए?{" "}
          <span className="text-xs text-gray-500">
            (early dementia alert)
          </span>
        </p>
      </Section>

      <Section id="mood" title="Mood & Activity Suggestions">
        <p>🦶 उठिए और सिर्फ़ 10 कदम चलिए — आपका साथी हौसला बढ़ाएगा।</p>
        <p>🍵 एक कप चाय या पानी की याद — थोड़ा तरोताज़ा हो जाइए।</p>
        <p>🗣️ SehatSaathi से हल्की-फुल्की बातचीत करें — मन हल्का लगेगा।</p>
      </Section>

      <Section id="tips" title="Proactive Health Tips">
        <p>🌿 ज्यादा फल और सब्ज़ियाँ खाइए।</p>
        <p>🚰 दिन में कम से कम 8 गिलास पानी।</p>
      </Section>

      <Section id="progress" title="Health Progress Tracker">
        <p>📊 BP Logs: Normal</p>
        <p>💓 Heart Rate: Stable</p>
      </Section>
    </div>
  );
};

export default AIHealthUpdate;
