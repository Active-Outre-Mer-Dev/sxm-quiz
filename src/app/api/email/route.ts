import { EmailTemplate } from "./email-template";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  const headers = new Headers();
  headers.set("Content-Type", "application/json");
  console.log(request.headers.get("Content-Type"));
  const form = await request.formData();
  const message = form.get("message");
  const title = form.get("title");
  if (!message) {
    return new Response(JSON.stringify({ message: "Must include message" }), { status: 400, headers });
  }
  try {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: "a.carty2555@gmail.com",
      subject: `Feedback for ${title}`,
      react: EmailTemplate({ message: message.toString() })
    });

    return new Response(JSON.stringify({ message: "Email sent!" }), { status: 200, headers });
  } catch (error) {
    return new Response(JSON.stringify({ message: "An error occurred" }), { status: 500, headers });
  }
}
