import { Request, Response } from "express";
import Stripe from "stripe";
import StripeWebhookService from "../service/stripe_webhook.service";
import { StripeEvents } from "../util/event";

const stripe = new Stripe(process.env.STRIPE_SECRET, {
    apiVersion: null,
    typescript: true,
});

/**
 * Stripe Hook.
 * @route POST /
 */
export const stripeHook = async (req: Request, res: Response) => {
    /* Checking if the STRIPE_WEBHOOK_SECRET is set. */
    if (process.env.STRIPE_WEBHOOK_SECRET) {
        try {
            // Retrieve the event by verifying the signature using the raw body and secret.
            let signature = req.headers["stripe-signature"];
            /* Verifying the signature of the stripe webhook event. */
            const event = stripe.webhooks.constructEvent(req["body"], signature, process.env.STRIPE_WEBHOOK_SECRET);

            switch (event.type) {
                case StripeEvents.cutomerUpdated:
                    await StripeWebhookService.handleCustomerDeleted(res, event.data.object as Stripe.Customer);
                    break;
                case StripeEvents.customerDeleted:
                    await StripeWebhookService.handleCustomerUpdated(res, event.data.object as Stripe.Customer);
                    break;
                case StripeEvents.customerSubscriptionCreated:
                    await StripeWebhookService.handleSubscriptionCreated(res, event.data.object as Stripe.Subscription);
                    break;
                case StripeEvents.customerSubscriptionUpdated:
                    await StripeWebhookService.handleSubscriptionUpdated(res, event.data.object as Stripe.Subscription);
                    break;
                case StripeEvents.customerSubscriptionDeleted:
                    await StripeWebhookService.handleSubscriptionDeleted(res, event.data.object as Stripe.Subscription);
                    break;
                case StripeEvents.customerSubscriptionTrialWillEnd:
                    await StripeWebhookService.handleSubscriptionTrialWillEnd(res, event.data.object as Stripe.Subscription);
                    break;
                case StripeEvents.chargeCaptured:
                    await StripeWebhookService.handleChargeCaptured(res, event.data.object as Stripe.Charge);
                    break;
                case StripeEvents.chargeFailed:
                    await StripeWebhookService.handleChargeFailed(res, event.data.object as Stripe.Charge);
                    break;
                case StripeEvents.chargeRefunded:
                    await StripeWebhookService.handleChargeRefunded(res, event.data.object as Stripe.Charge);
                    break;
                case StripeEvents.chargeSucceded:
                    await StripeWebhookService.handleChargeSucceded(res, event.data.object as Stripe.Charge);
                    break;
                case StripeEvents.chargeDisputeCreated:
                    await StripeWebhookService.handleChargeDisputeCreated(res, event.data.object as Stripe.Charge);
                    break;
                case StripeEvents.chargeDisputeClosed:
                    await StripeWebhookService.handleChargeDisputeClosed(res, event.data.object as Stripe.Charge);
                    break;
                case StripeEvents.chargeDisputeFundsWithdrawn:
                    await StripeWebhookService.handleChargeDisputeFundsWithdrawn(res, event.data.object as Stripe.Charge);
                    break;
                case StripeEvents.chargeDisputeFundsReinstated:
                    await StripeWebhookService.handleChargeDisputeFundsReinstated(res, event.data.object as Stripe.Charge);
                    break;
                case StripeEvents.invoicePaymentFailed:
                    await StripeWebhookService.handleInvoicePaymentFailed(res, event.data.object as Stripe.Invoice);
                    break;
                case StripeEvents.invoicePaymentSucceeded:
                    await StripeWebhookService.handleInvoicePaymentSucceeded(res, event.data.object as Stripe.Invoice);
                    break;
                case StripeEvents.invoiceUpdated:
                    await StripeWebhookService.handleInvoiceUpdated(res, event.data.object as Stripe.Invoice);
                    break;
                case StripeEvents.invoiceFinalized:
                    await StripeWebhookService.handleInvoiceFinalized(res, event.data.object as Stripe.Invoice);
                    break;
                case StripeEvents.invoicePaid:
                    await StripeWebhookService.handleInvoicePaid(res, event.data.object as Stripe.Invoice);
                    break;
                case StripeEvents.payoutCreated:
                    await StripeWebhookService.handlePayoutCreated(res, event.data.object as Stripe.Payout);
                    break;
                case StripeEvents.payoutFailed:
                    await StripeWebhookService.handlePayoutFailed(res, event.data.object as Stripe.Payout);
                    break;
                case StripeEvents.payoutPaid:
                    await StripeWebhookService.handlePayoutPaid(res, event.data.object as Stripe.Payout);
                    break;
                case StripeEvents.payoutCanceled:
                    await StripeWebhookService.handlePayoutCanceled(res, event.data.object as Stripe.Payout);
                    break;
                case StripeEvents.radarEarlyFraudWarningCreated:
                    await StripeWebhookService.handleRadarEarlyFraudWarningCreated(res, event.data.object as Stripe.Radar.EarlyFraudWarning);
                    break;
                case StripeEvents.radarEarlyFraudWarningUpdated:
                    await StripeWebhookService.handleRadarEarlyFraudWarningUpdated(res, event.data.object as Stripe.Radar.EarlyFraudWarning);
                    break;
                case StripeEvents.transferCreated:
                    await StripeWebhookService.handleTransferCreated(res, event.data.object as Stripe.Transfer);
                    break;
                case StripeEvents.transferFailed:
                    await StripeWebhookService.handleTransferFailed(res, event.data.object as Stripe.Transfer);
                    break;
                case StripeEvents.transferPaid:
                    await StripeWebhookService.handleTransferPaid(res, event.data.object as Stripe.Transfer);
                    break;
                case StripeEvents.transferReversed:
                    await StripeWebhookService.handleTransferReversed(res, event.data.object as Stripe.Transfer);
                    break;
                case StripeEvents.transferUpdated:
                    await StripeWebhookService.handleTransferUpdated(res, event.data.object as Stripe.Transfer);
                    break;
                case StripeEvents.paymentIntentSucceeded:
                    await StripeWebhookService.handlePaymentIntentSucceeded(res, event.data.object as Stripe.PaymentIntent);
                    break;
                case StripeEvents.paymentIntentCreated:
                    await StripeWebhookService.handlePaymentIntentCreated(res, event.data.object as Stripe.PaymentIntent);
                    break;
                case StripeEvents.paymentIntentFailed:
                    await StripeWebhookService.handlePaymentIntentFailed(res, event.data.object as Stripe.PaymentIntent);
                    break;
                default:
                    return res.status(400).send("Unhandled webhook event type: " + event.type);
            }
        } catch (err) {
            console.error(err);
            return res.status(400).send(`Webhook Error: ${err.message}`);
        }
    } else {
        return res.status(400).send("Stripe webhook secret is not set.");
    }
};
