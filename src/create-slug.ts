export function createSlug(title: string) {
  return title.toLowerCase().trim().replaceAll(" ", "-");
}
