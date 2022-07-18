import dotenv from "dotenv";
import express from "express";
import path from "path";
import { StripeClient } from "./config/stripe";

// Controllers (route handlers)
import * as homeController from "./controllers/stripe";
import stripeService from "./service/stripe.service";

// Create Express server
const app = express();

// Loading the environment variables from the .env file.
dotenv.config();

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use((req, res, next) => {
    /* This is a middleware that checks if the request is coming from Stripe. */
    if (req.originalUrl === "/api/v1/webhook/stripe") {
        next();
    } else {
        express.json()(req, res, next);
    }
});

app.use(express.static(path.join(__dirname, "../src/public")));

/* This is a route that serves the index.html file. */
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "../src/public/index.html"));
});

/**
 * Primary app routes.
 */
app.get("/config", (req, res) => {
    return res.send({
        publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
});

app.post("/api/v1/stripe/create-payment-intent" ,async (req, res) => {
    // Create a PaymentIntent with the amount, currency, and automatic payment method type.
    try {
        const { amount, currency } = req.body;
        
        if (!amount || !currency) {
            throw Error("Amount and currency are required.");
        }
        const stripe = StripeClient.GetInstance();

        const intent = await stripeService.createPaymentIntent(stripe, currency, amount);

        // Send publishable key and PaymentIntent details to client
        res.send({
            clientSecret: intent.client_secret,
        });
    } catch (e) {
        return res.status(400).send({
            error: {
                message: e.message,
            },
        });
    }
});

app.post("/api/v1/webhook/stripe", express.raw({ type: "application/json" }), homeController.stripeHook);

export default app;
