"use server";

import { createServerSupabaseClient } from "utils/supabase/server";

function handleError(error: Error) {
  if (error) {
    console.error(error);
    throw error;
  }
}

export async function uploadFile(formData: FormData) {
  const supabase = await createServerSupabaseClient();

  const files = Array.from(formData.entries()).map(
    ([key, value]) => value as File
  );

  const results = Promise.all(
    files.map(async (file) => {
      await supabase.storage
        .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
        .upload(file.name, file, { upsert: true });
    })
  );

  return results;
}

export async function searchFiles(search: string = "") {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .list(null, { search });

  handleError(error);

  return data;
}

export async function deleteFile(fileName: string) {
  const supabase = await createServerSupabaseClient();
  const { data, error } = await supabase.storage
    .from(process.env.NEXT_PUBLIC_STORAGE_BUCKET)
    .remove([fileName]);

  handleError(error);

  return data;
}
