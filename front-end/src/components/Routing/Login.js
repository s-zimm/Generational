import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import isAuth from './isAuth';


class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            redirectToReferrer: false
        }
    }
    login = () => {
        isAuth.authenticate(() => {
            this.setState(() => {
                redirectToReferrer: true
            });
        });
    }


    render() {
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state.redirectToReferrer

        if (redirectToReferrer === true) {
            <Redirect to={from} />
        }

        return (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h1>Gotta log in</h1>
                <button onClick={this.login}>Log In</button>
            </div>
        )
    }
}

export default Login;