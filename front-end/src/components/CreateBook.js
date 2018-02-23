import React, { Component } from 'react';
import CreateBookForm from './CreateBookForm';
import StyleCarousel from './StyleCarousel';
import PageSubHeader from './PageSubHeader';

import axios from 'axios';

class CreateBook extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: []
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
                <div style={this.containerStyling}>
                    <CreateBookForm 
                        userData={this.state.users}
                    />
                    <StyleCarousel />
                </div>
            </React.Fragment>
        )
    }
}

export default CreateBook;