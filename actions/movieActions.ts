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

export async function searchMovies({ search, page, pageSize }) {
  const supabase = await createServerSupabaseClient();
  const { data, count, error } = await supabase
    .from("movies")
    .select("*", { count: "exact" })
    .like("title", `%${search}%`)
    .order("id", { ascending: true })
    .range((page - 1) * pageSize, page * pageSize - 1);

  const hasNextPage = count > page * pageSize;
  if (error) {
    console.error(error);
    return {
      data: [],
      count: 0,
      page: null,
      pageSize: null,
      error,
    };
  }
  return {
    data,
    page,
    pageSize,
    hasNextPage,
  };
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
