import React from 'react';
import UserInfo from './UserInfo';
import Relationships from './Relationships';

const UserData = ({ userData, allUserData, userBooks, handleAddEmail }) => {
    
    let containerStyle = {
        display: 'flex',
        flexDirection: "column",
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        width: '60%',
    }

    return (
        <div style={containerStyle}>
            <UserInfo 
                userData={userData}
                handleAddEmail={handleAddEmail}
            />
            <Relationships
                userBooks={userBooks}
                allUserData={allUserData}
                userData={userData}
            />
        </div>
    )
}


export default UserData;