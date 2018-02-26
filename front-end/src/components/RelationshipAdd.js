import React, { Component } from 'react';
import axios from 'axios';

class RelationshipAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userEmail: '',
            relation: ''
        }
    }

    _handleRelAdd = (event) => {
        axios.post('http://localhost:3000/api/users/relationships', {
            relation: this.state.relation,
            currentUserId: this.props.userData.id,
            userEmail: this.state.userEmail 
        });
    }

    render() {
        return (
            <div style={this.containerStyle}>
                <p onClick={() => this.props.collapseAddRel()} style={{ alignSelf: 'flex-end', margin: '4px' }}>X</p>
                <h5 style={{ margin: '5px' }}>Add a relationship</h5>
                <form onSubmit={(event) => this._handleRelAdd(event)}>
                    <input style={{ marginBottom: '6px' }} value={this.state.userEmail} onChange={(event) => this.setState({ userEmail: event.target.value })} placeholder="Enter user email" />
                    <input style={{ marginBottom: '10px' }} value={this.state.relation} onChange={(event) => this.setState({ relation: event.target.value })} placeholder="Relation" />
                    <button type="submit">Add Relationship</button>
                </form>
            </div>
        )
    }

    containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        height: '200px',
        border: 'solid black 1px',
        position: 'absolute',
        top: '-180px',
        left: '45px',
        backgroundColor: 'white',
        borderRadius: '8px',
        zIndex: '1'
    }
}

export default RelationshipAdd;