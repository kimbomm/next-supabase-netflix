export function getImageUrl(path: string) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const storageBucket = process.env.NEXT_PUBLIC_STORAGE_BUCKET;
  return `${supabaseUrl}/storage/v1/object/public/${storageBucket}/${path}`;
}
