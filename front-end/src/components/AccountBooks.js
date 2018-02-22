import React, { Component } from 'react';
import NewBookBtn from './NewBookBtn';
import UserBookCover from './UserBookCover';

class AccountBooks extends Component {
    constructor(props) {
        super(props);

        this.state = {
            // needs all books of the logged in user
            books: [
                {
                    title: 'A book for Dev',
                    bookId: 1
                },
                {
                    title: 'A book for Mom',
                    bookId: 2
                }
            ]
        }
    }

    AccountBooksStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%'
    }

    renderUserBooks = () => {
        if (this.state.books) {
            return this.state.books.map(book => {
                return (
                    <UserBookCover
                        key={book.id}
                        title={book.title}
                        id={book.id}
                    />
                );
            });
        }
    }

    render() {
        return (
            <div style={this.AccountBooksStyle}>
                <NewBookBtn />
                {this.renderUserBooks()}
            </div>
        )
    }
}

export default AccountBooks;