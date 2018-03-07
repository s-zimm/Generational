import React, { Component } from 'react';
import Home from './Home';
import { Link } from 'react-router-dom';
import logo from '../Generational-logo.png'

class Navbar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            clicked: false
        }
    }

    brandStyle = { 
        color: 'aliceblue',
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
                    {this.state.clicked
                        ? <div className="theHamburger rotate" onClick={() => this.setState({clicked: !this.state.clicked})}>+</div>
                        : <div className="theHamburger" onClick={() => this.setState({clicked: !this.state.clicked})}>+</div>}
                    {/* <div className="theHamburger" onClick={() => this.setState({clicked: !this.state.clicked})}>+</div> */}
                    {this.state.clicked
                        ? (<div className="dropdownMenu">
                            <Link to={`/account/${this.props.currentUser}`}>Dashboard</Link>
                            <Link to={`/book/new/${this.props.currentUser}`}>Create Book</Link>
                            <a href="/logout"><button>Log Out</button></a>
                            </div>
                        )
                        : <div></div>}
                </div>
                
                <div>
                    {/* <Route path="/home" component={Home} /> */}
                </div>
            </div>
        )
    }
}

export default Navbar;