import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class CreateBookBtn extends Component {
    constructor(props) {
        super(props);
        
        
    }

    render() {
        if (this.props.canSubmit && this.props.bookData.length > 0) {
            return (
                <Link
                    to={`/book/new/success/${this.props.bookData[this.props.bookData.length - 1].id}`}
                    onClick={(event) => this.props.handleLinkClick(event)}
                >
                <button 
                    style={{ width: '300px'}}
                    type="submit"
                >
                    Create
                </button>
                </Link>
            )
        } else {
            return (
                <button
                    style={{ width: '300px'}}
                    type="submit">
                    Create
                </button>
            )
        }
    }
    
}

export default CreateBookBtn;