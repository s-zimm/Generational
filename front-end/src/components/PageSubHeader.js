import React from 'react';

const PageSubHeader = (props) => {

    let subHeaderStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'solid 1px black',
        backgroundColor: 'aliceblue'
    }

    return (
        <div style={subHeaderStyles}>
            <h2>{props.heading}</h2>
        </div>
    )
}

export default PageSubHeader;