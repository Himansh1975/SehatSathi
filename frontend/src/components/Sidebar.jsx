import { useEffect, useState } from "react";

const links = [
  { label: "Family Logs", target: "family-dashboard" },
  { label: "AI Health Updates", target: "ai-health-updates" },
  { label: "Daily Info", target: "daily-info" },
  { label: "Elder Support", target: "elder-support" },
];

export default function Sidebar() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -70% 0px" } // Top-focused detection
    );

    links.forEach(({ target }) => {
      const section = document.getElementById(target);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <aside className="w-60 bg-white text-gray-800 h-screen p-6 sticky top-0 border-r border-gray-200">
      <div className="text-xl font-bold mb-10">SehatSathi</div>
      <nav className="flex flex-col gap-5 text-base">
        {links.map(({ label, target }) => (
          <a
            key={target}
            href={`#${target}`}
            className={`transition-colors duration-200 ${
              activeSection === target
                ? "text-teal-600 font-semibold"
                : "text-gray-700 hover:text-teal-500"
            }`}
          >
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
