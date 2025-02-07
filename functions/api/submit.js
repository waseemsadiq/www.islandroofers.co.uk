/**
 * POST /api/submit
 */
export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();
    let output = {};
    for (let [key, value] of input) {
      let tmp = output[key];
      if (tmp === undefined) {
        output[key] = value;
      } else {
        output[key] = [].concat(tmp, value);
      }
    }

    let pretty = JSON.stringify(output, null, 2);
    
    // Define email parameters
    const emailAddress = "waseem2202@gmail.com"; // Replace with your email
    const subject = "New Form Submission";
    const body = `You have received a new form submission:\n\n${pretty}`;
    
    // Send email using Cloudflare Email Routing (if enabled) or third-party service
    const sendEmail = await fetch("https://api.mailchannels.net/tx/v1/send", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: emailAddress }] }],
        from: { email: "no-reply@islandroofers.co.uk" }, // Adjust domain as needed
        subject: subject,
        content: [{ type: "text/plain", value: body }],
      }),
    });
    
    if (!sendEmail.ok) {
      throw new Error("Failed to send email");
    }

    // Redirect user to thank-you.html
    return Response.redirect("/thank-you.html", 302);
  } catch (err) {
    return new Response("Error processing request", { status: 500 });
  }
}
