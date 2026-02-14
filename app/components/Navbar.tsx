"use client";

import { supabase } from "../../lib/supabaseClient";

const Navbar = ({ user }: any) => {

  const logout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <div className="bg-white shadow-md p-4 flex justify-between">

      <h1 className="font-bold">
        Smart Bookmark Manager
      </h1>

      <div className="flex gap-4 items-center">
        <p className="text-sm">{user?.email}</p>

        <button
          onClick={logout}
          className="bg-red-500 text-white px-4 py-1 rounded"
        >
          Logout
        </button>
      </div>

    </div>
  );
};

export default Navbar;
