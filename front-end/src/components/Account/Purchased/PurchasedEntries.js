import React, { Component } from 'react';
import axios from 'axios';

class PurchasedEntries extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserId: Number(this.props.match.params.userId)
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3000/api/user_entries/paid')
        .then(paidEntries => {
            this.setState({ paidEntries: paidEntries.data.filter(entry => entry.userId === this.state.currentUserId && entry.paidFor === true)}, () => {
                axios.get('http://localhost:3000/api/justprompts')
                    .then(prompts => {
                        let newEntries = this.state.paidEntries.map(entry => {
                            let thePrompt = prompts.data.find(prompt => prompt.id === entry.promptId);
                            return { ...entry, prompt: thePrompt.content }
                        });
                        this.setState({ paidEntries: newEntries }, () => console.log(this.state.paidEntries));
                    })
            })
        })
    }

    render() {
        return (
            null
        )
    }
}

export default PurchasedEntries;