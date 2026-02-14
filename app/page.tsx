"use client";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {

  const loginWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/dashboard`,
      },
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-white p-10 rounded-xl shadow-md text-center">
        
        <h1 className="text-2xl font-bold mb-6">
          Smart Bookmark App
        </h1>

        <button
          onClick={loginWithGoogle}
          className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800"
        >
          Sign in with Google
        </button>

      </div>

    </div>
  );
}
