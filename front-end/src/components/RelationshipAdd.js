import React, { Component } from 'react';
import axios from 'axios';


class RelationshipAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            relatedUserEmail: '',
            relation: ''
        }
    }

    _handleRelAdd = (event) => {
        event.preventDefault();
        // let currentUserRelations = this.props.relationships.filter(relation => relation.userId === this.props.userData.id);
        let relation = this.props.allUserData.filter(user => {
            return this.props.userData.relationships.find(relation => {
                return user.id === relation.relatedUserId
            });
        });
        let relatedPerson = relation.find(user => user.email === this.state.relatedUserEmail);
        let emailExist = this.props.allUserData.find(user => user.email === this.state.relatedUserEmail);
        if (!emailExist) {
            return console.log('this user does not exist')
        } else if (relatedPerson) {
            return console.log('youre related to this person')
        } else {
            axios.post('http://localhost:3000/api/users/relationships', {
                relation: this.state.relation,
                currentUserId: this.props.userData.id,
                relatedUserEmail: this.state.relatedUserEmail 
            });
        }
        
    }

    render() {
        return (
            <div style={this.containerStyle}>
                <p onClick={() => this.props.collapseAddRel()} style={{ alignSelf: 'flex-end', margin: '4px', cursor: 'pointer' }}>X</p>
                <h5 style={{ margin: '5px' }}>Add a relationship</h5>
                <form onSubmit={(event) => this._handleRelAdd(event)}>
                    <input style={{ marginBottom: '6px' }} value={this.state.relatedUserEmail} onChange={(event) => this.setState({ relatedUserEmail: event.target.value })} placeholder="Enter user email" />
                    <input style={{ marginBottom: '10px' }} value={this.state.relation} onChange={(event) => this.setState({ relation: event.target.value })} placeholder="Relation" />
                    <button type="submit">Add Relationship</button>
                </form>
            </div>
        );
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
        zIndex: '1',
        cursor: 'default'
    }
}

export default RelationshipAdd;