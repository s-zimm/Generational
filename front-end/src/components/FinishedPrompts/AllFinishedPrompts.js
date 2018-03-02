import React, { Component } from 'react';
import PageSubHeader from '../PageSubHeader';
import axios from 'axios';
import Prompt from '../Prompts/Prompt';

class AllFinishedPrompts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookId: Number(this.props.match.params.id),
            currentUserId: Number(this.props.match.params.userId),
            currentChapter: 1
        }
    }

    componentDidMount = () => {
        var bookId = Number(this.props.match.params.id);
        var currentUserId = Number(this.props.match.params.userId);

        axios.get('http://localhost:3000/api/user_books')
            .then(data => {
                let theData = data.data;
                return theData.find(book => book.id === bookId);
            })
            .then(data => this.setState({ bookInfo: data }, () => {
                axios.get('http://localhost:3000/api/user_entries')
                    .then(data => {
                        let theData = data.data;
                        this.setState({ allEntries: theData.filter(entry => entry.userId === currentUserId && entry.bookId === bookId)}, () => {
                            this.setState({ completedEntries: theData.filter(entry => entry.userId === currentUserId && entry.bookId === bookId && entry.completed === true)
                                                                    .map(entry => entry.promptId) }, () => {
                                    axios.get('http://localhost:3000/api/prompts')
                                    .then(data => { 
                                        let theData = data.data;
                                        this.setState({ promptData: theData });
                                    });
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
                    }
                })
            }
        });
        let completePrompts = addedEntries.map(topic => {
            return {
                ...topic,
                prompts: topic.prompts.filter(prompt => {
                    if (prompt) {
                        return this.state.completedEntries.includes(prompt.id)
                    }
                })
            }
        });
        dataToRender = completePrompts;   
        console.log('I filtered stuff')         
        
        return dataToRender.map(prompt => {
            return (
                <Prompt
                    page="completed"
                    key={prompt.id}
                    id={prompt.id}
                    prompts={prompt.prompts}
                    topic={prompt.content}
                    topicIndex={this.state.topicIndex}
                    ownerId={this.state.ownerId}
                    bookId={this.state.bookId}
                />
            );
        });
    }

    _handleChapterChange = (value) => {
        this.setState({ currentChapter: Number(value) });
    }

    render() {
        
        if (!this.state.completedEntries) {
            return <div>You haven't written anything yet! Go to your dashboard to select a book and start writing.</div>
        } else if (this.state.promptData && this.state.allEntries.length > 0 && this.state.currentChapter && this.state.completedEntries) {
            return (
                <React.Fragment>
                    <PageSubHeader heading={`Your finished entries`} />
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div>
                            <select onChange={(event) => this._handleChapterChange(event.target.value)}>
                                <option value={0}>Filter by chapter</option>
                                <option value={1}>Chapter 1</option>
                            </select>  
                        </div>
                        <button>Head to checkout</button>
                        <div>
                            {this._renderPromptItems()}
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            return <div></div>
        }
    }
}

export default AllFinishedPrompts;