import React, { Component } from 'react';

class Prompt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prompts: this.props.prompts,
            promptIndex: 0
        }
    }

    

    handleNewPromptClick = (direction) => {
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

    render = () => {
        if (this.state.prompts) {
            return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <h1 onClick={() => this.handleNewPromptClick('left')} style={this.buttonStyle}>{"<"}</h1>
                <div style={this.promptContainerStyle}>
                    <h3>{this.props.topic}</h3>
                    <div style={this.containerStyling}>
                        <p><i>{this.state.prompts[this.state.promptIndex].content}</i></p>
                        <input style={this.inputStyling} placeholder="...." maxLength="75" />
                    </div>
                </div>
                    <h1 onClick={() => this.handleNewPromptClick('right')} style={this.buttonStyle}>{">"}</h1>
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
        height: '300px'
    }

    containerStyling = {
        border: 'solid 2px black',
        padding: '10px 90px 0 90px',
        height: '200px'
    }

    buttonStyle = {
        cursor: 'pointer'
    }
}

export default Prompt;