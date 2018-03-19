import React from 'react';
import UserInfo from './UserInfo';
import Relationships from './Relationships';

const UserData = ({ userData, allUserData, userBooks, handleAddEmail, handleNewRel, deleteRelationship }) => {

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
                deleteRelationship={deleteRelationship}
            />
        </div>
    )
}


export default UserData;