import React, { Component } from 'react';
import PageSubHeader from '../PageSubHeader';
import UserData from './UserData';
import AccountBooks from './AccountBooks';
import axios from 'axios';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: Number(this.props.match.params.userId),
            userEntries: [],
            userBooks: [],
            allUserData: []
        };
    }

    componentDidMount = () => {
        axios.get('http://localhost:3000/api/users')
                .then(data => {
                    let theData = data.data;
                    this.setState({ allUserData: theData });
                    const newData = theData.map((user) => {
                        const relationships = user.relationships.map((relation) => {
                            let relatedUserObject = theData.find((obj) => obj.id === relation.relatedUserId);
                            relation['name'] = relatedUserObject.firstname;
                            return relation;
                        });
                        return {
                            ...user,
                            relationships
                        }
                    });
                    return newData;
                })
                .then(data => {
                    let userData = data.find(user => user.id === this.state.currentUser);
                    this.setState({ userData });
                });
        
        axios.get('http://localhost:3000/api/user_entries')
                .then(data => {
                    let theData = data.data;
                    theData.map(entry => {
                        if (entry.userId === this.state.currentUser) {
                            this.setState({ userEntries: [ ...this.state.userEntries, entry ] });
                        }
                    });
                });

        axios.get('http://localhost:3000/api/user_books')
                .then(data => {
                    let theData = data.data;
                    theData.map(book => {
                        if (book.ownerId === this.state.currentUser) {
                            this.setState({ userBooks: [...this.state.userBooks, book] })
                        }
                    });
                });
    }

    _filterDeletedBooks = (bookId) => {
        debugger
        this.setState({ userBooks: this.state.userBooks.filter(book => book.id != bookId )});
    }

    render() {
        if (this.state.userData) {
            return(
                <React.Fragment>
                    <PageSubHeader heading={`${this.state.userData.firstname}'s Dashboard`} />
                    <div style={{ margin: '40px', display: 'flex' }}>
                        <UserData
                            userBooks={this.state.userBooks}
                            userData={this.state.userData}
                            allUserData={this.state.allUserData}
                        />
                        <AccountBooks
                            filterDeletedBooks={(data) => this._filterDeletedBooks(data)}
                            userEntries={this.state.userEntries}
                            userBooks={this.state.userBooks}
                            currentUser={this.state.currentUser}
                        />
                    </div>
                </React.Fragment>
            )
        } else {
            return <div></div>
        }
    }
        
}

export default Account;