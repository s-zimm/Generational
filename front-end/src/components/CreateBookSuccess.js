import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageSubHeader from './PageSubHeader';
import axios from 'axios';

class CreateBookSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserId: 1,
            books: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3000/api/user_books')
            .then(books => {
                this.setState({ books: books.data })
            })
    }

    render() {
        if (this.state.books.length > 0) {
            return (
                <div>
                    <PageSubHeader heading="You created a book!" />
                    <Link to={`/book/prompts/${this.state.books[this.state.books.length - 1].id + 1}`}><button>Start writing now</button></Link>
                </div>
            )
        } else {
            return <div> </div>
        }
        
    }
}

export default CreateBookSuccess;