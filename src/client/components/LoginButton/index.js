import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { Button } from 'reactstrap';
import './styles.scss';

/*
 * Button that will be used on the landing page of the application
 * and will redirect users to the OAuth login page if they are not already
 * authenticated. If the user is authenticated they will be routed to the homepage.
 * The logic behind the routing is all done in auth.authorize() (method provided by auth0)
 * and is set up in the auth0 application.
 */
export class LoginButton extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }

    login() {
        this.props.auth.login();
    }

    render() {
        return (
            <Button
                className='loginbtn'
                color='Secondary'
                onClick={() => this.login()}
            >
                <span className='btntext'>Login Or Create An Account</span>
            </Button>
        );
    }
}

export default withRouter(LoginButton);
