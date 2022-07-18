import { Response } from "express";
import Stripe from "stripe";

/* This class is a service that handles all of the Stripe webhooks */
class StripeWebhookService {
    async handleCustomerDeleted(res: Response, customer: Stripe.Customer) {
        console.log(`hook info :: `, customer);
        res.status(200)
    }
    async handleCustomerUpdated(res: Response, customer: Stripe.Customer) {
        console.log(`hook info :: `, customer);
        res.status(200)
    }
    async handleSubscriptionCreated(res: Response, subscription: Stripe.Subscription) {
        console.log(`hook info :: `, subscription);
        res.status(200)
    }
    async handleSubscriptionUpdated(res: Response, subscription: Stripe.Subscription) {
        console.log(`hook info :: `, subscription);
        res.status(200)
    }
    async handleSubscriptionDeleted(res: Response, subscription: Stripe.Subscription) {
        console.log(`hook info :: `, subscription);
        res.status(200)
    }
    async handleSubscriptionTrialWillEnd(res: Response, subscription: Stripe.Subscription) {
        console.log(`hook info :: `, subscription);
        res.status(200)
    }
    async handleChargeCaptured(res: Response, charge: Stripe.Charge) {
        console.log(`hook info :: `, charge);
        res.status(200)
    }
    async handleChargeFailed(res: Response, charge: Stripe.Charge) {
        console.log(`hook info :: `, charge);
        res.status(200)
    }
    async handleChargeRefunded(res: Response, charge: Stripe.Charge) {
        console.log(`hook info :: `, charge);
        res.status(200)
    }
    async handleChargeSucceded(res: Response, charge: Stripe.Charge) {
        console.log(`hook info :: `, charge);
        res.status(200)
    }
    async handleChargeDisputeCreated(res: Response, charge: Stripe.Charge) {
        console.log(`hook info :: `, charge);
        res.status(200)
    }
    async handleChargeDisputeClosed(res: Response, charge: Stripe.Charge) {
        console.log(`hook info :: `, charge);
        res.status(200)
    }
    async handleChargeDisputeFundsWithdrawn(res: Response, charge: Stripe.Charge) {
        console.log(`hook info :: `, charge);
        res.status(200)
    }
    async handleChargeDisputeFundsReinstated(res: Response, charge: Stripe.Charge) {
        console.log(`hook info :: `, charge);
        res.status(200)
    }
    async handleInvoicePaymentFailed(res: Response, invoice: Stripe.Invoice) {
        console.log(`hook info :: `, invoice);
        res.status(200)
    }
    async handleInvoicePaymentSucceeded(res: Response, invoice: Stripe.Invoice) {
        console.log(`hook info :: `, invoice);
        res.status(200)
    }
    async handleInvoiceUpdated(res: Response, invoice: Stripe.Invoice) {
        console.log(`hook info :: `, invoice);
        res.status(200)
    }
    async handleInvoiceFinalized(res: Response, invoice: Stripe.Invoice) {
        console.log(`hook info :: `, invoice);
        res.status(200)
    }
    async handleInvoicePaid(res: Response, invoice: Stripe.Invoice) {
        console.log(`hook info :: `, invoice);
        res.status(200)
    }
    async handlePayoutCreated(res: Response, payout: Stripe.Payout) {
        console.log(`hook info :: `, payout);
        res.status(200)
    }
    async handlePayoutFailed(res: Response, payout: Stripe.Payout) {
        console.log(`hook info :: `, payout);
        res.status(200)
    }
    async handlePayoutPaid(res: Response, payout: Stripe.Payout) {
        console.log(`hook info :: `, payout);
        res.status(200)
    }
    async handlePayoutCanceled(res: Response, payout: Stripe.Payout) {
        console.log(`hook info :: `, payout);
        res.status(200)
    }
    async handleRadarEarlyFraudWarningCreated(res: Response, radar: Stripe.Radar.EarlyFraudWarning) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handleRadarEarlyFraudWarningUpdated(res: Response, radar: Stripe.Radar.EarlyFraudWarning) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handleTransferCreated(res: Response, radar: Stripe.Transfer) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handleTransferFailed(res: Response, radar: Stripe.Transfer) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handleTransferPaid(res: Response, radar: Stripe.Transfer) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handleTransferReversed(res: Response, radar: Stripe.Transfer) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handleTransferUpdated(res: Response, radar: Stripe.Transfer) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handlePaymentIntentSucceeded(res: Response, radar: Stripe.PaymentIntent) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handlePaymentIntentCreated(res: Response, radar: Stripe.PaymentIntent) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
    async handlePaymentIntentFailed(res: Response, radar: Stripe.PaymentIntent) {
        console.log(`hook info :: `, radar);
        res.status(200)
    }
}

export default new StripeWebhookService();
