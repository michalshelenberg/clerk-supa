import AddForm from "@/components/add-form";
import { supabaseClient } from "@/lib/supabaseClient";
import { auth } from "@clerk/nextjs/server";

async function getNotes() {
  const { userId, getToken } = auth();

  if (userId) {
    const supabaseAccessToken = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(supabaseAccessToken);

    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .eq("user_id", userId);

    return data;
  }
}

export default async function Page() {
  const notes = await getNotes();

  const { userId } = auth();

  return (
    <main>
      {notes?.map((note) => (
        <p key={note.id}>{note.value}</p>
      ))}
      {userId && <AddForm />}
    </main>
  );
}
