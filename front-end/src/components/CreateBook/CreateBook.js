import React, { Component } from 'react';
import CreateBookForm from './CreateBookForm';
import PageSubHeader from '../PageSubHeader';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

class CreateBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            books: [],
            searchBoxHidden: 'hidden',
            currentUserId: Number(this.props.match.params.userId)
        }

    }

    componentDidMount() {
        axios.get('/api/users')
            .then(users => {
                let userData = users.data;
                let newUsers = userData.map(user => {
                    let relationships = user.relationships.map(relation => {
                        let relatedUser = userData.find(user => user.id === relation.relatedUserId);
                        relation['firstname'] = relatedUser.firstname;
                        relation['lastname'] = relatedUser.lastname;
                        return relation;
                    });
                    return { ...user, relationships }
                });
                return newUsers;
            })
            .then(users => this.setState({ users }))

        axios.get('/api/user_books')
            .then(data => {
                this.setState({ books: data.data });
            });
    }

    render() {
        if (this.state.books && this.state.currentUserId) {
            return (
                <React.Fragment>
                    <PageSubHeader heading="Book Creation" />
                    <div className="sectionContainer" onClick={() => this.setState({ searchBoxHidden: 'hidden'})}>
                        <CreateBookForm
                            currentUserId={this.state.currentUserId}
                            searchBoxHidden={this.state.searchBoxHidden}
                            userData={this.state.users}
                            bookData={this.state.books}
                            revealSearchBox={() => this.setState({ searchBoxHidden: ''})}
                            hideSearchBox={() => this.setState({ searchBoxHidden: 'hidden'})}
                        />
                    </div>
                </React.Fragment>
            )
        } else {
            return <div></div>
        }
        
    }
}

export default CreateBook;