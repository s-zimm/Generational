import React, { Component } from 'react';
import axios from 'axios';

import Prompt from './Prompt';
import PageSubHeader from './PageSubHeader';

class PromptPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            promptData: [],
            topicIndex: 0,
            currentChapter: 2

        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3000/api/prompts')
            .then(data => {
                let theData = data.data
                let filteredData = theData.filter(data => data.chapter === this.state.currentChapter);
                console.log(filteredData)
                this.setState({ promptData: filteredData }, () => console.log(this.state.promptData));
            })
    }

    _renderPromptItems = () => {
        return this.state.promptData.map(prompt => {
            return (
                <Prompt 
                    key={prompt.id}
                    id={prompt.id}
                    prompts={prompt.prompts}
                    topic={prompt.content}
                    topicIndex={this.state.topicIndex}
                />
            )
        })
    }

    render() {
        return (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <PageSubHeader heading={`A book for Carl: Chapter ${this.state.currentChapter}`} />
                {this._renderPromptItems()}
            </div>
        )
    }
}

export default PromptPage;