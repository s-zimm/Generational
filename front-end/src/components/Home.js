import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import BookScrollView from './BookScrollView';
import PageSubHeader from './PageSubHeader';
import axios from 'axios';

class Home extends Component {
    constructor(props) {
        super(props);

        this.state= {}
    }

    componentDidMount() {
        axios.get('http://localhost:3000/fbid')
          .then(data => {
            debugger
            console.log(data)
            let facebookId = data.data.fbId;
            this.setState({ facebookId }, () => {
              console.log(this.state.facebookId)
              axios.get('http://localhost:3000/api/users')
              .then(data => {
                console.log(data)
                debugger
                let theUser = data.data.find(user => user.facebookId === this.state.facebookId);
                console.log(theUser)
                this.setState({ currentUser: theUser });
              });
            });
          });
      }

    render() {
        if (this.state.currentUser) {
            return (
                <div className="sectionContainer">
                    <div className="homepageDiv">
                        <div className="homepageImageContainer">
                            <div className="homepageBoxLeft"></div>
                            <h1 className="homeTitle">Hello, {this.state.currentUser.firstname}!</h1>
                            <div className="homepageBoxCenter"></div>
                            <div className="homepageBoxRight"></div>
                        </div>
                    </div>
                    <Link style={this.brandStyle} to={`/book/new/${this.state.currentUser.id}`}><button className="newBookBtn">Create Book</button></Link>
                </div>
            )
        } else {
            return <div></div>
        }
        
    }
}

export default Home;