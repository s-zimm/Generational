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
            completedEntries: [],
            allEntries: []
        }
    }

    componentDidMount = () => {
        const bookId = Number(this.state.bookId);

        axios.get('http://localhost:3000/api/user_books')
            .then(data => {
                let theData = data.data;
                return theData.find(book => book.id === bookId);
            })
            .then(data => this.setState({ bookInfo: data }, () => {
                axios.get('http://localhost:3000/api/user_entries')
                    .then(data => {
                        this.setState({ allEntries: data.data.filter(entry => entry.userId === this.state.currentUserId)});
                        let theData = data.data.filter(entry => entry.userId === this.state.currentUserId && entry.bookId === this.state.bookId && entry.completed === true)
                                                .map(entry => entry.promptId);
                        console.log(theData)
                        this.setState({ completedEntries: theData }, () => {
                            axios.get('http://localhost:3000/api/prompts')
                                .then(data => {
                                    let theData = data.data;
                                    this.setState({ promptData: theData });
                                });
                        });
                    });
            }));
        
    }

    _renderPromptItems = () => {
        let dataToRender;
        let filteredData = this.state.promptData.filter(data => data.chapter === this.state.currentChapter);
        let addedEntries = filteredData.map(topic => {
            return {
                ...topic,
                prompts: topic.prompts.map(prompt => {
                    let foundEntry = this.state.allEntries.find(entry => entry.promptId === prompt.id);
                    if (foundEntry) {
                        return { ...prompt, entry: foundEntry.content, entryId: foundEntry.id }
                    } else {
                        return { ...prompt, entry: '' }
                    }
                })
            }
        });
        if (this.state.completedEntries.length > 0) {
            let incompletePrompts = addedEntries.map(topic => {
                return {
                    ...topic,
                    prompts: topic.prompts.filter(prompt => {
                        return !this.state.completedEntries.includes(prompt.id)
                    })
                }
            });
            dataToRender = incompletePrompts;   
            console.log('I filtered stuff')         
        } else {
            dataToRender = addedEntries
        }
        
        console.log(dataToRender)
        return dataToRender.map(prompt => {
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