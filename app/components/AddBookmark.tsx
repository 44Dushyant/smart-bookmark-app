"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabaseClient";

export default function AddBookmark({ user }: any) {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const addBookmark = async () => {
    if (!title || !url) return;

    const { error } = await supabase
      .from("bookmarks")
      .insert([{ title, url, user_id: user.id }]);

    if (error) {
      alert("Error adding bookmark");
      console.log(error);
    } else {
      setTitle("");
      setUrl("");
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md mb-6">
      <h2 className="font-semibold mb-4">Add Bookmark</h2>

      <div className="flex gap-3">
        <input
          className="border p-2 rounded w-1/3"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          className="border p-2 rounded w-2/3"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button
          onClick={addBookmark}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Add
        </button>
      </div>
    </div>
  );
}
