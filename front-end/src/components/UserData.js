import React from 'react';
import UserInfo from './UserInfo';
import Relationships from './Relationships';

const UserData = (props) => {
    return (
        <div style={containerStyle}>
            <UserInfo />
            <Relationships />
        </div>
    )

    let containerStyle = {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '50%',
    }
}

export default UserData;