import { route } from "plumier";
import { db } from "../../../model/db";
import { Payments, Customer } from "../../../model/domain";


import Stripe from "stripe";
const stripe = new Stripe("secret key stripe", {
    apiVersion: "2020-03-02",
});

export class TipsistripeController {
    // pOST /api/v1/payment
    @route.post("")
    async save(data: Payments) {
        // mengambil data customer berdasarkan emai apakah memiliki stripe id(stripeId)
        const email: string = data.email;
        let stripeCustomerId: string = "";
        let stripeClientSecret: string = "";
        let message: string = "";

        const customerDb: Customer = await db("Customer").where({ email }).first();
        if (customerDb === undefined) {
            // insert customer ke stripe
            const params: Stripe.CustomerCreateParams = {
                name: data.name,
                email: data.email,
                description: "Create Customer" + new Date(),
            };

            const customerCreate: Stripe.Customer = await stripe.customers.create(params);

            const paramsInput: Customer = {
                name: data.name,
                email: data.email,
                customerStripeId: customerCreate.id,
                clientSecret: "",
                createdAt: new Date(),
                deleted: false,
                id: 0
            };

            stripeCustomerId = customerCreate.id;
            stripeClientSecret = "";

            await db("Customer").insert(paramsInput);

        } else {
            // update customer ke stripe
            const params: Stripe.CustomerUpdateParams = {
                name: data.name,
                email: data.email,
                description: "Customer Update: " + new Date(),
            };
            stripeCustomerId = customerDb.customerStripeId;

            const customerUpdate: Stripe.Customer = await stripe.customers.update(stripeCustomerId, params);

        }

        /* const paramsCharges: Stripe.ChargeCreateParams = {
            amount: data.amount,
            currency: "usd",
            customer: stripeCustomerId,
            description: "payment charge with stripe and node",
        };
        try {
            let paymentCharges: Stripe.Charge = await stripe.charges.create(paramsCharges);
            // message = paymentCharges.outcome?.seller_message === null ? "" : paymentCharges.outcome?.seller_message;
        } catch (error) {
            console.log(error);
        } */

        const paramsIntent: Stripe.PaymentIntentCreateParams = {
            amount: data.amount,
            currency: "usd",
            customer: stripeCustomerId,
            payment_method_types: ["card"],
            description: "testing use api payment intent"
        };

        const paymentIntent: Stripe.PaymentIntent = await stripe.paymentIntents.create(paramsIntent);

        return "success";

    }



}