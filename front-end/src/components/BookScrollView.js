import React from 'react';
import { Link } from 'react-router-dom';

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
                <Link to="/book/new"><button style={{ marginTop: '20px' }}>Create Book</button></Link>
            </div>
        </div>
    )
}

export default BookScrollView;