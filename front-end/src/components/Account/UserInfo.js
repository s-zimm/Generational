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
                <div className="userInfo">
                    <div className="accountInfoContainer" style={{ width: '100%'}}>
                        <div>
                            <img src={this.props.userData.avatar} className="dashboardPic" />
                        </div>
                        <div className="sectionContainer" style={{ marginLeft: '15px'}}>
                            <h3>Seth Z</h3>
                            {this.props.userData.email
                            ? <p>{this.props.userData.email}</p>
                            : <form onSubmit={(event) => this._handleEmailSubmit(event)}>
                                <input value={this.state.emailValue} onChange={(event) => this.setState({ emailValue: event.target.value })} style={{width: '70%'}} placeholder="Add email..."/>
                                <button>Submit</button>
                            </form>}
                            <h4>25, Atlanta, GA</h4>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <div></div>
        }
    }
}

export default UserInfo;