import React from 'react';

const BookScrollView = props => {

    let innerScrollViewContainer = {
        width: '90%',
        height: '90%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '20px',
        padding: '70px 30px'
    }

    return (
        <div className="BookScrollViewContainer">
            <div style={innerScrollViewContainer}>
                <h1>Books will go here</h1>
                <button style={{ marginTop: '20px' }}>Create Book</button>
            </div>
        </div>
    )
}

export default BookScrollView;