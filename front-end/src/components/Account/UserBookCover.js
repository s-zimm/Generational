import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PromptPage from '../Prompts/PromptPage';
import axios from 'axios';


class UserBookCover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookOptionsView: false,
            deleteHover: false
        }
    }

    _handleBookDelete = () => {
        axios.post('http://localhost:3000/api/book/delete', {
            id: this.props.id
        })
        .then(data => this.props.filterDeletedBooks(data.data.id))
    }

    render() {
        return (
            <div onClick={() => this.setState({ bookOptionsView: !this.state.bookOptionsView })} className='bookCoverStyles'>
                {this.state.bookOptionsView
                    ? <div style={{ height: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-around' }}>
                        <Link to={`/book/prompts/${this.props.currentUser}/${this.props.id}`}>
                            <button>Add new entries</button>
                        </Link>
                        <Link to={`/book/prompts/complete/${this.props.currentUser}/${this.props.id}`}>
                            <button>Purchase completed entries</button>
                        </Link>
                        <Link to={`/book/prompts/paid/${this.props.currentUser}/${this.props.id}`}>
                            <button>View my book</button>
                        </Link>
                        <button className="delete-btn" onClick={() => this._handleBookDelete()}>Delete Book</button>
                    </div>
                    : <p>{this.props.title}</p>}
                    
            </div>
        )
    }
}

export default UserBookCover;