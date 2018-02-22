import React, { Component } from 'react';
import RelationshipItem from './RelationshipItem';
import axios from 'axios';

class Relationships extends Component {
    constructor(props) {
        super(props);

        this.state = {
            currentUser: 1
        }
    }

    componentDidMount = () => {
        let relationReduction = (total, current, data) => {
            return total.concat()
        }
        axios.get('http://localhost:3000/api/users')
                .then(data => {
                    let theData = data.data;
                    const newData = theData.map((user) => {
                        const relationships = user.relationships.map((relation) => {
                            let relatedUserObject = theData.find((obj) => obj.id === relation.relatedUserId);
                            relation['name'] = relatedUserObject.firstname;
                            return relation;
                        });
                        return {
                            ...user,
                            relationships
                        }
                    });
                    debugger;
                    return newData;
                    // return newData.find(data => data.userId === this.state.currentUser)
                })
                .then(data => console.log(data))
            // .then(data => data.data.find(user => user.id === this.state.currentUser))
            // .then(user => this.setState(oldState => {
            //     let newState = oldState;
            //     newState = { ...oldState, relationships: user.relationships};
            //     console.log(newState);
            //     return newState;
            // }))
            // .then(console.log(this.state))
    }

    setRelationshipItems = () => {
        if (this.state.relationships) {
            return this.state.relationships.map(person => {
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

    render() {
        return (
            <div>
                <h3>My Relationships</h3>
                <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                    {this.setRelationshipItems()}
                    {/* Div below needs onClick */}
                    <div style={this.circleContainerStyle}>
                        <p style={{ padding: '10px' }}>+</p>
                    </div>
                </div>
            </div>
        );
    }

    circleContainerStyle = {
        border: 'solid black 1px',
        borderRadius: '50%',
        width: '75px',
        textAlign: 'center',
        cursor: 'pointer',
        margin: '5px'
    }
}

export default Relationships;