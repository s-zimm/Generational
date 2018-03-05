import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
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

class CheckoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paid: false
        }
    }

    _handlePayRender = () => {
        this.setState({ paid: true })
    }

    render() {
        if (this.state.paid === false) {
            return (
                <StripeCheckout 
                    name={this.props.name}
                    description={this.props.description}
                    amount={fromEuroToCent(this.props.amount)}
                    token={onToken(this.props.amount, this.props.description)}
                    currency={CURRENCY}
                    stripeKey={STRIPE_PUBLISHABLE}
                    handlePayRender={this._handlePayRender}
                    zipCode={true}
                    closed={this._handlePayRender}
                />
            )
        } else {
            return <Redirect to={`/account/${this.props.userId}`} />
        }
        
    }
}

export default CheckoutForm;