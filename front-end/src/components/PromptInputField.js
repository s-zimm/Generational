import React, { Component } from 'react';

const PromptInputField = ({ prompt }) => {

    let inputStyling = {
        border: '0',
        outline: '0',
        background: 'transparent',
        borderBottom: '1px solid gray'
    }

    return (
        <div>
            <p><i>{prompt}</i></p>
            <input style={inputStyling} placeholder="..." />
        </div>
    )
}

export default PromptInputField;