import React, { Component } from 'react';
import image from '../sethz.jpg';
import axios from 'axios';

class UserInfo extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            emailValue: ''
        }
    }

    _handleEmailSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:3000/api/users', {
            id: this.props.userData.id,
            email: this.state.emailValue
        })
        .then(data => this.props.handleAddEmail(data.data.email));
    }
    
    render() {
        if (this.props.userData) {
            return (
                <React.Fragment>
                    <div style={this.infoStyling}>
                        <img src={this.props.userData.avatar} style={{ width: "60%", borderRadius: '70%' }} />
                        <h3>Seth Z</h3>
                        <h4>25, Atlanta, GA</h4>
                        {this.props.userData.email
                            ? <p>{this.props.userData.email}</p>
                            : <form onSubmit={(event) => this._handleEmailSubmit(event)}>
                                <input value={this.state.emailValue} onChange={(event) => this.setState({ emailValue: event.target.value })} style={{width: '70%'}} placeholder="Add email to create relationships"/>
                                <button>Submit</button>
                            </form>}
                    </div>
                </React.Fragment>
            )
        } else {
            return <div></div>
        }
    }
    
    infoStyling = {
        display: 'flex',
        flexDirection: 'column',
        width: '80%'
    }
}

export default UserInfo;