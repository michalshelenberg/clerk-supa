"use client";

import { createNote } from "@/app/actions";
import { useFormState } from "react-dom";

const initialState = {
  message: "",
};

export default function AddForm() {
  const [state, formAction] = useFormState(createNote, initialState);

  return (
    <form action={formAction}>
      <input type="text" name="note" id="note" className="border" />
      <input type="submit" value="submit" className="border" />
      <p>{state?.message}</p>
    </form>
  );
}
