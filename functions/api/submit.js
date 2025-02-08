/**
 * POST /api/submit
 */
import { Resend } from "resend";

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
    
    // Initialize Resend
    const resend = new Resend("re_ABavWFQW_BPTRmGqwR4Nuj1yx9cfffgkH");
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "no-reply@islandroofers.co.uk", // Adjust domain as needed
      to: emailAddress,
      subject: subject,
      html: `<pre>${body}</pre>`,
    });
    
    if (error) {
      console.error("Resend email error:", error);
      throw new Error("Failed to send email");
    }

    // Redirect user to thank-you.html
    return Response.redirect("https://www.islandroofers.co.uk/thank-you.html", 302);
  } catch (err) {
    console.error("Form submission error:", err);
    return new Response(err, { status: 500 });
  }
}