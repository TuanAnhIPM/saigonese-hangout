import Stripe from 'stripe';

export default async function handler(req, res) {
  const sessionId = (req.query && req.query.session_id) || (new URL(req.url, 'http://localhost').searchParams.get('session_id'));
  if (!sessionId) return res.status(400).json({ ok: false });

  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) return res.status(500).json({ ok: false });

  const stripe = new Stripe(secretKey);
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const isPaid = session.payment_status === 'paid';
    const amountOk = session.amount_total === 499; // $4.99 in cents
    return res.status(200).json({ ok: isPaid && amountOk });
  } catch {
    return res.status(500).json({ ok: false });
  }
}


