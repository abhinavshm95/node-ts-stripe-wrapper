document.addEventListener('DOMContentLoaded', async () => {
    const amountAndCurrForm = document.getElementById("payment-details");
    amountAndCurrForm.addEventListener("submit", async e => {
        e.preventDefault();
        // amount value
        const amount  = Number(e.target.amount.value);
        const currency = String(e.target.currency.value)
        if (amount === 0) {
            addMessage(`Amount must be greater than 0`);
            alert("Amount must be greater than 0");
            return;
        }
        if (currency === "") {
            addMessage(`Currency must be selected`);
            alert("Currency must be selected");
            return;
        }
        amountAndCurrForm.querySelector("button").disabled = true;
        document.getElementById("payment-details").style.display = "none";
        document.getElementById("loading-skeleton").style.display = "block";
        createPaymentIntent(amount, currency);
    });



    async function createPaymentIntent(amount, currency) {
        try {
            // Load the publishable key from the server.
            const { publishableKey } = await fetch("/config").then(r => r.json());   
            if (publishableKey) {
                const stripe = Stripe(publishableKey, {
                    apiVersion: "2020-08-27",
                });
        
                // create a PaymentIntent on the server and get clientSecret to
                // initialize the instance of Elements below.
                const { error: backendError, clientSecret } = await fetch("api/v1/stripe/create-payment-intent", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        amount: amount,
                        currency: currency.toUpperCase(),
                    })
                }).then(r => r.json());
                if (backendError) {
                    addMessage(backendError.message);
                }
        
                // Initialize Stripe Elements with the PaymentIntent's clientSecret,
                // then mount the payment element.
                const elements = stripe.elements({ clientSecret });
                const paymentElement = elements.create("payment");
                paymentElement.mount("#payment-element");
                paymentElement.on('ready', function(event) {
                    // Handle ready event
                    document.getElementById("payment-form").style.display = "block";
                    document.getElementById("loading-skeleton").style.display = "none";
            
                    // When the form is submitted...
                    const form = document.getElementById("payment-form");
                    let submitted = false;
                    form.addEventListener("submit", async e => {
                        e.preventDefault();
            
                        // Disable double submission of the form
                        if (submitted) {
                            return;
                        }
                        submitted = true;
                        form.querySelector("button").disabled = true;
            
                        // Confirm the card payment given the clientSecret
                        // from the payment intent that was just created on
                        // the server.
                        const { error: stripeError } = await stripe.confirmPayment({
                            elements,
                            confirmParams: {
                                return_url: `${window.location.origin}/return.html`,
                            },
                        });
            
                        if (stripeError) {
                            addMessage(stripeError.message);
            
                            // re-enable the form.
                            submitted = false;
                            form.querySelector("button").disabled = false;
                            return;
                        }
                    });
                  });
                // paymentElement.
            } else {
                addMessage("No publishable key returned from the server. Please check `.env` and try again");
                alert("Please set your Stripe publishable API key in the .env file");
            }
        } catch (error) {
            addMessage("No publishable key returned from the server. Please check `.env` and try again");
            document.getElementById("payment-details").style.display = "block";
            document.getElementById("loading-skeleton").style.display = "none";
            amountAndCurrForm.querySelector("button").disabled = false;
        }
    }
})

