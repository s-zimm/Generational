import React from 'react';

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
        <div style={bookCoverStyles}>
            <p style={{ padding: '80px' }}>{props.title}</p>
        </div>
    )
}

export default UserBookCover;