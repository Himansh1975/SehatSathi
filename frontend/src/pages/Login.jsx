import { SignIn } from "@clerk/clerk-react";
import Logo from '../assets/logo.png';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-70 via-white to-green-50">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <div className="flex flex-col items-center mb-6">
          <img src={Logo} alt="logo" className="w-10 mb-4" />
          <h2 className="text-2xl font-bold">Welcome Back</h2>
          <p className="text-sm text-gray-500 mt-1">
            Enter your email and password to access your account.
          </p>
        </div>

        <SignIn
          appearance={{
            elements: {
              card: 'shadow-none',
              formButtonPrimary:
                'bg-teal-600 hover:bg-teal-700 text-white text-sm py-2 rounded mt-2',
              socialButtonsBlockButton:
                'bg-gray-100 hover:bg-gray-200 text-sm rounded my-1',
              formFieldInput:
                'border px-3 py-2 text-sm rounded w-full focus:outline-none focus:ring-2 focus:ring-teal-500',
              formFieldLabel: 'text-sm mb-1',
              footerActionText: 'text-sm',
              footerActionLink: 'text-teal-600 hover:underline ml-1 text-sm',
            },
          }}
          routing="path"
          path="/login"
          signUpUrl="/signup"
        />
      </div>
    </div>
  );
};

export default Login;
