import React, { Component } from 'react';

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
            searchValues: `${this.state.dropdownData[i].firstname} ${this.state.dropdownData[i].lastname}`
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

    searchBoxStyle = {
        position: 'relative',
        bottom: '16px',
        outline: '1px solid black',
        zIndex: '0'
    }

    render() {
        

        return (
            <div>
                <div>
                    <form>
                        <input 
                            placeholder='Enter name...' 
                            onChange={this._handleFormInput}
                            value={this.state.searchValues}
                            style={{ width: '500px', padding: '10px', marginTop: '30px' }}
                        />
                    </form>
                    <div className={this.state.searchBoxHidden} style={this.searchBoxStyle}>
                        <ul style={{ zIndex: 1 }}>
                            {this._populateSearchList()}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateBookForm;