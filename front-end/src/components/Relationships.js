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
        axios.get('http://localhost:3000/api/users/relationships')
            .then(data => this.setState({ relationships: data.data }));
    }

    setRelationshipItems = () => {
        if (this.props.userData) {
            return this.props.userData.relationships.map(person => {
                return (
                    <RelationshipItem
                        name={person.name}
                        key={person.relatedUserId}
                        id={person.userId}
                        relation={person.relation}
                    />
                );
            });
        } else {
            return <div>No relationships</div>
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
            <div>
                <h3>My Relationships</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around', flexWrap: 'wrap' }}>
                    <div 
                        style={this.circleContainerStyle}
                        onClick={() => this._onRelationshipAdd()}>
                        {this.state.addingRelationship 
                                    ? <RelationshipAdd
                                        allUserData={this.props.allUserData}
                                        userData={this.props.userData} 
                                        collapseAddRel={this._handleCollapse}
                                        relationships={this.state.relationships}/>
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