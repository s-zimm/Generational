import React from 'react';
import { Link } from 'react-router-dom';

const CreateBookBtn = ({ canSubmit, handleLinkClick }) => {
    let _handleLinkClick = (event) => {
        handleLinkClick(event);
    }

    if (canSubmit) {
        return (
            <Link 
                to="/book/write" 
                onClick={(event) => _handleLinkClick(event)}
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
                onClick={(event) => _handleLinkClick(event)}
                style={{ width: '300px'}}
                type="submit"
            >
                Create
            </button>
        )
    }
    
}

export default CreateBookBtn;