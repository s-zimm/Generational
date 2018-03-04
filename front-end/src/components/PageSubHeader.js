import React from 'react';

const PageSubHeader = (props) => {

    let subHeaderStyles = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(white, aliceblue)',
        boxShadow: '0 2px 2px rgba(43, 40, 136, 0.589)',
        color: 'rgb(26, 65, 138)'
    }

    return (
        <div style={subHeaderStyles}>
            <h2>{props.heading}</h2>
        </div>
    )
}

export default PageSubHeader;