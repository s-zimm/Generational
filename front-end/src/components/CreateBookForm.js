import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import CreateBookBtn from './CreateBookBtn';

class CreateBookForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValues: '',
            searchBoxHidden: this.props.searchBoxHidden,
            dropdownData: [],
            currentUserId: 1,
            selectedUserForBook: null,
            canSubmit: true
        }
        
    }

    _handleFormInput = (event) => {
        this.props.revealSearchBox()
        this.setState({
            searchValues: event.target.value,
            // searchBoxHidden: ''
        }, () => {
            if (this.state.searchValues === '' || !this.state.dropdownData) {
                // this.setState({
                //     searchBoxHidden: 'hidden'
                // });
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
                <div onClick={() => this._handleNameClick(i)} style={{ cursor: 'pointer' }}>
                    <li 
                        key={i}
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
        let whoFor = this.state.searchValues;
        let findExisting = () => this.props.bookData.find(book => book.whoFor === whoFor && book.ownerId === this.state.currentUserId);
        if (findExisting()) {
            event.preventDefault();
        }
        else if (this.state.selectedUserForBook) {
            axios.post('http://localhost:3000/api/user_books', {
                whoFor: `${this.state.selectedUserForBook.firstname} ${this.state.selectedUserForBook.lastname}`,
                ownerId: this.state.currentUserId
            });
        } else {
            axios.post('http://localhost:3000/api/user_books', {
                whoFor: this.state.searchValues,
                ownerId: this.state.currentUserId
            });
        }
    }

    _handleLinkClick = (event) => {
        let whoFor = this.state.searchValues;
        let findExisting = () => this.props.bookData.find(book => book.whoFor === whoFor && book.ownerId === this.state.currentUserId);
        if (findExisting()) {
            event.preventDefault();
        }
    }

    searchBoxStyle = {
        position: 'relative',
        bottom: '70.5px',
        outline: '1px solid black',
        zIndex: '1',
        backgroundColor: 'white'
    }

    render() {
        return (
            <div style={{position: 'relative', height: '350px'}}>
                <form 
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                >
                    <input 
                        required="true"
                        autoComplete="off"
                        placeholder='Enter name...'
                        name="user"
                        onChange={this._handleFormInput}
                        value={this.state.searchValues}
                        style={{ width: '400px', padding: '10px', margin: '20px 0' }}
                    />
                    <CreateBookBtn 
                        canSubmit={this.state.canSubmit}
                        handleLinkClick={(event) => this._createBook(event)}
                    />
                </form>
                <div className={this.props.searchBoxHidden} style={this.searchBoxStyle}>
                    <ul>
                        {this._populateSearchList()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default CreateBookForm;