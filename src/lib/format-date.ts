export function formatDate(date: Date, options?: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium", ...options }).format(date);
}
