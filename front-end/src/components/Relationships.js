import React, { Component } from 'react';
import RelationshipItem from './RelationshipItem';
import RelationshipAdd from './RelationshipAdd';

class Relationships extends Component {
    constructor(props) {
        super(props);

        this.state = {
            addingRelationship: false
        }
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
                                    ? <RelationshipAdd userData={this.props.userData} collapseAddRel={this._handleCollapse}/>
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