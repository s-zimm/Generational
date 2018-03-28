import React, { Component } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import PageSubHeader from '../PageSubHeader';
import UserData from './UserData';
import AccountBooks from './AccountBooks';
import NewBookBtn from './NewBookBtn';
import axios from 'axios';

class Account extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: Number(this.props.match.params.userId),
            userEntries: [],
            userBooks: [],
            allUserData: [],
            userBookView: false,
            contributorBookView: false
        };
    }

    componentDidMount = () => {
        axios.get('/api/users')
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
        
        axios.get('/api/user_entries')
                .then(data => {
                    let theData = data.data;
                    theData.map(entry => {
                        if (entry.userId === this.state.currentUser) {
                            this.setState({ userEntries: [ ...this.state.userEntries, entry ] });
                        }
                    });
                });

        axios.get('/api/user_books')
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
        this.setState({ userBooks: this.state.userBooks.filter(book => book.id != bookId )});
    }

    _handleAddEmail = (email) => {
        this.setState({ userData: { ...this.state.userData, email }})
    }

    _handleNewRel = (data) => {
        this.setState({ userData: { 
            ...this.state.userData, 
            relationships: [ ...this.state.userData.relationships, data ]
            }
        })
    }

    _handleDeleteRelationship = (data) => {
        this.setState({ userData: {
            ...this.state.userData,
            relationships: this.state.userData.relationships.filter(rel => rel.id === data.id)
        }});
    }

    _handleShowBooks = (type) => {
        switch (type) {
            case 'personal':
                this.setState({ userBookView: !this.state.userBookView });
                break;
            case 'contributor':
                this.setState({ contributorBookView: !this.state.contributorBookView });
        }
        
    }

    render() {
        if (this.state.userData) {
            return(
                <React.Fragment>
                    <PageSubHeader heading={`${this.state.userData.firstname}'s Dashboard`} />
                    <div className="sectionContainer" style={{ margin: '20px' }} style={{ width: '100%'}}>
                        <UserData
                            handleNewRel={(data) => this._handleNewRel(data)}
                            userBooks={this.state.userBooks}
                            userData={this.state.userData}
                            allUserData={this.state.allUserData}
                            handleAddEmail={this._handleAddEmail}
                            deleteRelationship={(data) => this._handleDeleteRelationship(data)}
                        />
                        <NewBookBtn currentUser={this.state.currentUser}/>
                        {/* <ReactCSSTransitionGroup
                            transitionName="bookListAnimation"
                            transitionEnterTimeout={300}
                            transitionLeaveTimeout={300}
                        > */}
                        <div className="userBookDropdown" onClick={() => this._handleShowBooks('personal')}>
                            View your books
                        </div>
                        {/* </ReactCSSTransitionGroup> */}
                        {this.state.userBookView
                            ? (
                                <AccountBooks
                                    filterDeletedBooks={(data) => this._filterDeletedBooks(data)}
                                    userEntries={this.state.userEntries}
                                    userBooks={this.state.userBooks}
                                    currentUser={this.state.currentUser}
                                />
                            )
                            : (
                                null
                            )}
                        <div className="contributionBookDropdown" onClick={() => this._handleShowBooks('contributor')}>
                            Books you're contributing to
                        </div>
                        {/* TODO: SET CONTRIBUTOR BOOKS */}
                        {/* {this.state.contributorBookView
                            ? (
                                <AccountBooks
                                    filterDeletedBooks={(data) => this._filterDeletedBooks(data)}
                                    userEntries={this.state.userEntries}
                                    userBooks={this.state.userBooks}
                                    currentUser={this.state.currentUser}
                                />
                            )
                            : (
                                null
                            )} */}
                    </div>
                </React.Fragment>
            )
        } else {
            return <div></div>
        }
    }
        
}

export default Account;