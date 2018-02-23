import React, { Component } from 'react';
import axios from 'axios';

import Prompt from './Prompt';
import PageSubHeader from './PageSubHeader';

class PromptPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promptData: [],
            topicIndex: 0
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3000/api/prompts')
            .then(data => {
                let theData = data.data
                this.setState({ promptData: theData });
            })
    }

    _renderPromptItems = () => {
        return this.state.promptData.map(prompt => {
            return (
                <Prompt 
                    prompts={prompt.prompts}
                    topic={prompt.content}
                />
            )
        })
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <PageSubHeader heading="A book for Carl: Chapter 1" />
                {this._renderPromptItems()}
            </div>
        )
    }
}

export default PromptPage;