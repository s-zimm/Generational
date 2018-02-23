import React, { Component } from 'react';

class CreateBookForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchValues: '',
            searchBoxHidden: '',
            dropdownData: []
        }
    }

    componentDidMount() {
        
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
        let firstAndLastnames = this.props.userData.reduce((total, current) => {
            return [ ...total, `${current.firstname} ${current.lastname}` ];
        }, []);
        let filteredList = firstAndLastnames.filter(name => name.match(regex))
        this.setState({
            dropdownData: filteredList
        });
    }

    searchBoxStyle = {
        position: 'relative',
        bottom: '16px',
        outline: '1px solid black',
        zIndex: '-1'
    }

    render() {
        let searchListItems = this.state.dropdownData.map((name, i) => {
            return <li style={{ listStyle: 'none', textAlign: 'center' }}>{name}</li>
        });

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
                            {searchListItems}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default CreateBookForm;