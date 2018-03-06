import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BookScrollView from './BookScrollView';
import PageSubHeader from './PageSubHeader';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sectionContainer">
                <div className="homepageDiv">
                    <div className="homepageImageContainer">
                        <div className="homepageBoxLeft"></div>
                        <h1 className="homeTitle">Build your own books now!</h1>
                        <div className="homepageBoxCenter"></div>
                        <div className="homepageBoxRight"></div>
                    </div>
                </div>
                <Link style={this.brandStyle} to={`/book/new/${this.props.currentUser}`}><button>Create Book</button></Link>
            </div>
        )
    }
}

export default Home;