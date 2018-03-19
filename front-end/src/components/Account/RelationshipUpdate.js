import React, { Component } from 'react';
import axios from 'axios';

class RelationshipUpdate extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedBookId: 0,
            addContributorSuccess: false,
            showOriginalButton: true,
            deleteRelationshipConfirm: false,
            deleteRelationshipSuccess: false,
            userContributorExist: false,
            selectUserValidation: ''
        }
    }

    componentDidMount() {
        axios.get('/api/books/contributors')
            .then(data => {
                this.setState({ contributors: data.data });
            });
    }

    _renderUserBookSelect = () => {
        let userBooks = this.props.userBooks;
        return userBooks.map(book => {
            return (
                <option key={book.id} value={book.id} required>{`Book for: ${book.whoFor}`}</option>
            )
        });
    }

    _onSelectChange = (value) => {
        this.setState({ selectedBookId: value }, () => console.log(this.state.selectedBookId));
    }

    _onContributorSubmit = (event) => {
        event.preventDefault();
        if (this.state.selectedBookId === 0) {
            return this.setState({ selectUserValidation: 'invalid' }, () => {
                setTimeout(() => { this.setState({ selectUserValidation: ''})}, 1500)
            });
        } else if (this.state.contributors.find(c => c.userId === this.props.id && c.bookId === Number(this.state.selectedBookId))) {
            return this.setState({ userContributorExist: true, showOriginalButton: false, selectUserValidation: 'invalid' },
                () => {
                    setTimeout(() => { this.setState({ 
                        userContributorExist: false, 
                        showOriginalButton: true,
                        selectUserValidation: ''
                    })}, 1700)
                }
            )
        } else if (this.state.addContributorSuccess === false) {
            this.setState({ addContributorSuccess: true, showOriginalButton: false }, 
                () => {
                    axios.post('/api/books/contributors', {
                    bookId: this.state.selectedBookId,
                    contributorId: this.props.id
                }).then(data => {
                    this.setState({
                        contributors: this.state.contributors.concat(data.data)
                    });
                });
            });
            setTimeout(() => { this.setState({ addContributorSuccess: false, showOriginalButton: true })}, 1400)
        }
    }

    _handleDeleteClick1 = (event) => {
        event.preventDefault();
        if (this.state.deleteRelationshipConfirm === false) {
            this.setState({ deleteRelationshipConfirm: true })
        }
    }

    _handleDeleteClick2 = (event) => {
        event.preventDefault();
        axios.post('/api/users/relationships/delete', {
            relationId: this.props.relationshipId,
            relatedUserId: this.props.id
        }).then(data => {
            this.props.deleteRelationship(data.data);
        })
    }

    render() {
        return (
            <div style={this.containerStyle}>
                <p onClick={() => this.props.collapseViewRel()} style={{ alignSelf: 'flex-end', margin: '4px', cursor: 'pointer', color: 'black' }}>X</p>
                <h5 style={{ margin: '5px', color: 'black' }}>{`Invite ${this.props.name} to contribute to books`}</h5>
                <form style={{ margin: '5px' }} onSubmit={(event) => this._onContributorSubmit(event)}>
                    <select style={{ margin: '5px' }} className={this.state.selectUserValidation} onChange={(event) => this._onSelectChange(event.target.value)} required>
                        <option value={0}>Select book</option>
                        {this._renderUserBookSelect()}
                    </select>
                    {this.state.showOriginalButton
                        ? <button className={this.state.selectUserValidation} style={{ width: '150px' }} type="submit">Add contributor to book</button>
                        : null}
                    {this.state.userContributorExist
                        ? <button className={this.state.selectUserValidation} style={{ width: '150px' }}>{`${this.props.name} already contributes!`}</button>
                        : null}
                    {this.state.addContributorSuccess
                        ? <button style={{ width: '150px' }}>{`${this.props.name} added!`}</button>
                        : null}
                </form>
                <form onSubmit={(event) => this._handleDeleteClick2(event)}>
                {this.state.deleteRelationshipConfirm
                    ? <button type="submit" className="delete-btn" style={{ width: '150px' }}>Are you sure?</button>
                    : <button onClick={(event) => this._handleDeleteClick1(event)} className="delete-btn">Delete Relationship</button>}
                </form>
            </div>
        )
    }

    containerStyle = {
        bottom: '55px',
        left: '-58px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        alignItems: 'center',
        textAlign: 'center',
        width: '200px',
        height: '200px',
        boxShadow: '0 2px 2px gray',
        position: 'absolute',
        backgroundColor: 'white',
        borderRadius: '8px',
        zIndex: '1',
        cursor: 'default',
    }
}

export default RelationshipUpdate;