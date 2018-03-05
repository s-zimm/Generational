import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import StripeCheckout from 'react-stripe-checkout';
import STRIPE_PUBLISHABLE from '../../config';

const CURRENCY = 'USD';
const PAYMENT_SERVER_URL = 'http://localhost:3000/checkout';
// TEST KEY




class CheckoutForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            paid: false
        }
    }

    fromEuroToCent = amount => amount * 100

    successPayment = data => {
        alert('Payment Successful');
        this.setState({ paid: true });
    }

    errorPayment = data => {
        alert('Payment Error');
    }

    onToken = (amount, description) => token =>
        axios.post(PAYMENT_SERVER_URL, {
            description,
            source: token.id,
            currency: CURRENCY,
            amount: this.fromEuroToCent(amount)
        })
        .then(this.successPayment)
        .catch(this.errorPayment);

    _handlePayRender = () => {
        this.setState({ paid: true })
    }

    render() {
        if (this.state.paid === false) {
            return (
                <StripeCheckout 
                    name={this.props.name}
                    description={this.props.description}
                    amount={this.fromEuroToCent(this.props.amount)}
                    token={this.onToken(this.props.amount, this.props.description)}
                    currency={CURRENCY}
                    stripeKey={STRIPE_PUBLISHABLE}
                    handlePayRender={() => this._handlePayRender()}
                    zipCode={true}
                />
            )
        } else {
            return <Redirect to={`/account/${this.props.userId}`} />
        }
        
    }
}

export default CheckoutForm;