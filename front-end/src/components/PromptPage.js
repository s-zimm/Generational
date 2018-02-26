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
            currentUserId: 1
        }
    }

    componentDidMount = () => {
        console.log(this.state.bookId)
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
    }

    _renderPromptItems = () => {
        let filteredData = this.state.promptData.filter(data => data.chapter === this.state.currentChapter);
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
        if (this.state.bookInfo) {
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