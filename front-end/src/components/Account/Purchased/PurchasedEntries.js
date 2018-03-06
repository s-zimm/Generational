import React, { Component } from 'react';
import axios from 'axios';
import IndividualEntry from './IndividualEntry';

class PurchasedEntries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserId: Number(this.props.match.params.userId),
            bookId: Number(this.props.match.params.id),
            paidEntries: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3000/api/user_entries/paid')
        .then(paidEntries => {
            this.setState({ paidEntries: paidEntries.data.filter(entry => entry.userId === this.state.currentUserId && entry.paidFor === true && entry.bookId === this.state.bookId)}, () => {
                axios.get('http://localhost:3000/api/justprompts')
                    .then(prompts => {
                        let newEntries = this.state.paidEntries.map(entry => {
                            let thePrompt = prompts.data.find(prompt => prompt.id === entry.promptId);
                            return { ...entry, prompt: thePrompt.content }
                        });
                        this.setState({ paidEntries: newEntries }, () => {
                            axios.get('http://localhost:3000/api/user_books')
                                .then(data => data.data.find(book => book.id === this.state.bookId))
                                .then(book => this.setState({ whoFor: book.whoFor }));
                        });
                    });
            });
        })
    }

    _renderIndividualEntries = () => {
        return this.state.paidEntries.map(entry => {
            return (
                <IndividualEntry
                    key={entry.id}
                    prompt={entry.prompt}
                    entry={entry.content}   
                />
            )
        })
    }

    render() {
        if (this.state.paidEntries.length > 0) {
            return (
                <React.Fragment>
                    <div className="purchasedContainer sectionContainer">
                        <h1 className="purchasedTitle">For {this.state.whoFor}</h1>
                        <img className="fancyUnderline" src="http://res.publicdomainfiles.com/pdf_view/63/13545979819212.png" alt=""/>
                        {this._renderIndividualEntries()}
                    </div>
                </React.Fragment>
            )
        } else {
            return <div className="sectionContainer">No purchased prompts found.</div>
        }
    }
}

export default PurchasedEntries;