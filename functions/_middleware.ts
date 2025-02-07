import mailchannelsPlugin from "@cloudflare/pages-plugin-mailchannels";

export const onRequest = mailchannelsPlugin({
  personalizations: [
    {
      to: [{ name: "Waseem", email: "waseem2202@gmail.com" }],
    },
  ],
  from: { name: "Island Roofers", email: "no-reply@roofz.co.uk" },
  respondWith: () =>
    new Response(null, {
      status: 302,
      headers: { Location: "/thank-you" },
    }),
});