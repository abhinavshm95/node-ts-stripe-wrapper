import Stripe from "stripe";

/* This class is a singleton that creates a Stripe client and returns it. */
export class StripeClient {
    public static GetInstance() {
        if (this.client == null) {
            this.client = new Stripe(process.env.STRIPE_SECRET_KEY, {
                apiVersion: null,
                typescript: true,
            });
        }
        return this.client;
    }
    private static client: Stripe;
    private constructor() {}
}
