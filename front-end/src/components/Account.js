import React, { Component } from 'react';
import PageSubHeader from './PageSubHeader';
import UserData from './UserData';
import AccountBooks from './AccountBooks';
import axios from 'axios';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: 1,
            userEntries: [],
            userBooks: []
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

    render() {
        return(
            <React.Fragment>
                <PageSubHeader heading='My Account' />
                <div style={{ margin: '40px', display: 'flex' }}>
                    <UserData 
                        userData={this.state.userData}
                        allUserData={this.state.allUserData}
                    />
                    <AccountBooks 
                        userEntries={this.state.userEntries}
                        userBooks={this.state.userBooks}
                    />
                </div>
            </React.Fragment>
        )
    }
}

export default Account;