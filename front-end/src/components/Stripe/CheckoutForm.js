import React from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from '../../config';

const CURRENCY = 'USD';
const PAYMENT_SERVER_URL = 'http://localhost:3000/checkout';
// TEST KEY


const fromEuroToCent = amount => amount * 100;

const successPayment = data => {
    alert('Payment Successful');
}

const errorPayment = data => {
    alert('Payment Error');
}

const onToken = (amount, description) => token =>
    axios.post(PAYMENT_SERVER_URL, {
        description,
        source: token.id,
        currency: CURRENCY,
        amount: fromEuroToCent(amount)
    })
    .then(successPayment)
    .catch(errorPayment);

const CheckoutForm = ({ name, description, amount }) => {
    return (
        <StripeCheckout 
            name={name}
            description={description}
            amount={fromEuroToCent(amount)}
            token={onToken(amount, description)}
            currency={CURRENCY}
            stripeKey={STRIPE_PUBLISHABLE} 
        />
    )
}

export default CheckoutForm;