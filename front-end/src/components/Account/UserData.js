import React from 'react';
import UserInfo from './UserInfo';
import Relationships from './Relationships';

const UserData = ({ userData, allUserData, userBooks, handleAddEmail, handleNewRel }) => {

    return (
        <div className="userDataContainer" style={{width: '100%'}}>
            <UserInfo 
                userData={userData}
                handleAddEmail={handleAddEmail}
            />
            <Relationships
                handleNewRel={handleNewRel}
                userBooks={userBooks}
                allUserData={allUserData}
                userData={userData}
            />
        </div>
    )
}


export default UserData;