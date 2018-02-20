import React from 'react';
import { Link } from 'react-router-dom';

const NewBookBtn = (props) => {
    return (
        <Link to="/book/new">
            <button>
                Create New Book
            </button>
        </Link>
    )
}

export default NewBookBtn;