import React, { Component } from 'react';
import Home from './Home';
import { Link } from 'react-router-dom';
import logo from '../Generational-logo.png'

class Navbar extends Component {

    brandStyle = { 
        // alignSelf: 'flex-start',
        marginLeft: '15px',
    }

    signInAndMenu = {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
        marginRight: '15px'
    }

    brandImageStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    }

    render() {
        return (
            <div className="navbar">
                <div style={this.brandImageStyle}>
                    <Link to="/"><img className="brandImage" src={logo} /></Link>
                </div>
                <div className='signInAndMenu'>
                    <Link to="/">Home</Link>
                    <Link style={this.brandStyle} to={`/account/${this.props.currentUser}`}>Dashboard</Link>
                    <Link style={this.brandStyle} to={`/book/new/${this.props.currentUser}`}>Create Book</Link>
                    <a href="/logout"><button style={this.brandStyle}>Log Out</button></a>
                </div>
                <div>
                    {/* <Route path="/home" component={Home} /> */}
                </div>
            </div>
        )
    }
}

export default Navbar;