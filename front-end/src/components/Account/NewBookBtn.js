import React from 'react';
import { Link } from 'react-router-dom';

const NewBookBtn = (props) => {
    return (
        <Link to={`/book/new/${props.currentUser}`}>
            <button className="newBookBtn">
                Create New Book
            </button>
        </Link>
    )
}

export default NewBookBtn;