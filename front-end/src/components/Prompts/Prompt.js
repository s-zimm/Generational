import React, { Component } from 'react';
import axios from 'axios';

class Prompt extends Component {
    constructor(props) {
        super(props);
       
        this.state = {
            prompts: this.props.prompts,
            promptIndex: 0,
            clickSave: false,
            clickAdd: false
        }
    }

    componentDidMount() {
        
    }

    handleNewPromptClick = (direction) => {
        if (direction === 'right' && this.state.promptIndex !== this.state.prompts.length - 1) {
            this.setState({
                promptIndex: this.state.promptIndex + 1
            });
        } else if (this.state.promptIndex === 0 && direction === 'left') {
            this.setState({
                promptIndex: this.state.prompts.length - 1
            });
        } else if (direction === 'left') {
            this.setState({
                promptIndex: this.state.promptIndex - 1
            });
        } else {
            this.setState({
                promptIndex: 0
            });
        }
    }

    _onTextareaChange = (value) => {
        this.setState({
            prompts: this.state.prompts.map((prompt, i) => {
                if (i === this.state.promptIndex) {
                    return { ...prompt, entry: value }
                } else {
                    return prompt
                }
            })
        });
    }

    _handleSaveCLick = (event) => {
        event.preventDefault();
        this.setState({ clickSave: true }, () => {
            setTimeout(() => { this.setState({ clickSave: false })}, 2000);
        });
        axios.post('/api/user_entries', {
            content: this.state.prompts[this.state.promptIndex].entry,
            userId: this.props.ownerId,
            bookId: this.props.bookId,
            promptId: this.state.prompts[this.state.promptIndex].id,
            entryId: this.state.prompts[this.state.promptIndex].entryId,
            completed: false
        })
        .then(data => {
            this.setState({
                prompts: this.state.prompts.map((prompt, i) => {
                    if (i === this.state.promptIndex) {
                        return { ...prompt, entry: data.data.content, entryId: data.data.id }
                    } else {
                        return prompt
                    }
                })
            });
        });
    }

    _handleAddClick = (event) => {
        event.preventDefault();
        this.setState({ clickAdd: true }, () => {
            setTimeout(() => { this.setState({ clickAdd: false })}, 2000);
        });
        axios.post('/api/entry/completed', {
            content: this.state.prompts[this.state.promptIndex].entry,
            userId: this.props.ownerId,
            bookId: this.props.bookId,
            promptId: this.state.prompts[this.state.promptIndex].id,
            entryId: this.state.prompts[this.state.promptIndex].entryId,
            completed: true
        })
        .then(data => {
            this.setState({
                prompts: this.state.prompts.filter((prompt) => prompt.id !== data.data.promptId)
            }, () => {
                if (this.state.promptIndex !== 0) {
                    this.setState({ promptIndex: this.state.promptIndex - 1});
                } else {
                    this.setState({ promptIndex: 0 });
                }
            });
        })
    }

    render = () => {
        if (this.props.page === "inProgress") {
            if (this.state.prompts.length > 0) {
                return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h1 onClick={() => this.handleNewPromptClick('left')} className='arrowStyle'>{"<"}</h1>
                    <div style={this.promptContainerStyle}>
                        <h3>{this.props.topic}</h3>
                        <div style={this.containerStyling}>
                            <p className="promptTitleText"><i>{this.state.prompts[this.state.promptIndex].content}</i></p>
                            <textarea 
                                value={this.state.prompts[this.state.promptIndex].entry}
                                onChange={(event) => this._onTextareaChange(event.target.value)} 
                                className='textareaStyling'
                                placeholder="............" 
                            />
                            <div style={{display: 'flex' }}>
                                {this.state.clickSave 
                                    ? <button style={{ width: '100px', transition: 'all ease .4s', backgroundColor: 'green', color: 'white' }}>Saved!</button>
                                    : <button style={{ width: '100px', transition: 'all ease .4s' }} onClick={(event) => this._handleSaveCLick(event)}>Save for later</button>}
                                {this.state.clickAdd
                                    ? <button style={{ width: '100px', transition: 'all ease .4s', backgroundColor: 'blue', color: 'white' }}>Added!</button>
                                    : <button className="addToBookBtn" onClick={(event) => this._handleAddClick(event)} style={{ width: '100px', transition: 'all ease .4s' }}>Add to book</button>
                                    }
                            </div>
                        </div>
                    </div>
                        <h1 onClick={() => this.handleNewPromptClick('right')} className='arrowStyle'>{">"}</h1>
                </div>
                )
            } else {
                return <div></div>
            }
        } else if (this.props.page === "completed") {
            if (this.state.prompts.length > 0) {
                return (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                    <h1 onClick={() => this.handleNewPromptClick('left')} className='arrowStyle'>{"<"}</h1>
                    <div style={this.promptContainerStyle}>
                        <h3>{this.props.topic}</h3>
                        <div style={this.containerStyling}>
                            <p className="promptTitleText"><i>{this.state.prompts[this.state.promptIndex].content}</i></p>
                            <textarea 
                                value={this.state.prompts[this.state.promptIndex].entry}
                                onChange={(event) => this._onTextareaChange(event.target.value)} 
                                className="textareaStyling"
                                placeholder="............" 
                            />
                            <div style={{display: 'flex'}}>
                                {this.state.clickSave 
                                    ? <button style={{ width: '100px', transition: 'all ease .4s', backgroundColor: 'green', color: 'white' }}>Saved!</button>
                                    : <button style={{ width: '100px', transition: 'all ease .4s' }} onClick={(event) => this._handleSaveCLick(event)}>Add changes</button>}
                            </div>
                        </div>
                    </div>
                        <h1 onClick={() => this.handleNewPromptClick('right')} className='arrowStyle'>{">"}</h1>
                </div>
                )
            } else {
                return <div></div>
            }
        }
    }

    // Styling

    promptContainerStyle = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: '300px',
        width: '80%',
        color: 'rgb(9, 106, 162)'
    }

    containerStyling = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: '0 1px 2px rgba(78, 87, 138, 0.616)',
        borderRadius: '6px',
        backgroundColor: 'aliceblue',
        width: '100%',
        height: '90%'
    }
}

export default Prompt;