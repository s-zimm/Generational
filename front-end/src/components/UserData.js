import React from 'react';
import UserInfo from './UserInfo';
import Relationships from './Relationships';

const UserData = (props) => {

    let containerStyle = {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '60%',
    }

    return (
        <div style={containerStyle}>
            <UserInfo />
            <Relationships />
        </div>
    )
}

export default UserData;