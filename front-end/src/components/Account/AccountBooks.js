import React from 'react';
import NewBookBtn from './NewBookBtn';
import UserBookCover from './UserBookCover';

const AccountBooks = ({ userEntries, userBooks, currentUser, filterDeletedBooks }) => {

    let AccountBooksStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%'
    }

    let renderUserBooks = () => {
        if (userBooks) {
            return userBooks.map(book => {
                return (
                    <UserBookCover
                        filterDeletedBooks={filterDeletedBooks}
                        currentUser={currentUser}
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
            <NewBookBtn currentUser={currentUser}/>
            {renderUserBooks()}
        </div>
    )
}

export default AccountBooks;