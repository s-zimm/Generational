import React, { Component } from 'react';

import Navbar from './Navbar';
import BookScrollView from './BookScrollView';
import Prompt from './Prompt';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <BookScrollView />
                <Prompt />
            </React.Fragment>
        )
    }
}

export default Home;