import React from 'react';
import image from '../sethz.jpg'

const UserInfo = (props) => {
    if (props.userData) {
        return (
            <div style={{ display: "flex" }}>
                <div style={infoStyling}>
                    <img src={props.userData.avatar} style={{ width: "60%", borderRadius: '70%' }} />
                    <h3>Seth Z</h3>
                    <h4>25, Atlanta, GA</h4>
                    <p>Sethjkjnf;kadns k;anf;kanfjdn;kjnsd;gkjns;kdjgn;sdkfjng;sj</p>
                </div>
            </div>
        )
    } else {
        return <div></div>
    }
    

    let infoStyling = {
        display: 'flex',
        flexDirection: 'column'
    }
}

export default UserInfo;