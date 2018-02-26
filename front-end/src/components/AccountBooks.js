import React from 'react';
import NewBookBtn from './NewBookBtn';
import UserBookCover from './UserBookCover';

const AccountBooks = ({ userEntries, userBooks }) => {

    let AccountBooksStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%'
    }

    let renderUserBooks = () => {
        if (userBooks) {
            return userBooks.map(book => {
                console.log(book)
                return (
                    <UserBookCover
                        key={book.id}
                        title={book.whoFor}
                        id={book.id}
                    />
                );
            });
        }
    }

    return (
        <div style={AccountBooksStyle}>
            <NewBookBtn />
            {renderUserBooks()}
        </div>
    )
}

export default AccountBooks;