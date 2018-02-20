import React, { Component } from 'react';

class Prompt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prompts: [
                {
                    topic: 'This is the Topic',
                    content: 'Blah Blah Blah'
                },
                {
                    topic: 'NEXT TOPOC',
                    content: 'BBAKJSDBKSAJDJAKJDBAK'
                }
            ],
            currentIndex: 0
        }
    }

    handleNewPromptClick = (direction) => {
        console.log('click', direction)
        if (direction === 'right' && this.state.currentIndex !== this.state.prompts.length - 1) {
            return this.setState({
                currentIndex: this.state.currentIndex + 1
            });
        } else if (this.state.currentIndex === 0 && direction === 'left') {
            return this.setState({
                currentIndex: this.state.prompts.length - 1
            });
        } else if (direction === 'left') {
            return this.setState({
                currentIndex: this.state.currentIndex - 1
            });
        } else {
            return this.setState({
                currentIndex: 0
            });
        }
    }

    render() {
        return (
            <div style={this.promptContainerStyle}>
                <h1 onClick={() => this.handleNewPromptClick('left')} style={this.buttonStyle('left')}>prev</h1>
                <h2>{this.state.prompts[this.state.currentIndex].topic}</h2>
                <p style={{ borderBottom: 'solid grey 1px' }}>{this.state.prompts[this.state.currentIndex].content}</p>
                <h1 onClick={() => this.handleNewPromptClick('right')} style={this.buttonStyle('right')}>next</h1>
            </div>
        )
    }

    // Styling
    promptContainerStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        flexDirection: 'column',
        alignItems: 'center',
        outline: 'solid 2px red',
        padding: '40px 0'
    }

    inputStyling = {
        border: '0',
        outline: '0',
        background: 'transparent',
        borderBottom: '1px solid gray'
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