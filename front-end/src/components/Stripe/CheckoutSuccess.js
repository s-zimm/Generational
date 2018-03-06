import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = ({}) => {
    return (
        <Link to={`/book/prompts/paid/${currentUser}/${id}`}></Link>
    )
}