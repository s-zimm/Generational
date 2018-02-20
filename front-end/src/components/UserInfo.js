import React from 'react';
import image from './sethz.jpg'

const UserInfo = (props) => {
    return (
        <div style={{ display: "flex" }}>
            <div>
                <img src={image} width="50%"/>
            </div>
            <div style={infoStyling}>
                <h3>Seth Z</h3>
                <h4>25, Atlanta, GA</h4>
                <p>Sethjkjnf;kadns k;anf;kanfjdn;kjnsd;gkjns;kdjgn;sdkfjng;sj</p>
            </div>
        </div>
    )

    let infoStyling = {
        display: 'flex',
        flexDirection: 'column',
        width: "50%"
    }
}

export default UserInfo;