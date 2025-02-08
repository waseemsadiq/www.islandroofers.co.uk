/**
 * POST /api/submit
 */
import { Resend } from "resend";

export async function onRequestPost(context) {
  try {
    let input = await context.request.formData();
    
    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'service_type', 'details'];
    for (const field of requiredFields) {
      if (!input.get(field)) return badRequest(`Missing required field: ${field}`);
    }

    const emailContent = `
      New Quote Request Received:
      ---------------------------
      Name: ${input.get('name')}
      Email: ${input.get('email')}
      Phone: ${input.get('phone')}
      Service Type: ${input.get('service_type')}
      ${input.get('other_description') ? `Other Description: ${input.get('other_description')}` : ''}
      Details: ${input.get('details')}
      
      Received at: ${new Date().toISOString()}
    `;
    
    // Define email parameters
    const emailAddress = "lovablerogue@islandroofers.com"; // Replace with your email
    const subject = "New Quote Request";
    const body = emailContent;
    
    // Initialize Resend
    const resend = new Resend("re_ABavWFQW_BPTRmGqwR4Nuj1yx9cfffgkH");
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "no-reply@islandroofers.co.uk", // Adjust domain as needed
      to: emailAddress,
      subject: subject,
      html: body,
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