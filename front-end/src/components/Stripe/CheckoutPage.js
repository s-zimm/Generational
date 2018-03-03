import React from 'react';
import CheckoutForm from './CheckoutForm';

const CheckoutPage = (props) => {
    return (
        <div>
            <CheckoutForm 
                name={`Road to learn React`}
                description={`Only the Book`}
                amount={1}
            />
        </div>
    )
}

export default CheckoutPage;