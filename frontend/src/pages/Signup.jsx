import { SignUp } from "@clerk/clerk-react";
import Logo from '../assets/logo.png';

const Signup = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="grid grid-cols-1 md:grid-cols-2 w-full max-w-5xl shadow-xl rounded-lg overflow-hidden">
        {/* LEFT SIDE */}
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-teal-400 to-orange-300 p-10 text-white">
          <img src={Logo} alt="logo" className="w-14 mb-4" />
          <h2 className="text-3xl font-bold mb-2">Seamless Authentication</h2>
          <p className="text-center max-w-sm">
            Your gateway to secure and intuitive access.<br />
            Sign up now to experience the future of authentication.
          </p>
        </div>

        {/* RIGHT SIDE - Clerk Signup */}
        <div className="p-8 bg-white flex items-center justify-center">
          <SignUp
            path="/signup"
            routing="path"
            signInUrl="/login"
            appearance={{
              elements: {
                card: 'shadow-none w-full',
                headerTitle: 'text-xl font-bold text-center text-gray-800 mb-2',
                headerSubtitle: 'text-sm text-gray-500 text-center mb-6',
                formFieldLabel: 'text-sm text-gray-700 mb-1',
                formFieldInput: 'w-full border rounded px-3 py-2 text-sm',
                formButtonPrimary:
                  'w-full bg-teal-600 hover:bg-teal-700 text-white py-2 mt-4 rounded',
                footerActionText: 'text-sm text-gray-600 mt-4 text-center',
                footerActionLink: 'text-teal-600 hover:underline ml-1',
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Signup;
