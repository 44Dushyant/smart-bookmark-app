"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";
import Navbar from "../components/Navbar";
import AddBookmark from "../components/AddBookmark";
import BookmarkList from "../components/BookmarkList";

export default function Dashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) window.location.href = "/";
      else setUser(data.user);
    });
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <Navbar user={user} />

      <div className="p-10 max-w-3xl mx-auto">
        <AddBookmark user={user} />
        <BookmarkList />
      </div>
    </div>
  );
}
