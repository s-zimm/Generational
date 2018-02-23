import React, { Component } from 'react';
import axios from 'axios';

class CreateBookForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValues: '',
            searchBoxHidden: '',
            dropdownData: [],
            currentUserId: 1,
            selectedUserForBook: null
        }

        // this._handleNameClick = this._handleNameClick.bind(this);
        
    }

    _handleFormInput = (event) => {
        this.setState({
            searchValues: event.target.value,
            searchBoxHidden: ''
        }, () => {
            if (this.state.searchValues === '' || !this.state.dropdownData) {
                this.setState({
                    searchBoxHidden: 'hidden'
                });
            }
        }, this._onSearchForUser(this.state.searchValues));
    }

    _onSearchForUser = (searchTerm) => {
        let regex = new RegExp('^' + '.*?' + searchTerm, 'gi');
        // let firstAndLastnames = this.props.userData.reduce((total, current) => {
        //     return [ ...total, `${current.firstname} ${current.lastname}` ];
        // }, []);
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

    _createBookClick = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/user_books', {
            whoFor: `${this.state.selectedUserForBook.firstname} ${this.state.selectedUserForBook.lastname}`,
            ownerId: this.state.currentUserId
        });
    }

    searchBoxStyle = {
        position: 'relative',
        bottom: '50px',
        outline: '1px solid black',
        zIndex: '1',
        backgroundColor: 'white'
    }

    render() {
        return (
            <div style={{position: 'relative'}}>
                <form 
                    action="/api/user_books"
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center'}}
                    onSubmit={(event) => this._createBookClick(event)}
                >
                    <input 
                        autoComplete="off"
                        placeholder='Enter name...'
                        name="user"
                        onChange={this._handleFormInput}
                        value={this.state.searchValues}
                        style={{ width: '500px', padding: '10px', marginTop: '30px' }}
                    />
                    <button 
                        style={{ width: '300px'}}
                        type="submit"
                    >
                        Create
                    </button>
                </form>
                <div className={this.state.searchBoxHidden} style={this.searchBoxStyle}>
                    <ul>
                        {this._populateSearchList()}
                    </ul>
                </div>
            </div>
        )
    }
}

export default CreateBookForm;