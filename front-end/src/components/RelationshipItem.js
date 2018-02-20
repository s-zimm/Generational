import React from 'react';

const RelationshipItem = (props) => {

    let circleContainerStyle = {
        border: 'solid black 1px',
        borderRadius: '50%',
        width: '75px',
        textAlign: 'center'
    }

    return (
        <div style={circleContainerStyle}>
            <p style={{ padding: '10px' }}>{props.name}</p>
        </div>
    )
}

export default RelationshipItem;