import React from 'react';
import UserBookCover from './UserBookCover';

const AccountBooks = ({ userEntries, userBooks, currentUser, filterDeletedBooks }) => {

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
        <div className="sectionContainer" style={{ width: '100%', paddingBottom: '40px' }}>
            <div className='AccountBooksStyle'>
                {renderUserBooks()}
            </div>
        </div>
    )
}

export default AccountBooks;