import Stripe from "stripe";

/* This class is a service that handles all of the Stripe webhooks */
class StripeService {
    async createConnectedAccountLink(stripe: Stripe, connectedAccID: string) {
        try {
            const accountLink = await stripe.accountLinks.create({
                account: connectedAccID,
                refresh_url: "https://example.com/reauth",
                return_url: "https://example.com/return",
                type: "account_onboarding",
            });
            return accountLink;
        } catch (error) {
            console.log("--error-in-create-connected-account-link-", error);
            throw Error(error);
        }
    }

    async transferToAConnectedAccount(stripe: Stripe, connectedAccID: string, amount: number, currency: string, chargeID: string, transferGroupID: string) {
        try {
            const transfer = await stripe.transfers.create({
                destination: connectedAccID,
                amount: amount * 100, // amount is in cents
                currency: currency,
                description: "Transfer to connected account",
                source_transaction: chargeID,
                transfer_group: transferGroupID,
            });
            return transfer;
        } catch (error) {
            console.log("--error-in-transfer-to-a-connected-account-", error);
            throw Error(error);
        }
    }

    // It'll not capture the charge
    async authorizeACharge(stripe: Stripe, cardID: string, amount: number, currency: string, transferGroupID: string) {
        try {
            const charge = await stripe.charges.create({
                amount: amount * 100, // amount is in cents
                currency: currency,
                description: "Authorize a charge",
                source: cardID,
                capture: false,
                transfer_group: transferGroupID,
            });
            return charge;
        } catch (error) {
            console.log("--error-in-authorize-a-charge-", error);
            throw Error(error);
        }
    }

    async refundTransfer(stripe: Stripe, chargeID: string, amount: number) {
        try {
            const reverse = await stripe.refunds.create({
                charge: chargeID,
                reverse_transfer: true,
                amount: amount * 100, // amount is in cents
            });
            return reverse;
        } catch (error) {
            console.log("--error-in-refund-transfer-", error);
            throw Error(error);
        }
    }

    async chargeCardOnBehalfOfConnectedAccount(stripe: Stripe, connectedAccID: string, amount: number, currency: string, customerToken: string) {
        try {
            const charge = await stripe.charges.create({
                amount: amount * 100, // amount is in cents
                currency: currency,
                description: "Charge card on behalf of connected account",
                source: customerToken,
                on_behalf_of: connectedAccID,
                application_fee_amount: amount * 100, // amount is in cents
            });
            return charge;
        } catch (error) {
            console.log("--error-in-charge-card-on-behalf-of-connected-account-", error);
            throw Error(error);
        }
    }

    async getConnectedAccountBalance(stripe: Stripe, connectedAccID: string) {
        try {
            const balance = await stripe.balance.retrieve({
                stripe_account: connectedAccID,
            });
            return balance;
        } catch (error) {
            console.log("--error-in-get-connected-account-balance-", error);
            throw Error(error);
        }
    }

    async createdSubscription(stripe: Stripe, planID: string, customerID: string) {
        try {
            const subscription = await stripe.subscriptions.create({
                customer: customerID,
                items: [{ plan: planID }],
            });
            return subscription;
        } catch (error) {
            console.log("--error-in-created-subscription-", error);
            throw Error(error);
        }
    }

    async deleteSubscription(stripe: Stripe, subscriptionID: string) {
        try {
            const subscription = await stripe.subscriptions.del(subscriptionID);
            return subscription;
        } catch (error) {
            console.log("--error-in-delete-subscription-", error);
            throw Error(error);
        }
    }

    async captureCharge(stripe: Stripe, chargeID: string) {
        try {
            const charge = await stripe.charges.capture(chargeID);
            return charge;
        } catch (error) {
            console.log("--error-in-capture-charge-", error);
            throw Error(error);
        }
    }

    async createPaymentIntent(stripe: Stripe, currency: string, amount: number) {
        try {
            return await stripe.paymentIntents.create({
                currency: currency,
                amount: amount * 100, // amount is in cents 
                automatic_payment_methods: { enabled: true }
            });
        } catch (error) {
            console.log("--error-in-create-payment-intent-", error);
            throw Error(error);
        }
    }
}

export default new StripeService();
