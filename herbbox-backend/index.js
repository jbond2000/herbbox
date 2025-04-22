// File: herbbox-backend/index.js

require('dotenv').config(); // MUST come first

const express     = require('express');
const cors        = require('cors');
const stripe      = require('stripe')(process.env.STRIPE_SECRET_KEY);
const nodemailer  = require('nodemailer');

const app = express();

// ─── Nodemailer setup ─────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host:     process.env.SMTP_HOST,
  port:    +process.env.SMTP_PORT,
  secure:   false,  // true if you use port 465
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 1) Verify SMTP connection on startup
transporter.verify((err, success) => {
  if (err) {
    console.error('❌ SMTP connection error:', err);
  } else {
    console.log('✅ SMTP server is ready to send messages');
  }
});

// Helper to send confirmation email
async function sendConfirmationEmail(toEmail, amount) {
  const mailOptions = {
    from: `"The Herb Box" <${process.env.SMTP_USER}>`,
    to:   toEmail,
    subject: 'Your Herb Box Order Confirmation',
    text:    `Thanks for your order! We’ve received payment of £${amount} and are packing your Herb Box now.`,
    html: `
      <h1>Thank you for your order!</h1>
      <p>We’ve received payment of <strong>£${amount}</strong> and will ship your Herb Box right away.</p>
      <p>If you have any questions, reply to this email or contact hello@theherbbox.co.uk.</p>
    `,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('📧 Confirmation email sent:', info.messageId);
  } catch (err) {
    console.error('❌ Error sending confirmation email:', err);
  }
}

// ─── Stripe webhook endpoint (raw body) ────────────────────────────────────────
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed:', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
      const session       = event.data.object;
      const customerEmail = session.customer_details.email;
      const amount        = (session.amount_total / 100).toFixed(2);

      console.log('🔔 Checkout session completed, sending email to', customerEmail);
      sendConfirmationEmail(customerEmail, amount);
    }

    res.status(200).end();
  }
);

// ─── JSON + CORS for your frontend ─────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

// ─── Create Checkout Session ──────────────────────────────────────────────────
app.post('/create-checkout-session', async (req, res) => {
  try {
    const quantity = req.body.quantity || 1;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'gbp',
          product_data: {
            name:        'The Herb Box',
            description: 'Wooden planter with soil, seeds & instructions',
          },
          unit_amount: 1999, // pence
        },
        quantity,
      }],
      success_url: 'http://localhost:3000/success',
      cancel_url:  'http://localhost:3000/',
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    res.status(500).json({ error: error.message });
  }
});

// ─── Test‑email route ───────────────────────────────────────────────────────────
app.post('/test-email', async (req, res) => {
  try {
    // send a dummy £0.00 email to yourself
    await sendConfirmationEmail(process.env.SMTP_USER, '0.00');
    res.send('✅ Test email sent (check your inbox or spam folder)');
  } catch (err) {
    console.error('❌ Test email failed:', err);
    res.status(500).send('❌ Test email failed: ' + err.message);
  }
});

app.listen(4242, () =>
  console.log('✅ Stripe & email server running on http://localhost:4242')
);
