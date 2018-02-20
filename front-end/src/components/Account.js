import React, { Component } from 'react';
import PageSubHeader from './PageSubHeader';
import UserData from './UserData';

class Account extends Component {
    render() {
        return(
            <React.Fragment>
                <PageSubHeader heading='My Account' />
                <div style={{ width: "100%", margin: '30px' }}>
                    <UserData />
                </div>
            </React.Fragment>
        )
    }
}

export default Account;