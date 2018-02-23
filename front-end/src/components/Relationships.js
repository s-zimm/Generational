import React from 'react';
import RelationshipItem from './RelationshipItem';

const Relationships = ({ userData }) => {

    let setRelationshipItems = () => {
        if (userData) {
            return userData.relationships.map(person => {
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

    let circleContainerStyle = {
        border: 'solid black 1px',
        borderRadius: '50%',
        width: '75px',
        textAlign: 'center',
        cursor: 'pointer',
        margin: '5px'
    }

    return (
        <div>
            <h3>My Relationships</h3>
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {setRelationshipItems()}
                {/* Div below needs onClick */}
                <div style={circleContainerStyle}>
                    <p style={{ padding: '10px' }}>+</p>
                </div>
            </div>
        </div>
    );
}

export default Relationships;