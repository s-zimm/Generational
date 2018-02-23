import React, { Component } from 'react';
import axios from 'axios';

import PromptInputField from './PromptInputField';

class Prompt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prompts: this.props.prompts,
            promptIndex: 0
        }
    }

    

    handleNewPromptClick = (direction) => {
        console.log('click', direction)
        if (direction === 'right' && this.state.promptIndex !== this.state.prompts.length - 1) {
            return this.setState({
                promptIndex: this.state.promptIndex + 1
            });
        } else if (this.state.promptIndex === 0 && direction === 'left') {
            return this.setState({
                promptIndex: this.state.prompts.length - 1
            });
        } else if (direction === 'left') {
            return this.setState({
                promptIndex: this.state.promptIndex - 1
            });
        } else {
            return this.setState({
                promptIndex: 0
            });
        }
    }

    _renderPrompts = () => {
        
    }

    render = () => {
        if (this.state.prompts) {
            return (
                <div style={this.promptContainerStyle}>
                    <h4 onClick={() => this.handleNewPromptClick('left')} style={this.buttonStyle('left')}>prev</h4>
                    <h3>{this.props.topic}</h3>
                    <div>
                        {/* <p><i>{this.props.prompt}</i></p> */}
                        <p><i>What does your name mean?</i></p>
                        <input style={this.inputStyling} placeholder="...." />
                    </div>
                    <h4 onClick={() => this.handleNewPromptClick('right')} style={this.buttonStyle('right')}>next</h4>
                </div>
            )
        } else {
            return <div>Loading</div>
        }
        
    }

    // Styling
    inputStyling = {
        border: '0',
        outline: '0',
        background: 'transparent',
        borderBottom: '1px solid gray',
        width: '500px'
    }

    promptContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justtifyContent: 'flex-start',
        alignItems: 'center',
        outline: 'solid 2px red',
        height: '300px'
    }

    buttonStyle = (direction) => {
        if (direction === 'left') {
            return { 
                cursor: 'pointer',
                position: 'absolute', 
                left: 0
            }
        } else {
            return { 
                cursor: 'pointer', 
                position: 'absolute', 
                right: 0
            }
        }
    }
}

export default Prompt;