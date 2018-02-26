import React, { Component } from 'react';
import axios from 'axios';

class RelationshipUpdate extends Component {
    constructor(props) {
        super(props);
    }

    _renderUserBookSelect = () => {
        let userBooks = this.props.userBooks;
        debugger;
        return userBooks.map(book => {
            return (
                <option value={book.id}>{`Book for: ${book.whoFor}`}</option>
            )
        })
    }

    render() {
        return (
            <div style={this.containerStyle}>
                <p onClick={() => this.props.collapseViewRel()} style={{ alignSelf: 'flex-end', margin: '4px', cursor: 'pointer' }}>X</p>
                <h5 style={{ margin: '5px' }}>{`Invite ${this.props.name} to contribute to books`}</h5>
                <select>    
                    {this._renderUserBookSelect()}
                </select>
                <button style={{ backgroundColor: 'red', color: 'white' }}>Delete Relationship</button>
            </div>
        )
    }

    containerStyle = {
        bottom: '55px',
        left: '50px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        width: '200px',
        height: '200px',
        border: 'solid black 1px',
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '8px',
        zIndex: '1',
        cursor: 'default',
    }
}

export default RelationshipUpdate;