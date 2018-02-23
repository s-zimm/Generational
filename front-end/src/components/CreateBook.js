import React, { Component } from 'react';
import CreateBookForm from './CreateBookForm';
import StyleCarousel from './StyleCarousel';
import PageSubHeader from './PageSubHeader';

import axios from 'axios';

class CreateBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: [],
            books: [],
            searchBoxHidden: 'hidden',
        }

    }

    componentDidMount() {
        axios.get('http://localhost:3000/api/users')
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

        axios.get('http://localhost:3000/api/user_books')
            .then(books => this.setState({ books }));
    }

    containerStyling = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    }

    render() {    
        return (
            <React.Fragment>
                <PageSubHeader heading="Book Creation" />
                <div style={this.containerStyling} onClick={() => this.setState({ searchBoxHidden: 'hidden'})}>
                    <CreateBookForm
                        searchBoxHidden={this.state.searchBoxHidden}
                        userData={this.state.users}
                        bookData={this.state.books.data}
                        revealSearchBox={() => this.setState({ searchBoxHidden: ''})}
                        hideSearchBox={() => this.setState({ searchBoxHidden: 'hidden'})}

                    />
                    <StyleCarousel />
                </div>
            </React.Fragment>
        )
    }
}

export default CreateBook;