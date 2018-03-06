import React, { Component } from 'react';
import axios from 'axios';


class RelationshipAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            relatedUserEmail: '',
            relation: '',
            isOther: false,
            emailError: false,
            relatedError: false
        }
    }

    _handleRelAdd = (event) => {
        // let currentUserRelations = this.props.relationships.filter(relation => relation.userId === this.props.userData.id);
        let relation = this.props.allUserData.filter(user => {
            return this.props.userData.relationships.find(relation => {
                return user.id === relation.relatedUserId
            });
        });
        let relatedPerson = relation.find(user => user.email === this.state.relatedUserEmail);
        let emailExist = this.props.allUserData.find(user => user.email === this.state.relatedUserEmail);
        if (!emailExist) {
            event.preventDefault();
            return alert('This email does not exist')
        } else if (relatedPerson) {
            event.preventDefault();
            return alert('You are already related to this person')
        } else {
            axios.post('http://localhost:3000/api/users/relationships/create', {
                relation: this.state.relation,
                currentUserId: this.props.userData.id,
                relatedUserEmail: this.state.relatedUserEmail,
                relation: this.state.relation
            })
            .then(data => console.log(data));
            
        }
        
    }

    _onRelationChange = (value) => {
        this.setState({ relation: value }, () => {
            if (this.state.relation === 'other') {
                this.setState({ isOther: true });
            }
        });
    }

    _otherInput = () => {
        if (this.state.relation === 'other') {
            return ( <input value={this.state.otherValue} onChange={(event) => this.setState({ relation: event.target.value })} placeholder="Enter relation..." />)
        }
    }

    render() {
        return (
            <div style={this.containerStyle}>
                <p onClick={() => this.props.collapseAddRel()} style={{ alignSelf: 'flex-end', margin: '4px', cursor: 'pointer' }}>X</p>
                <h5 style={{ margin: '5px' }}>Add a relationship</h5>
                <form style={this.formStyle} onSubmit={(event) => this._handleRelAdd(event)}>
                    <input style={{ marginBottom: '6px' }} value={this.state.relatedUserEmail} onChange={(event) => this.setState({ relatedUserEmail: event.target.value })} placeholder="Enter user email" />
                    <select onChange={(event) => this._onRelationChange(event.target.value)}>
                        <option value="Spouse">Spouse</option>
                        <option value="Grandparent">Grandparent</option>
                        <option value="Grandchild">Grandchild</option>
                        <option value="Parent">Parent</option>
                        <option value="Sibling">Sibling</option>
                        <option value="other">other</option>
                    </select>
                    {this.state.isOther
                        ? <input onChange={(event) => this.setState({ relation: event.target.value })} placeholder="Enter relation..." />
                        : null}
                    <button type="submit">Add Relationship</button>
                </form>
            </div>
        );
    }

    formStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%'
    }

    containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '200px',
        height: '200px',
        boxShadow: '0 2px 2px gray',
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