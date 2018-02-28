import React, { Component } from 'react';
import axios from 'axios';

import Prompt from './Prompt';
import PageSubHeader from './PageSubHeader';
import { debug } from 'util';

class PromptPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promptData: [],
            topicIndex: 0,
            currentChapter: 1,
            bookId: Number(this.props.match.params.id),
            currentUserId: 1,
            completedPrompts: []
        }
    }

    componentDidMount = () => {
        const bookId = Number(this.state.bookId);
        axios.get('http://localhost:3000/api/prompts')
            .then(data => {
                let theData = data.data;
                this.setState({ promptData: theData });
            });

        axios.get('http://localhost:3000/api/user_books')
            .then(data => {
                let theData = data.data;
                return theData.find(book => book.id === bookId);
            })
            .then(data => this.setState({ bookInfo: data }));

        axios.get('http://localhost:3000/api/prompts/completed')
            .then(data => {
                let completedPrompts = data.data.filter(prompt => prompt.userId === this.state.currentUserId);
                this.setState({ completedPrompts });
            });
        }

    _renderPromptItems = () => {
        let filteredData = this.state.promptData.filter(data => data.chapter === this.state.currentChapter);
        console.log(filteredData)
        // if (this.state.completedPrompts != []) {
        //     console.log(this.state.completedPrompts)
        //     let filteredIncomplete = filteredData.forEach(data => {
        //         let fullNewPrompts = data.prompts.map(subPrompt => {
                    
        //         });
        //         console.log(fullNewPrompts)
        //     });
        // } else {
            return filteredData.map(prompt => {
                return (
                    <Prompt 
                        key={prompt.id}
                        id={prompt.id}
                        prompts={prompt.prompts}
                        topic={prompt.content}
                        topicIndex={this.state.topicIndex}
                        currentUserId={this.state.currentUserId}
                        bookId={this.state.bookId}
                    />
                );
            });
        // }
        
    }

    _handleChapterButtonClick = (direction) => {
        if (direction === 'left' && this.state.currentChapter != 1) {
            this.setState({ currentChapter: this.state.currentChapter - 1 });
        } else if (direction === 'right' && this.state.currentChapter != 2) {
            this.setState({ currentChapter: this.state.currentChapter + 1})
        } else {
            this.setState({ currentChapter: 1 })
        }
    }

    render() {
        if (this.state.bookInfo && this.state.promptData) {
            return (
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <PageSubHeader heading={`A book for ${this.state.bookInfo.whoFor}: Chapter ${this.state.currentChapter}`} />
                    {this._renderPromptItems()}
                    <div style={{ alignSelf: 'center', display: 'flex', justifyContent: 'space-around', width: '600px' }}>
                        <button onClick={() => this._handleChapterButtonClick('left')} style={{width: '200px', alignSelf: 'center'}}>{`Previous Chapter: ${this.state.currentChapter - 1}`}</button>
                        <button onClick={() => this._handleChapterButtonClick('right')} style={{width: '200px', alignSelf: 'center'}}>{`Next Chapter: ${this.state.currentChapter + 1}`}</button>
                    </div>
                    
                </div>
            )
        } else {
            return <div>Loading...</div>
        }
        
    }
}

export default PromptPage;