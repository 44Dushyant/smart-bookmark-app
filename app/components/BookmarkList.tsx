"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function BookmarkList() {
  const [bookmarks, setBookmarks] = useState<any[]>([]);

  const fetchBookmarks = async () => {
    const { data } = await supabase
      .from("bookmarks")
      .select("*")
      .order("created_at", { ascending: false });

    setBookmarks(data || []);
  };

  useEffect(() => {
    fetchBookmarks();

    const channel = supabase
      .channel("realtime-bookmarks")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "bookmarks" },
        () => fetchBookmarks()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const deleteBookmark = async (id: string) => {
    await supabase.from("bookmarks").delete().eq("id", id);
  };

  return (
    <div className="space-y-5">

      {bookmarks.map((bm) => (
        <div
          key={bm.id}
          className="bg-white/80 backdrop-blur-xl border border-white/40 shadow-lg p-5 rounded-2xl flex justify-between items-center hover:shadow-xl hover:scale-[1.02] transition"
        >
          <div>
            <p className="font-semibold text-gray-800">
              {bm.title}
            </p>

            <a
              href={bm.url}
              target="_blank"
              className="text-indigo-600 text-sm hover:underline"
            >
              {bm.url}
            </a>
          </div>

          <button
            onClick={() => deleteBookmark(bm.id)}
            className="bg-red-500 text-white px-4 py-1.5 rounded-full shadow hover:scale-105 transition"
          >
            Delete
          </button>
        </div>
      ))}

    </div>
  );
}
