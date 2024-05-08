import { createClient } from "./supabase";

type Options = {
  prevPath: string | null;
};

export async function uploadImage(file: File, path: string, options?: Options) {
  const uid = `thumbnail:${crypto.randomUUID().replaceAll("-", "")}`;

  const supabase = createClient("server_action");
  if (options?.prevPath) {
    await supabase.storage.from("images").remove([options.prevPath]);
  }
  const { data, error } = await supabase.storage
    .from("images")
    .upload(path.concat(uid), file, { upsert: true });

  if (error) throw error;

  const url = supabase.storage.from("images").getPublicUrl(data.path);

  return {
    url: url.data.publicUrl,
    path: data.path
  };
}
