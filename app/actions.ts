"use server";

import { supabaseClient } from "@/lib/supabaseClient";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function createNote(prevState: any, formData: FormData) {
  const { userId, getToken } = auth();

  if (userId) {
    const supabaseAccessToken = await getToken({ template: "supabase" });
    const supabase = await supabaseClient(supabaseAccessToken);

    try {
      const { data } = await supabase
        .from("notes")
        .insert({ value: formData.get("note"), user_id: userId })
        .select();

      revalidatePath("/");
      return { message: `Added note successfully` };
    } catch (e) {
      return { message: "Failed to create note" };
    }
  }
}
