# Insider Tips MVP

Static MVP to sell and deliver “Unlock Saigon Insider Tips for $1”. No backend.

## Routes
- `/insider`: Landing page with value props, teaser, social proof, and CTA
- `/insider/thank-you`: Gated page that contains the full tips content

## How payments work (Stripe Payment Link)
1. Create a Payment Link in Stripe Dashboard.
2. In the Payment Link settings, set the post-payment redirect URL to:
   - `https://your-domain.com/insider/thank-you`
3. Copy the Payment Link URL and update it in `insider/index.html`:
   - Find `STRIPE_PAYMENT_LINK` and paste your live link.
4. Optional: In Stripe’s receipt settings, add a note with the same URL so buyers have it in email.

## Gating
- MVP uses an obscure URL (`/insider/thank-you`). If abuse appears, add a one-time token layer later.

## Export / Offline access
- On the thank-you page users can “Copy all” or “Print / Save as PDF” (uses the browser print dialog with print styles).

## Deploy
Any static host works (GitHub Pages, Netlify, Vercel, S3, nginx). Ensure both routes resolve:
- If using a custom domain: point it to your static host
- Make sure the `/insider/thank-you` path serves `insider/thank-you/index.html`

## Add CTAs around your site
- Home hero (small link)
- Testimonials section
- Tours pages (post-tour upsell)
- Footer badge

## Refunds
Offer a simple money-back guarantee. You can process refunds directly in Stripe.
