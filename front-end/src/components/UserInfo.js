import React from 'react';
import image from './sethz.jpg'

const UserInfo = (props) => {
    return (
        <div style={{ display: "flex" }}>
            <div style={infoStyling}>
                <img src={image} style={{ width: "60%", borderRadius: '70%' }} />
                <h3>Seth Z</h3>
                <h4>25, Atlanta, GA</h4>
                <p>Sethjkjnf;kadns k;anf;kanfjdn;kjnsd;gkjns;kdjgn;sdkfjng;sj</p>
            </div>
        </div>
    )

    let infoStyling = {
        display: 'flex',
        flexDirection: 'column'
    }
}

export default UserInfo;