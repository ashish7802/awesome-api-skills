const res = await fetch('https://api.revenuecat.com/v1/subscribers/user_123', { headers: { Authorization: `Bearer ${SECRET}` } });
const data = await res.json();
const isPro = data.subscriber.entitlements.pro?.expires_date > new Date().toISOString();