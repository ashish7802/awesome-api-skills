const { data, error } = await resend.emails.send({ ... });
if (error) { console.error('Failed to send:', error.message); }