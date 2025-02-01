"use server";

import { Database } from "types_db";
import { createServerSupabaseClient } from "utils/supabase/server";

export type MovieRow = Database["public"]["Tables"]["movies"]["Row"];

function handleError(error: Error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function searchMovies(searchInput = ""): Promise<MovieRow[]> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .like("title", `%${searchInput}%`)
    .order("id", { ascending: false });
  handleError(error);
  return data;
}

export async function getMovie(id): Promise<MovieRow> {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase
    .from("movies")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  handleError(error);
  return data;
}
