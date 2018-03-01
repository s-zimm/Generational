import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PageSubHeader from '../PageSubHeader';
import axios from 'axios';

class CreateBookSuccess extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUserId: Number(this.props.match.params.userId),
            books: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:3000/api/user_books')
            .then(books => {
                let bookId = books.data.map(book => book.id)
                this.setState({ books: bookId.sort() })
            })
    }

    render() {
        if (this.state.books.length > 0) {
            return (
                <div>
                    <PageSubHeader heading="You created a book!" />
                    <Link to={`/book/prompts/${this.state.currentUserId}/${this.state.books[this.state.books.length - 1] + 1}`}><button>Start writing now</button></Link>
                </div>
            )
        } else {
            return <div> </div>
        }
        
    }
}

export default CreateBookSuccess;