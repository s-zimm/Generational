import React, { Component } from 'react';
import PageSubHeader from './PageSubHeader';
import UserData from './UserData';

class Account extends Component {
    render() {
        return(
            <React.Fragment>
                <PageSubHeader heading='My Account' />
                <div style={{ margin: '30px', display: 'flex' }}>
                    <UserData />
                    <div style={{ width: '30%'}}>
                        Hey
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default Account;