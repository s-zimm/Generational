import React from 'react';
import { Link } from 'react-router-dom';
import PromptPage from './PromptPage';

const UserBookCover = (props) => {

    let bookCoverStyles = {
        width: '90%',
        border: 'solid black 2px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px'
    }

    return (
        <Link style={bookCoverStyles} to={`/book/prompts/${props.id}`}>
            <div>
                <p style={{ padding: '80px' }}>{props.title}</p>
            </div>
        </Link>
    )
}

export default UserBookCover;