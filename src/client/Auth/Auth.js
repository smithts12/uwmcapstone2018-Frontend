import auth0 from 'auth0-js';
import { logoutReturnURL } from '../redux/config';
import { fetchUser } from '../redux/actions/userActions';

export default class Auth {
    constructor(store) {
        this.redux = { store };
        this.auth0 = new auth0.WebAuth({
            domain: 'uwm-capstone.auth0.com',
            clientID: 'UhJh8oO1lZ41WeP52AihFavNxSkkEK3c',
            redirectUri: `${logoutReturnURL}callback`,
            responseType: 'token id_token',
            audience: 'https://uwm-capstone.auth0/',
            scope: 'openid email profile'
        });
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.setSession = this.setSession.bind(this);
    }

    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
                this.setSession(authResult);
                resolve();
            });
        });
    }

    isAuthenticated() {
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        return new Date().getTime() < expiresAt;
    }

    login() {
        this.auth0.authorize();
    }

    logout() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('id_token');
        localStorage.removeItem('expires_at');
    }

    setSession(authResult) {
        let expiresAt = JSON.stringify(
            authResult.expiresIn * 1000 + new Date().getTime()
        );
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        this.redux.store.dispatch(fetchUser());
    }
}
