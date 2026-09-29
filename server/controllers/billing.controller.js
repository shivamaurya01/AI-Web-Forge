import { PLANS } from "../config/plan.js";
import stripe from "../config/stripe.js";

export const billing = async (req, res) => {
  try {
    const { planType } = req.body;

    const userId = req.user._id;

    const plan = PLANS[planType];

    if (!plan || plan.price === 0) {
      return res.status(400).json({
        message: "Invalid paid plan",
      });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",

      payment_method_types: ["card"],

      line_items: [
        {
          price_data: {
            currency: "inr",

            product_data: {
              name: `GenWeb.ai ${planType.toUpperCase()} plan`,
            },

            unit_amount: plan.price * 100,
          },

          quantity: 1,
        },
      ],

      metadata: {
        userId: userId.toString(),
        credits: plan.credits.toString(),
        plan: plan.plan,
      },

      success_url: `${process.env.FRONTEND_URL}`,
      cancel_url: `${process.env.FRONTEND_URL}/pricing`,
    });

    return res.status(200).json({
      sessionUrl: session.url,
    });
  } catch (error) {
    console.error("Billing error:", error);

    return res.status(500).json({
      message: `Billing error: ${error.message}`,
    });
  }
};