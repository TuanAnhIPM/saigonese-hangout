import Stripe from 'stripe';

export default async function handler(req, res) {
  if (req.method && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ error: 'Missing STRIPE_SECRET_KEY' });
  }

  const priceId = process.env.STRIPE_PRICE_ID || 'price_XXXX';
  const siteOrigin = process.env.SITE_ORIGIN || (req.headers.origin || 'https://yourdomain.com');
  const stripe = new Stripe(secretKey);

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${siteOrigin}/insider/thank-you?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${siteOrigin}/insider`,
      allow_promotion_codes: false,
    });
    return res.status(200).json({ url: session.url });
  } catch (e) {
    return res.status(500).json({ error: 'Failed to create checkout session' });
  }
}


