import React from 'react';
import Home from './Home';
import { Link } from 'react-router-dom';

const Navbar = props => {

    let brandStyle = { 
        // alignSelf: 'flex-start',
        marginLeft: '15px',
    }

    let signInAndMenu = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginRight: '15px'
    }
    let brandImageStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }

    return (
        <div className="navbar">
            <div style={brandImageStyle}>
                <h1 style={brandStyle}>Generational</h1>
            </div>
            <div style={signInAndMenu}>
                <Link to="/">Home</Link>
                <Link style={brandStyle} to={`/account/${props.currentUser}`}>Account</Link>
                <Link style={brandStyle} to={`/book/new/${props.currentUser}`}>Create Book</Link>
                <Link style={brandStyle} to={`/book/prompts/${props.currentUser}/1`}>Prompts</Link>
                <a href="/logout"><button style={brandStyle}>Log Out</button></a>
            </div>
            <div>
                {/* <Route path="/home" component={Home} /> */}
            </div>
        </div>
    )
}

export default Navbar;