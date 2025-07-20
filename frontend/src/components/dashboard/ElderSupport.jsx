import bhajan from '../../assets/bhajan.jpg';
import mela from '../../assets/mela.png';
import healthcamp from '../../assets/healthcamp.png';
import satsang from '../../assets/satsang.png';
import games from '../../assets/indoorgames.png';
import yoga from '../../assets/yoga.png';

const events = [
  {
    title: "Mela",
    subtitle: "Every Weekend",
    location: "250 m (XYZ)",
    image: mela
  },
  {
    title: "Health Camp",
    subtitle: "Distance: 500 m",
    location: "XYZ",
    image: healthcamp,
  },
  {
    title: "Satsang",
    subtitle: "Tomorrow",
    location: "250 m (XYZ)",
    image: satsang
  },
];

const homeActivities = [
  {
    title: "Daily Bhajans",
    subtitle: "Access a collection of soothing devotional songs.",
    image: bhajan
  },
  {
    title: "Indoor Games",
    subtitle: "Engage in mind-stimulating games like chess and ludo.",
    image: games
  },
  {
    title: "Gentle Yoga Prompts",
    subtitle: "Follow easy yoga exercises for flexibility and peace.",
    image: yoga
  },
];

const ElderSupport = () => {
  return (
    <div className="px-6 pt-6">
      <div className="bg-teal-50 border-l-4 border-teal-400 p-4 mb-8 rounded-xl shadow">
        <p className="text-lg font-semibold text-teal-700">🌻 You are loved, valued, and never alone.</p>
        <p className="text-sm text-teal-600 mt-1">Your family is connected, and SehatSathi is here with gentle care.</p>
      </div>

      {/* Local Events Section */}
      <section className="mb-14">
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">🎉 Local Events & Activities Around You</h2>
        <p className="text-sm text-center text-gray-500 mb-6">At home or nearby, SehatSathi is with you</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(({ title, subtitle, location, image }, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-white border shadow hover:shadow-md transition"
            >
              <img src={image} alt={title} className="w-full h-40 object-cover" />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">{subtitle}</p>
                <p className="text-sm text-gray-500">📍 Location: {location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Home Activities Section */}
      <section>
        <h2 className="text-2xl font-bold text-center mb-1 text-gray-800">🏠 Home Activities</h2>
        <p className="text-sm text-center text-gray-500 mb-6">Engaging prompts for peaceful time at home</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeActivities.map(({ title, subtitle, image }, index) => (
            <div
              key={index}
              className="rounded-xl overflow-hidden bg-white border shadow hover:shadow-md transition"
            >
              <img src={image} alt={title} className="w-full h-40 object-cover" />
              <div className="p-4 space-y-1">
                <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
                <p className="text-sm text-gray-600">{subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="bg-blue-50 border border-blue-300 p-4 rounded-xl mt-10 shadow text-center">
        <h3 className="font-semibold text-blue-800 mb-2">Feeling Lonely?</h3>
        <p className="text-sm text-blue-600 mb-3">Talk to a family member, connect with a volunteer, or just share your thoughts.</p>
      <a href="tel:+919876543210">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition cursor-pointer">
          📞 Call Someone Now
        </button>
      </a>
      </div>

      <div className="bg-gray-100 p-4 rounded-xl mt-10 shadow">
        <h3 className="text-lg font-semibold text-gray-700 mb-2">🧸 Companion Corner</h3>
        <ul className="text-sm space-y-2 text-gray-600">
          <li>🎵 <a href="https://www.youtube.com/watch?v=Tx9t6XRUdcs" target="_blank" className="text-teal-600 hover:underline">Listen to old Hindi classics</a></li>
          <li>🎵 <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" className="text-teal-600 hover:underline">Listen to old English classics</a></li>
          <li>📖 “Do you remember when…” → write one sweet memory</li>
          <li>😂 Joke of the day: Why don’t we ever tell secrets on a farm? Because the potatoes have eyes!</li>
        </ul>
      </div>

    </div>
  );
};

export default ElderSupport;
