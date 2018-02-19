import React from 'react';

const Navbar = props => {

    let brandStyle = { 
        // alignSelf: 'flex-start',
        marginLeft: '15px',
    }

    let signInAndMenu = {
        display: 'flex',
        justifyContent: 'flex-end',
        width: '100%',
        marginRight: '15px'
    }

    return (
        <div className="navbar">
            <h1 style={brandStyle}>Generational</h1>
            <div style={signInAndMenu}>
                <button>Sign Up</button>
            </div>
        </div>
    )
}

export default Navbar;