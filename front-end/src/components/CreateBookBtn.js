import React from 'react';
import { Link } from 'react-router-dom';

const CreateBookBtn = ({ canSubmit, handleLinkClick }) => {

    if (canSubmit) {
        return (
            <Link
                to="/book/new/success" 
                onClick={(event) => handleLinkClick(event)}
            >
            <button 
                style={{ width: '300px'}}
                type="submit"
            >
                Create
            </button>
            </Link>
        )
    } else {
        return (
            <button
                style={{ width: '300px'}}
                type="submit"
            >
                Create
            </button>
        )
    }
    
}

export default CreateBookBtn;