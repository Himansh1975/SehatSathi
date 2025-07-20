import VoiceImg from '../assets/voice.png';
import MedScannerImg from '../assets/medScanner.png';
import DashboardImg from '../assets/dashboard.png';
import SehatSathiLogo from '../assets/sehatsathi.png';
import frontImg from '../assets/front.png';
import p1 from '../assets/p1.png';
import p2 from '../assets/p2.png';
import p3 from '../assets/p3.png';
import p4 from '../assets/p4.png';
import p5 from '../assets/p5.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="font-sans text-gray-800">
      {/* Hero Section */}
      <section className="h-screen text-center bg-white-100 py-4 px-4" >
        <img
          src={frontImg}
          alt="Elderly woman talkking to SehatSathi"
          className="absolute inset-0 w-full h-full object-cover opacity-10 z-0"
        />
        <div className="min-h-0.5 flex items-center justify-center px-4 pt-30 pb-10">
        <h2 className="text-3xl md:text-6xl font-bold text-center max-w-2xl">
            Your Health, Our Voice, Always with You.
        </h2>
        </div>

        <p className="mt-3 text-gray-600  text-xl max-w-2xl mx-auto pb-10">
          SehatSathi provides intuitive voice-activated health assistance, bringing care closer to home.
        </p>
        <div className="relative z-10 mt-6 flex flex-wrap justify-center gap-4">
        <Link to="/assistant">
          <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 transition cursor-pointer">
            Talk to SehatSathi AI Assistant
          </button>
        </Link>

        <Link to="/offline">
          <button
            onClick={() => console.log("Navigate to Offline")}
            className="border border-teal-600 text-teal-600 px-6 py-2 rounded hover:bg-teal-100 transition cursor-pointer"
          >
            Try Offline Mode
          </button>
        </Link>
      </div>
        
      </section>

      {/* Features Section */}
      <section className="bg-white py-8 text-center">
        <h2 className="text-5xl font-bold mb-15">Seamless Health Management, Tailored For You</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
          {[
            {
              title: 'Live Voice Interaction',
              desc: 'Engage in real-time health conversations, get answers, and track your daily wellness effortlessly.',
              img: VoiceImg,
              btn: 'Explore Voice Assistant'
            },
            {
              title: 'Medicine Scanner',
              desc: 'Simply scan medicine strips to understand dosages, warnings, and potential interactions instantly.',
              img: MedScannerImg,
              btn: 'Scan Medicines'
            },
            {
              title: 'Family Health Dashboard',
              desc: 'Monitor your loved ones health logs, medication routines, and receive smart insights powered by AI.',
              img: DashboardImg,
              btn: 'View Dashboard'
            }
          ].map((feature, i) => (
            <div key={i} className="border p-6 rounded-lg text-left">
              <h4 className="text-xl font-semibold">{feature.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{feature.desc}</p>
              <img src={feature.img} alt={feature.title} className="my-4 rounded-md w-full" />
              <button
                onClick={() => {
                  if (feature.btn.includes("Voice")) navigate("/assistant");
                  else if (feature.btn.includes("Scan")) navigate("/scanner");
                  else if (feature.btn.includes("Dashboard")) navigate("/dashboard");
                }}
                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition cursor-pointer"
              >{feature.btn}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Img + Language Section */}
      <section className="bg-white-50 py-12 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12">
          <div className="flex-1 text-center">
            <h4 className="text-2xl font-semibold ">See SehatSathi in Action</h4>
            <img src={SehatSathiLogo} alt="Demo" className="rounded mx-auto w-110" />
            <p className="mt-4 text-sm text-gray-600">
              Watch how our AI assistant simplifies health management with easy, voice-based interactions.
            </p>
          </div>
          <div className="flex-1 text-center">
            <h4 className="text-2xl font-semibold mb-4">Choose Your Language</h4>
            <select className="border px-8 py-2 mb-4 rounded">
              <option>English</option>
              <option>Hindi</option>
              <option>Gujarati</option>
              <option>Marathi</option>
              <option>Bengali</option>
            </select>
            <p className="text-sm text-gray-500 mb-6 max-w-sm mx-auto">
                SehatSathi is committed to serving you in your preferred language.
                This allows our assistant to communicate clearly and understand regional health concerns.
            </p>

            <div className="bg-gray-100 p-4 rounded-lg text-left max-w-sm mx-auto">
                <h5 className="font-medium mb-2 text-teal-700">Why Language Matters</h5>
                <ul className="list-disc text-sm text-gray-600 ml-4 space-y-1">
                <li>Clearer understanding of health guidance</li>
                <li>Faster response and less confusion</li>
                <li>Comfort for elders unfamiliar with English</li>
                </ul>
            </div>

            <button className="mt-6 bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 text-sm">
                Apply Language Preference
            </button>
          </div>
        </div>
      </section>

      {/* Upcoming Feature Section */}
      <section className="text-center py-10 bg-white">
        <h4 className="text-3xl text-red-500 font-semibold">Upcoming Feature: Choose Your Saathi’s Voice</h4>
        <p className="text-gray-500 mt-2">
          Coming soon: A voice that sounds like family — so your health companion truly feels like your own.
        </p>
        <p className="text-sm font-bold text-gray-800 mt-2">
          Powered By HeyGen
        </p>
      </section>

      {/* Testimonial Section - Just For Branding */}
      <section className="bg-white-50 py-16 px-4 text-center">
        <h2 className="text-4xl font-bold mb-10">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {[
            {
              quote: 'SehatSathi has transformed how my family monitors my health. The voice assistant is incredibly easy to use for elders.',
              name: 'Sarla Devi',
              city: 'Delhi'
            },
            {
              quote: 'The medicine scanner is a lifesaver! I can quickly check details and warnings without any hassle.',
              name: 'Rajesh Kumar',
              city: 'Mumbai'
            },
            {
              quote: 'Offline mode is brilliant. Even without internet, I can access crucial health information and support.',
              name: 'Ananya Sharma',
              city: 'Bengaluru'
            }
          ].map((t, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow text-left">
              <blockquote className="italic">"{t.quote}"</blockquote>
              <p className="mt-2 text-sm font-semibold text-teal-700">
                {t.name}, {t.city}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Partners Section - Just for Brand */}
      <section className="bg-white text-center py-10">
        <h3 className="text-3xl font-bold mb-6">Our Valued Partners</h3>
        <div className="flex justify-center flex-wrap gap-6">
          <img src={p1} alt="P1" className="w-20" />
          <img src={p2} alt="P2" className="w-20" />
          <img src={p3} alt="P3" className="w-20" />
          <img src={p4} alt="P4" className="w-20" />
          <img src={p5} alt="P5" className="w-20" />
        </div>
      </section>
    </div>
  );
};

export default Home;
