import React, { Component } from 'react';

class Prompt extends Component {
    constructor(props) {
        super(props);

        this.state = {
            prompts: this.props.prompts,
            promptIndex: 0
        }
    }

    componentDidMount() {
        if (this.state.prompts) {
            let newPrompts = this.state.prompts.map((prompt, i) => {
                return {
                    ...prompt,
                    entry: ''
                };
            });
            this.setState({
                prompts: newPrompts
            });
        } else {
            console.log('Loading prompts...')
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

    _onTextareaChange = (value) => {
        this.setState(oldState => {
            let newState = oldState;
            return newState.prompts[oldState.promptIndex].entry = value;
        });
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
                        <textarea value={this.state.prompts[this.state.promptIndex].entry} onChange={(event) => this._onTextareaChange(event.target.value)} style={this.textareaStyling} placeholder="............" />
                    </div>
                </div>
                    <h1 onClick={() => this.handleNewPromptClick('right')} style={this.buttonStyle}>{">"}</h1>
            </div>
            )
        } else {
            return <div>Loading...</div>
        }
        
    }

    // Styling
    textareaStyling = {
        border: '0',
        outline: '0',
        background: 'transparent',
        borderBottom: '1px solid gray',
        width: '500px',
        height: '120px',
        marginBottom: '8px'
    }

    promptContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justtifyContent: 'flex-start',
        alignItems: 'center',
        height: '300px'
    }

    containerStyling = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        border: 'solid 2px black',
        // padding: '10px 90px 0 90px',
        width: '650px',
        height: '200px'
    }

    buttonStyle = {
        cursor: 'pointer'
    }
}

export default Prompt;