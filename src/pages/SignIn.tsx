import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back</h1>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </div>
        <SignIn 
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-green-600 hover:bg-green-700 text-sm normal-case",
              card: "bg-white shadow-xl border-0",
              headerTitle: "hidden",
              headerSubtitle: "hidden",
              socialButtonsBlockButton: 
                "border-gray-200 hover:bg-gray-50 text-gray-600 text-sm normal-case",
              formFieldInput: 
                "border-gray-200 focus:border-green-600 focus:ring-green-600",
              footerActionLink: 
                "text-green-600 hover:text-green-700",
            },
          }}
          routing="path"
          path="/sign-in"
          redirectUrl="/dashboard"
          signUpUrl="/sign-up"
        />
      </div>
    </div>
  );
} 