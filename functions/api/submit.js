/**
 * POST /api/submit
 * https://developers.cloudflare.com/workers/tutorials/send-emails-with-resend/
 */
import { Resend } from "resend";

export default {
  async fetch(request, env, ctx) {
    const resend = new Resend(env.RESEND_API_KEY);

    const { data, error } = await resend.emails.send({
      from: "hello@example.com",
      to: "someone@example.com",
      subject: "Hello World",
      html: "<p>Hello from Workers</p>",
    });

    return Response.json({ data, error });
  },
};