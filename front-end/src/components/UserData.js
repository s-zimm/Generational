import React, { Component } from 'react';
import UserInfo from './UserInfo';
import Relationships from './Relationships';
import axios from 'axios';

const UserData = ({ userData }) => {

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
            <Relationships 
                userData={userData}
            />
        </div>
    )
}


export default UserData;