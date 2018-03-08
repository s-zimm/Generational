import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


import CreateBookBtn from './CreateBookBtn';

class CreateBookForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValues: '',
            searchBoxHidden: this.props.searchBoxHidden,
            dropdownData: [],
            currentUserId: this.props.currentUserId,
            selectedUserForBook: null,
            canSubmit: true,
            error: false,
            newBook: false
        }
        
    }

    _handleFormInput = (event) => {
        this.props.revealSearchBox()
        this.setState({
            searchValues: event.target.value,
        }, () => {
            if (this.state.searchValues === '' || !this.state.dropdownData) {
                this.props.hideSearchBox()
            }
        }, this._onSearchForUser(this.state.searchValues));
    }

    _onSearchForUser = (searchTerm) => {
        let regex = new RegExp('^' + '.*?' + searchTerm, 'gi');
        let filteredList = this.props.userData.filter(user => {
            let firstAndLast = `${user.firstname} ${user.lastname}`
            return firstAndLast.match(regex);
        });
        this.setState({
            dropdownData: filteredList
        });
    }

    _handleNameClick = (i) => {
        this.setState({
            searchValues: `${this.state.dropdownData[i].firstname} ${this.state.dropdownData[i].lastname}`,
            selectedUserForBook: this.state.dropdownData[i],
            searchBoxHidden: 'hidden'
        })
    }

    _populateSearchList = () => {
        let searchListItems = this.state.dropdownData.map((user, i) => {
            return (
                <div key={i} onClick={() => this._handleNameClick(i)} style={{ cursor: 'pointer' }}>
                    <li 
                        style={{ listStyle: 'none', textAlign: 'center' }}
                    >
                        {user.firstname} {user.lastname} <span>{}</span>
                    </li>
                </div>
            )
        });
        return searchListItems;
    }

    _createBook = (event) => {
        event.preventDefault();
        let whoFor = this.state.searchValues;
        let findExisting = this.props.bookData.find(book => book.whoFor === whoFor && book.ownerId === this.state.currentUserId);
        if (findExisting) {
            return alert(`You have aready written a book for ${whoFor}`)
        } else if (this.state.searchValues.length === 0) {
            return alert('Input a name in the text field.')
        } else if (this.state.selectedUserForBook) {
            return axios.post('/api/user_books', {
                whoFor: `${this.state.selectedUserForBook.firstname} ${this.state.selectedUserForBook.lastname}`,
                ownerId: this.state.currentUserId
            })
            .then(data => this.setState({ newBookData: data.data }, () => this.setState({ newBook: true })));
        } else if (this.state.searchValues.length > 0) {
            return axios.post('/api/user_books', {
                whoFor: this.state.searchValues,
                ownerId: this.state.currentUserId
            })
            .then(data => this.setState({ newBookData: data.data }, () => this.setState({ newBook: true })));
        }
    }

    searchBoxStyle = {
        position: 'relative',
        bottom: '70.5px',
        outline: '1px solid black',
        zIndex: '1',
        backgroundColor: 'white',
        width: '60%'
    }

    render() {
        if (this.props.bookData && this.state.newBook === false) {
            return (
                <div style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '350px', width: '100%'}}>
                    <form 
                        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '75%'}}
                    >
                        <input 
                            required="true"
                            autoComplete="off"
                            placeholder='Enter name...'
                            name="user"
                            onChange={this._handleFormInput}
                            value={this.state.searchValues}
                            style={{ width: '75%', padding: '10px', margin: '20px 0', minWidth: '280px' }}
                        />
                        <CreateBookBtn 
                            canSubmit={this.state.canSubmit}
                            handleLinkClick={(event) => this._createBook(event)}
                            currentUserId={this.state.currentUserId}
                            bookData={this.props.bookData}
                        />
                    </form>
                    <div className={`searchBoxStyle ${this.props.searchBoxHidden}`}>
                        <ul>
                            {this._populateSearchList()}
                        </ul>
                    </div>
                </div>
            )
        } else if (this.state.newBook === true) {
            return <Redirect to={`/book/prompts/${this.state.currentUserId}/${this.state.newBookData.id}`} />
        } else {
            return <div></div>
        }
        
    }
}

export default CreateBookForm;