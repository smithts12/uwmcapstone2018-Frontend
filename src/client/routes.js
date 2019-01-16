import React from 'react';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import {
    ContactsPage,
    DashboardPage,
    DocumentsPage,
    EducationPage,
    CertificationsPage,
    CompaniesPage,
    ExperiencePage,
    ProfilePage,
    ProjectsPage,
    TimelinePage,
    LoginPage,
    CallbackPage,
    UnfoundPage
} from './containers';
import Auth from './Auth/Auth';

const routes = ({ store }) => {
    const auth = new Auth(store);
    const SecretRoute = ({ component: Component, ...rest }) => (
        <Route
            {...rest}
            render={props =>
                auth.isAuthenticated() === true ? (
                    <Component {...props} auth={auth}/>
                )
                    : (
                        <Redirect
                            to={{
                                pathname: '/',
                                state: { from: props.location }
                            }}
                        />
                    )
            }
        />
    );

    return (
        <React.Fragment>
            <Switch>
                <Route exact path="/" component={() => <LoginPage auth={auth} />} />
                <SecretRoute path="/dashboard" component={() => <DashboardPage auth={auth} />} />
                <SecretRoute path="/profile" component={ProfilePage} />
                <SecretRoute path="/contacts" component={ContactsPage} />
                <SecretRoute path="/documents" component={DocumentsPage} />
                <SecretRoute path="/education" component={EducationPage} />
                <SecretRoute path="/companies" component={CompaniesPage} />
                <SecretRoute path="/certifications" component={CertificationsPage} />
                <SecretRoute path="/experience" component={ExperiencePage} />
                <SecretRoute path="/projects" component={ProjectsPage} />
                <SecretRoute path="/timeline" component={TimelinePage} />
                <Route path="/callback" component={() => <CallbackPage auth={auth} />} />
                <Route component={UnfoundPage} />
            </Switch>
        </React.Fragment>
    );
};

export default withRouter(routes);
