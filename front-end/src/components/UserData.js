import React, { Component } from 'react';
import UserInfo from './UserInfo';
import Relationships from './Relationships';

class UserData extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userData: {},
            userEntries: {}
        }
    }

    containerStyle = {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '60%',
    }

    render() {
        return (
            <div style={this.containerStyle}>
                <UserInfo />
                <Relationships />
            </div>
        )
    }
}

export default UserData;