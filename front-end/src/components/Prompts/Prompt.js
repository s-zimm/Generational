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
        // if (this.state.prompts) {
        //     let newPrompts = this.state.prompts.map((prompt, i) => {
        //         return {
        //             ...prompt,
        //             entry: ''
        //         };
        //     });
        //     this.setState({
        //         prompts: newPrompts
        //     });
        // } else {
        //     console.log('Loading prompts...')
        // }
        
        // axios.get('http://localhost:3000/api/user_entries')
        //     .then(data => {
        //         let theData = data.data.filter(entry => entry.userId === this.props.currentUserId && entry.bookId === this.props.bookId);
        //         return this.state.prompts.map(prompt => {
        //             let theEntry = theData.find(entry => entry.promptId === prompt.id);
        //             if (theEntry) {
        //                 return { ...prompt, entry: theEntry.content, entryId: theEntry.id };
        //             } else {
        //                 return prompt;
        //             } 
        //         });
        //     })
        //     .then(prompts => this.setState({ prompts }));
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
        axios.post('http://localhost:3000/api/user_entries', {
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

    _handleAddClick = () => {
        this.setState({ clickAdd: true }, () => {
            setTimeout(() => { this.setState({ clickAdd: false })}, 2000);
        });
        axios.post('http://localhost:3000/api/entry/completed', {
            content: this.state.prompts[this.state.promptIndex].entry,
            userId: this.props.ownerId,
            bookId: this.props.bookId,
            promptId: this.state.prompts[this.state.promptIndex].id,
            entryId: this.state.prompts[this.state.promptIndex].entryId,
            completed: true
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
            }, () => {
                this.setState({
                    prompts: this.state.prompts.filter(prompt => prompt.entryId != data.data.id)
                })
            });
        })
    }

    render = () => {
        if (this.state.prompts.length > 0) {
            return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
                <h1 onClick={() => this.handleNewPromptClick('left')} style={this.buttonStyle}>{"<"}</h1>
                <div style={this.promptContainerStyle}>
                    <h3>{this.props.topic}</h3>
                    <div style={this.containerStyling}>
                        <p><i>{this.state.prompts[this.state.promptIndex].content}</i></p>
                        <textarea 
                            value={this.state.prompts[this.state.promptIndex].entry}
                            onChange={(event) => this._onTextareaChange(event.target.value)} 
                            style={this.textareaStyling} 
                            placeholder="............" 
                        />
                        <div style={{display: 'flex' }}>
                            {this.state.clickSave 
                                ? <button style={{ width: '100px', transition: 'all ease .4s', backgroundColor: 'green', color: 'white' }}>Saved!</button>
                                : <button style={{ width: '100px', transition: 'all ease .4s' }} onClick={(event) => this._handleSaveCLick(event)}>Save for later</button>}
                            {this.state.clickAdd
                                ? <button style={{ width: '100px', transition: 'all ease .4s', backgroundColor: 'blue', color: 'white' }}>Added!</button>
                                : <button className="addToBookBtn" onClick={() => this._handleAddClick()} style={{ width: '100px', transition: 'all ease .4s' }}>Add to book</button>
                                }
                        </div>
                    </div>
                </div>
                    <h1 onClick={() => this.handleNewPromptClick('right')} style={this.buttonStyle}>{">"}</h1>
            </div>
            )
        } else {
            return <div></div>
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
        width: '650px',
        height: '230px'
    }

    buttonStyle = {
        cursor: 'pointer'
    }
}

export default Prompt;