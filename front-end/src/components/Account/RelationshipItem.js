import React, { Component } from 'react';
import RelationshipUpdate from './RelationshipUpdate';

class RelationshipItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            viewInfo: false,
            editing: false
        }
    }

    _handleRelItemClick = () => {
        this.setState({ viewInfo: true });
    }

    _collapseViewRel = () => {
        this.setState({ viewInfo: false });
    }

    circleContainerStyle = {
        border: '.5px solid #8b8b8b',
        borderRadius: '50%',
        width: '75px',
        textAlign: 'center',
        cursor: 'pointer',
        margin: '5px'
    }

    render() {
        return (
            <div style={{ position: 'relative' }}>
                {this.state.viewInfo 
                                ? <RelationshipUpdate
                                    relation={this.props.relation}
                                    userBooks={this.props.userBooks}
                                    name={this.props.name}
                                    id={this.props.id}
                                    currentUserId={this.props.currentUserId}
                                    collapseViewRel={this._collapseViewRel}
                                    relationshipId={this.props.relationshipId}
                                    deleteRelationship={this.props.deleteRelationship}/>
                                : null}
                <div className="circleContainerStyle" onClick={() => this._handleRelItemClick()}>
                    <p style={{ padding: '10px' }}>{this.props.name}</p>
                </div>
            </div>
        )
    }
}

export default RelationshipItem;