import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageSubHeader from './PageSubHeader';
import axios from 'axios';

class CreateBookSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserId: 1
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3000/api/user_books')
            .then(books => {
                let latestBook = books.data.find(book => book.ownerId === this.state.currentUserId);
                this.setState({ latestBookId: latestBook.id })
            })
    }

    render() {
        return (
            <div>
                <PageSubHeader heading="You created a book!" />
                <Link to={`/book/prompts/${this.state.latestBookId + 1}`}><button>Start writing now</button></Link>
            </div>
        )
    }
}

export default CreateBookSuccess;