import React, { Component } from 'react';
import PageSubHeader from '../PageSubHeader';
import axios from 'axios';
import Prompt from '../Prompts/Prompt';
import CheckoutForm from '../Stripe/CheckoutForm';

class AllFinishedPrompts extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookId: Number(this.props.match.params.id),
            currentUserId: Number(this.props.match.params.userId),
            currentChapter: 1,
            completedEntries: []
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
                            this.setState({ completedEntries: theData.filter(entry => entry.userId === currentUserId && entry.bookId === bookId && entry.completed === true && entry.paidFor === false)
                                                                    .map(entry => entry.promptId) }, () => {
                                    axios.get('http://localhost:3000/api/prompts')
                                    .then(data => { 
                                        let theData = data.data;
                                        this.setState({ promptData: theData }, () => {
                                            let dataToRender;
                                            let filteredData = this.state.promptData.filter(data => data.chapter === this.state.currentChapter);
                                            let addedEntries = this.state.promptData.map(topic => {
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
                                            this.setState({ allCompletedPrompts: completePrompts });
                                        });
                                    });
                                });
                        });
                    });
            }));
    }

    _renderPromptItems = () => {       
        if (this.state.allCompletedPrompts) {
            let filteredPrompts = this.state.allCompletedPrompts.filter(prompt => prompt.chapter === this.state.currentChapter)
            return filteredPrompts.map(prompt => {
                return (
                    <div style={{ marginBottom: '30px'}}>
                    <Prompt
                        key={prompt.id}
                        page="completed"
                        id={prompt.id}
                        prompts={prompt.prompts}
                        topic={prompt.content}
                        topicIndex={this.state.topicIndex}
                        ownerId={this.state.ownerId}
                        bookId={this.state.bookId}
                    />
                    </div>
                );
            });
        }
    }

    _handleChapterChange = (value) => {
        this.setState({ currentChapter: Number(value) });
    }

    render() {
        if (this.state.completedEntries.length <= 0) {
            return <div style={{ textAlign: 'center' }}>You haven't added entries yet! Go to your dashboard to select a book and start writing.</div>
        } else if (this.state.promptData && this.state.allEntries.length > 0 && this.state.currentChapter && this.state.completedEntries && this.state.bookInfo && this.state.allCompletedPrompts) {
            let justPrompts = this.state.allCompletedPrompts.map(prompt => prompt.prompts);
            console.log(justPrompts)
            let reduced = justPrompts.reduce((idList, currentArrayItem) => {
                let subId = currentArrayItem.map(item => item.entryId);
                return idList.concat(subId);
            },[])
            console.log(reduced)
            return (
                <React.Fragment>
                    <PageSubHeader heading={`Your finished entries`} />
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center' }}>
                        <div style={{ margin: '20px'}}>
                            <select style={{ fontSize: '20px', color: 'rgb(91, 91, 91)', backgroundColor: 'rgb(213, 227, 242)'}} onChange={(event) => this._handleChapterChange(event.target.value)}>
                                <option value={1}>Filter by chapter</option>
                                <option value={1}>Chapter 1</option>
                                <option value={2}>Chapter 2</option>
                            </select>  
                        </div>
                        <div style={{width:"100%"}}>
                            {this._renderPromptItems()}
                        </div>
                        <div style={{ marginBottom: '30px'}}>
                        <CheckoutForm
                            entryIdArray={reduced}
                            allCompletedPrompts={this.state.allCompletedPrompts}
                            userId={this.state.currentUserId}
                            name={`Generational`}
                            description={`Print your book for ${this.state.bookInfo.whoFor}`}
                            amount={this.state.completedEntries.length}
                        />
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