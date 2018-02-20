import React, { Component } from 'react';
import RelationshipItem from './RelationshipItem';

class Relationships extends Component {
    constructor(props) {
        super(props);

        this.state = {
            relationships: [
                {
                    name: 'Gabby',
                    userId: 1,
                    relation: 'Daughter'
                },
                {
                    name: 'Don',
                    userId: 2,
                    relation: 'Husband'
                }
            ]
        }
    }

    setRelationshipItems = () => {
        return this.state.relationships.map(person => {
            return (
                <RelationshipItem
                    name={person.name}
                    key={person.userId}
                    id={person.userId}
                    relation={person.relation}
                />
            );
        });
    }

    render() {
        return (
            <div>
                <h3>My Relationships</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {this.setRelationshipItems()}
                </div>
            </div>
        );
    }
}

export default Relationships;