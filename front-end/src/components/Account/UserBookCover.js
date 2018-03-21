import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PromptPage from '../Prompts/PromptPage';
import axios from 'axios';


class UserBookCover extends Component {
    constructor(props) {
        super(props);

        this.state = {
            bookOptionsView: false,
            deleteHover: false,
            deleteConfirm: false
        }
    }

    _handleBookDelete2 = () => {
        axios.post('/api/book/delete', {
            id: this.props.id
        })
        .then(data => {
            this.props.filterDeletedBooks(data.data.id);
            this.setState({ deleteConfirm: false })
        })
    }

    _handleBookDelete1 = (event) => {
        this.setState({ deleteConfirm: true, bookOptionsView: true });
        event.stopPropagation();
    }

    _handleCoverClick = (event) => {
        this.setState({ bookOptionsView: !this.state.bookOptionsView });
    }

    render() {
        return (
            <div onClick={(event) => this._handleCoverClick(event)} className='bookCoverStyles'>
                {this.state.bookOptionsView
                    ? <div className="bookOptionsView">
                        <Link to={`/book/prompts/${this.props.currentUser}/${this.props.id}`}>
                            <button>Add new entries</button>
                        </Link>
                        <Link to={`/book/prompts/complete/${this.props.currentUser}/${this.props.id}`}>
                            <button>Purchase completed entries</button>
                        </Link>
                        <Link to={`/book/prompts/paid/${this.props.currentUser}/${this.props.id}`}>
                            <button>View my book</button>
                        </Link>
                        {this.state.deleteConfirm
                        ? <button className="delete-btn" onClick={() => this._handleBookDelete2()}>Are you sure?</button>
                        : <button className="delete-btn" onClick={(event) => this._handleBookDelete1(event)}>Delete Book</button>}
                    </div>
                    : <p>{this.props.title}</p>}
                    
            </div>
        )
    }
}

export default UserBookCover;