import { route } from "plumier";
import { db } from "../../../model/db";
import { Payments, Customer } from "../../../model/domain";


import Stripe from "stripe";
const stripe = new Stripe("secret key stripe", {
    apiVersion: "2020-03-02",
});

export class PaymentController {
    // pOST /api/v1/payment
    @route.post("")
    async save(data: Payments) {
        // mengambil data customer berdasarkan emai apakah memiliki stripe id(stripeId)
        const email: string = data.email;
        let stripeCustomerId: string = "";
        let stripeClientSecret: string = "";

        const customerDb: Customer = await db("Customer").where({ email }).first();
        if (customerDb === undefined) {
            // insert customer ke stripe
            const params: Stripe.CustomerCreateParams = {
                name: data.name,
                email: data.email,
                description: "Create Customer" + new Date(),
            };

            const customerCreate: Stripe.Customer = await stripe.customers.create(params);
            const intent: Stripe.SetupIntent = await stripe.setupIntents.create({
                customer: customerCreate.id
            });

            const paramsInput: Customer = {
                name: data.name,
                email: data.email,
                customerStripeId: customerCreate.id,
                clientSecret: intent.client_secret === null ? "" : intent.client_secret,
                createdAt: new Date(),
                deleted: false,
                id: 0
            };

            stripeCustomerId = customerCreate.id;
            stripeClientSecret = intent.client_secret === null ? "" : intent.client_secret;

            await db("Customer").insert(paramsInput);

        } else {
            // update customer ke stripe
            const params: Stripe.CustomerUpdateParams = {
                name: data.name,
                email: data.email,
                description: "Customer Update: " + new Date(),
            };
            stripeCustomerId = customerDb.customerStripeId;
            stripeClientSecret = customerDb.clientSecret;

            const customerUpdate: Stripe.Customer = await stripe.customers.update(stripeCustomerId, params);

        }

        // payment method

        const paramsPayThod: Stripe.PaymentMethodCreateParams = {
            type: "card",
            card: {
                number: data.cardNumber,
                exp_month: data.expMonth,
                exp_year: data.expYear,
                cvc: data.cvc,
            },
            billing_details: {
                name: customerDb.name,
                email: customerDb.email,
                phone: "+62087761750826"
            }
        };
        // phone number harus di setting melalui stripe

        const paymentMethod: Stripe.PaymentMethod = await stripe.paymentMethods.create(paramsPayThod);

        const paramsIntent: Stripe.PaymentIntentCreateParams = {
            payment_method: paymentMethod.id,
            amount: data.amount,
            currency: "usd",
            customer: stripeCustomerId,
            payment_method_types: ["card"],
            description: "testing use api payment intent use setting payment method"
        };

        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(paramsIntent);
        stripeClientSecret = paymentIntent.id === null ? "" : paymentIntent.id;
        const paramsConfirm: Stripe.PaymentIntentConfirmParams = {
            payment_method: paymentMethod.id
        };

        const paymentConfirm: Stripe.PaymentIntent = await stripe.paymentIntents.confirm(stripeClientSecret, paramsConfirm);

        return paymentConfirm.status;

    }



}