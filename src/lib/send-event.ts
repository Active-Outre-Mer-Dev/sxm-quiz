export function sendQuizEvent(name: string, properties: { Category: string; Type: string; Title: string }) {
  fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, properties })
  });
}
