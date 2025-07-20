// import dadaji from '../../assets/dadaji.jpg';
// const FamilyLog = () => {
//   return (
//     <div className="flex justify-center px-8 py-5">
//       <div className="flex flex-col md:flex-row  items-start gap-100">
//         {/* Avatar + Greeting */}
//         <div className="flex flex-col items-center">
//           <img
//             src={dadaji}
//             alt="Avatar"
//             className="rounded-xl border w-120"
//           />
//           <h2 className="text-2xl font-semibold mt-4 text-center">Namaste, Dadaji</h2>
//         </div>

//         {/* Family Log In Box */}
//         <div className="bg-gray-200 p-6 rounded-2xl shadow-md w-[36rem]">
//           <h2 className="bg-teal-600 text-white px-4 py-3 rounded-t-2xl font-semibold text-center text-lg w-full">
//             Family Log In
//           </h2>

//           <div className="p-4 space-y-4">
//             <p className="flex items-center text-base">
//               <span className="text-red-500 mr-2 text-lg">⚠️</span> Emergency alerts via SMS/call will go to:
//             </p>

//             <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400">
//               {[
//                 { name: "Papa", phone: "+91 98765 43210", avatar: "/papa.png" },
//                 { name: "Tauji", phone: "+91 91234 56789", avatar: "/tauji.png" },
//                 { name: "Beta", phone: "+91 89012 34567", avatar: "/beta.png" },
//               ].map((person, idx) => (
//                 <div
//                   key={idx}
//                   className="flex items-center space-x-4 bg-white p-3 rounded shadow-sm"
//                 >
//                   <img
//                     src={person.avatar}
//                     alt={person.name}
//                     className="w-10 h-10 rounded-full object-cover"
//                   />
//                   <div>
//                     <p className="font-medium text-base">{person.name}</p>
//                     <p className="text-xs text-gray-500">{person.phone}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default FamilyLog;
import { FaPhoneAlt, FaSms, FaHeartbeat } from 'react-icons/fa';
import dadaji from '../../assets/dadaji.jpg';
import papaji from '../../assets/papaji.png';
import tauji from '../../assets/tauji.png';
import beta from '../../assets/beta.png';
import beti from '../../assets/beti.png'

const FamilyLog = () => {
  const people = [
    { name: "Doctor", phone: "+91 98765 43210", avatar: papaji },
    { name: "Beta", phone: "+91 89012 34567", avatar: beta },
    { name: "Bahu", phone: "+91 75012 34598", avatar: beti },
    { name: "Tauji", phone: "+91 91234 56789", avatar: tauji },
  ];

  return (
    <div className="flex justify-center px-6 py-8 bg-white">
      <div className="flex flex-col md:flex-row items-start gap-10 w-full max-w-7xl">
        {/* Dadaji Avatar */}
        <div className="flex flex-col items-center">
          <img src={dadaji} alt="Dadaji" className="rounded-xl border w-90 h-auto object-cover" />
          <h2 className="text-2xl font-semibold mt-4 text-center">Namaste, Dadaji</h2>
        </div>

        {/* Animated Heart Divider */}
        
        <div className="hidden md:flex flex-col items-center mx-2 mt-30 text-pink-600">
          <div className="animate-ping inline-flex h-3 w-3 rounded-full bg-pink-400 mb-1"></div>
          <FaHeartbeat className="text-2xl animate-bounce" />
          <div className="text-xs font-medium text-gray-500 mt-1">Synced with Love</div>
        </div>
        <div className="hidden md:flex flex-col items-center mx-2 mt-30 text-pink-600">
          <div className="animate-ping inline-flex h-3 w-3 rounded-full bg-pink-400 mb-1"></div>
          <FaHeartbeat className="text-2xl animate-bounce" />
          <div className="text-xs font-medium text-gray-500 mt-1">Synced with Love</div>
        </div>
        

        {/* Family Login Box */}
        <div className="bg-gray-100 p-6 rounded-2xl shadow-md flex-1 max-w-xl">
          <h2 className="bg-teal-600 text-white px-4 py-3 rounded-t-2xl font-semibold text-center text-lg w-full">
            Family Log In
          </h2>

          <div className="p-4 space-y-4">
            <p className="flex items-center text-base text-gray-800">
              <span className="text-red-500 mr-2 text-lg">⚠️</span>
              Emergency alerts via SMS/call will go to:
            </p>

            <div className="space-y-3 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 pr-1">
              {people.map((person, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-white p-3 rounded shadow-sm"
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-base">{person.name}</p>
                      <p className="text-xs text-gray-500">{person.phone}</p>
                    </div>
                  </div>

                  <div className="flex space-x-3 text-teal-600">
                    <a
                      href={`tel:${person.phone.replace(/\s+/g, "")}`}
                      title="Call"
                      className="hover:text-teal-800 transition"
                    >
                      <FaPhoneAlt />
                    </a>
                    <a
                      href={`sms:${person.phone.replace(/\s+/g, "")}`}
                      title="Send SMS"
                      className="hover:text-teal-800 transition"
                    >
                      <FaSms />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FamilyLog;
