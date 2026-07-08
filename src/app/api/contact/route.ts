import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { name, email, phone, business, service, budget, message } = data;

    // Validate the request data
    if (!name || !email || !phone || !service || !budget) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check if email credentials are set
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("WARNING: EMAIL_USER or EMAIL_PASS is missing in .env.local.");
      console.warn("Form submission received but email was not sent. Data:", data);
      // Simulate success for frontend
      return NextResponse.json({ success: true, warning: 'Email not sent due to missing credentials' }, { status: 200 });
    }

    // Configure nodemailer transport
    const transporter = nodemailer.createTransport({
      service: 'gmail', // You can change this if using a different provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'cineog12@gmail.com', // Your receiving email address
      replyTo: email,
      subject: `New Inquiry from ${name} - ${business}`,
      html: `
        <h2>New Shoot Inquiry</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Business / Brand:</strong> ${business}</p>
        <p><strong>Required Service:</strong> ${service}</p>
        <p><strong>Budget (₹):</strong> ${budget}</p>
        <br/>
        <h3>Message Details:</h3>
        <p>${message.replace(/\n/g, '<br/>')}</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
