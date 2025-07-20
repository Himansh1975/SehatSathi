
// const Footer = () => (
//   <footer className="bg-white-50 text-center py-8 mt-10">
//     <h4 className="text-xl font-bold">SehatSathi</h4>
//     <p className="text-sm text-gray-600 mt-1 mb-4">Stay Healthy with SehatSathi</p>
//     <div className="flex justify-center items-center gap-2 max-w-sm mx-auto">
//       <input
//         type="email"
//         placeholder="Enter your email"
//         className="border px-4 py-2 rounded w-full"
//       />
//       <button className="bg-teal-600 text-white px-4 py-2 rounded">Subscribe</button>
//     </div>
//     <p className="mt-4 text-xs text-gray-400">© 2025 SehatSathi</p>
//   </footer>
// );

// export default Footer;
const Footer = () => (
  <footer className="bg-gray-100 text-gray-800 py-10 px-6 mt-10 border-t border-gray-300">
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-sm">
      {/* Column 1: Brand Info */}
      <div>
        <h4 className="text-2xl font-bold text-teal-700">SehatSathi</h4>
        <p className="mt-2 text-gray-600">
          Your AI-powered wellness companion. Simplifying healthcare, one voice at a time.
        </p>
        <p className="mt-4 text-xs text-gray-500">© 2025 SehatSathi. All rights reserved.</p>
      </div>

      {/* Column 2: Links */}
      <div>
        <h5 className="text-md font-semibold mb-3">Quick Links</h5>
        <ul className="space-y-2 text-gray-600">
          <li><a href="/dashboard" className="hover:text-teal-600">Dashboard</a></li>
          <li><a href="/assistant" className="hover:text-teal-600">Assistant</a></li>
          <li><a href="/scanner" className="hover:text-teal-600">Scanner</a></li>
          <li><a href="/login" className="hover:text-teal-600">Login</a></li>
        </ul>
      </div>

      {/* Column 3: Newsletter */}
      <div>
        <h5 className="text-md font-semibold mb-3">Stay Updated</h5>
        <p className="text-gray-600 mb-3">Subscribe to get health tips & app updates:</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="border border-gray-300 px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-400"
          />
          <button className="bg-teal-600 text-white px-4 py-2 rounded hover:bg-teal-700 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;

