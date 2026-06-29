import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);
await resend.emails.send({ from: 'onboarding@resend.dev', to: 'user@gmail.com', subject: 'Hello', html: '<p>Hi</p>' });