import React, { Component } from 'react';
import RelationshipItem from './RelationshipItem';
import RelationshipAdd from './RelationshipAdd';
import axios from 'axios';

class Relationships extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingRelationship: false,
            relationships: []
        }
    }

    componentDidMount() {
        axios.get('/api/users/relationships')
            .then(data => this.setState({ relationships: data.data }));
    }

    setRelationshipItems = () => {
        if (this.props.userData.relationships.length > 0) {
            return this.props.userData.relationships.map(person => {
                return (
                    <RelationshipItem
                        userBooks={this.props.userBooks}
                        currentUserId={this.props.userData.id}
                        name={person.name}
                        key={person.relatedUserId}
                        id={person.relatedUserId}
                        relation={person.relation}
                        relationshipId={person.id}
                        deleteRelationship={this.props.deleteRelationship}
                    />
                );
            });
        } else {
            return (
                    <div style={{ marginLeft: '20px' }}>No relationships</div>
            )
        }
    }

    _onRelationshipAdd = () => {
        if (!this.state.addingRelationship) {
            this.setState({ addingRelationship: true });
        }
    }

    _handleCollapse = () => {
        this.setState({ addingRelationship: false });
    }

    _handleNewRel = (data) => {
        this.props.handleNewRel(data);
        this.setState({ addingRelationship: false });
    }

    circleContainerStyle = {
        border: 'solid black 1px',
        borderRadius: '50%',
        width: '75px',
        textAlign: 'center',
        cursor: 'pointer',
        margin: '5px',
        position: 'relative'
    }

    render() {
        return (
            <div className="relationshipContainer">
                <h3>My Relationships</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <div 
                        className="circleContainerStyle"
                        onClick={() => this._onRelationshipAdd()}>
                        {this.state.addingRelationship 
                                    ? <RelationshipAdd
                                        allUserData={this.props.allUserData}
                                        userData={this.props.userData} 
                                        collapseAddRel={this._handleCollapse}
                                        relationships={this.state.relationships}
                                        handleNewRel={(data) => this._handleNewRel(data)}
                                        />
                                    : null}
                        <p style={{ padding: '10px' }}>+</p>
                    </div>
                    {this.setRelationshipItems()}
                    {/* Div below needs onClick */}
                </div>
            </div>
        );
    }
}

export default Relationships;