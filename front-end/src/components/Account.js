import React, { Component } from 'react';
import PageSubHeader from './PageSubHeader';
import UserData from './UserData';
import AccountBooks from './AccountBooks';

class Account extends Component {
    render() {
        return(
            <React.Fragment>
                <PageSubHeader heading='My Account' />
                <div style={{ margin: '40px', display: 'flex' }}>
                    <UserData />
                    <AccountBooks />
                </div>
            </React.Fragment>
        )
    }
}

export default Account;