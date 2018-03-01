import React, { Component } from 'react';

import Navbar from './Navbar';
import BookScrollView from './BookScrollView';
import PageSubHeader from './PageSubHeader';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <PageSubHeader heading="Let's build a book..." />
                <BookScrollView />
            </React.Fragment>
        )
    }
}

export default Home;