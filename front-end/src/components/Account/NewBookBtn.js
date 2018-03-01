import React from 'react';
import { Link } from 'react-router-dom';

const NewBookBtn = (props) => {
    return (
        <Link to={`/book/new/${props.currentUser}`}>
            <button>
                Create New Book
            </button>
        </Link>
    )
}

export default NewBookBtn;