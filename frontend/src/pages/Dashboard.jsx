import Sidebar from "../components/Sidebar";
import Section from "../components/Section";
import FamilyDashboard from "../components/dashboard/FamilyDashboard";
import AiHealthUpdates from "../components/dashboard/AIHealthUpdates";
import DailyInfo from "../components/dashboard/DailyInfo";
import ElderSupport from "../components/dashboard/ElderSupport";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Dashboard() {
  //scroller
  const location = useLocation();
  useEffect(() => {
    const hash = location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [location]);

  return (
    <div className="flex bg-white min-h-screen text-gray-800">
      <Sidebar />
      <main className="flex-1 p-6 overflow-auto scroll-smooth space-y-14">
        <Section id="family-dashboard" title="Family Dashboard">
          <FamilyDashboard />
        </Section>
        <Section id="ai-health-updates" title="AI Health Updates">
          <AiHealthUpdates />
        </Section>
        <Section id="daily-info" title="Daily Info">
          <DailyInfo />
        </Section>
        <Section id="elder-support" title="Elder Support">
          <ElderSupport />
        </Section>
      </main>
    </div>
  );
}
